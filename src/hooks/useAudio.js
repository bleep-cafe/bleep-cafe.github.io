import AddNode, * as Add from '../components/nodes/AddNode'
import AmpNode, * as Amp from '../components/nodes/AmpNode'
import ConstNode, * as Const from '../components/nodes/ConstNode'
import DacNode, * as Dac from '../components/nodes/DacNode'
import MulNode, * as Mul from '../components/Nodes/MulNode'
import OscNode, * as Osc from '../components/nodes/OscNode'
import SampleNode, * as Sample from '../components/nodes/SampleNode'
import VirtualAudioContext, * as Audio from '../audio/context'
import XYNode, * as XY from '../components/nodes/XYNode'

import { ctx } from '../util/audioContext'
import { useMemo } from 'react'

// The main hook, `useAudio` provides callers with a virtual audio context that
// can be used to
export default function useAudio() {
    const vctx = useMemo(() => new VirtualAudioContext(ctx), [])
    const update = (nodes) => vctx.update(nodes)
    const updateFromReactFlow = (nodes, edges) =>
        update(nodesFromReactFlow(nodes, edges))

    return [update, updateFromReactFlow, useAudioContext()]
}

// This... feels like it's not actually a "hook". It's just a function that
// returns a wrapper around an audio context. Maybe we can use a provider or
// something instead?
export function useAudioContext() {
    // Instead of using the context directly, we return an object that wraps a
    // couple of the context's methods and properties. That way you can't do
    // weird things like create new nodes and hook them up all willy nilly.
    return {
        get currentTime() {
            return ctx.currentTime
        },

        get state() {
            return ctx.state
        },

        resume() {
            return ctx.resume()
        },
    }
}

// UTILS -----------------------------------------------------------------------

// I long for pattern matching 😭. This is just mapping the node type to the
// right constructor for virtual audio nodes.
const nameToNode = {
    [AddNode.name]: Add,
    [AmpNode.name]: Amp,
    [ConstNode.name]: Const,
    [DacNode.name]: Dac,
    [MulNode.name]: Mul,
    [OscNode.name]: Osc,
    [XYNode.name]: XY,
    [SampleNode.name]: Sample,
}

const nodesFromReactFlow = (rfNodes, rfEdges) =>
    rfNodes.reduce((nodes, rfNode) => {
        const connections = {}
        const rfEdgesNew = []

        for (const rfEdge of rfEdges) {
            // The `rfEdges` array contains every connection in the graph. Of course,
            // we only care about connections originating from the node we're trying
            // to construct.
            if (rfEdge.source == rfNode.id) {
                // The inputs/outputs of a node in ReactFlow must have unique names.
                // We have it set up so that io's are prepended with "in-" or "out-"
                // in case it makes sense for a node to have an input and output with
                // the same name.
                //
                // Additionally, we allow an io to have an empty name, which gets
                // converted to just "in" or "out" respectively.
                //
                // All this in- out- business is implementation detail, so we want to
                // strip it all before handling the connections, so that the connection
                // id's reflect the actual io names.
                const source = rfEdge.sourceHandle.replace(/^out-?/, '')
                const target = rfEdge.targetHandle.replace(/^in-?/, '')

                const connection = Audio.ref(
                    target.startsWith('.') || target == ''
                        ? // Given a node id "foo", this handles creating connections
                          // to the node's default input, which is just "foo", as well
                          // as any of its parameters:
                          //
                          // foo
                          // foo.gain
                          // ...etc...
                          //
                          // The virtual audio context knows how to handle connections
                          // to parameters.
                          rfEdge.target + target
                        : // A ReactFlow node may map to multiple audio nodes, in which
                          // case we expect the io to be appropriately namespaced. If
                          // we have an xy pad with the id "foo", we might expect to
                          // have outputs for the two axes:
                          //
                          // out-foo-x
                          // out-foo-y
                          //
                          rfEdge.target + target
                )

                if (rfEdge.source + source in connections) {
                    connections[rfEdge.source + source].push(connection)
                } else {
                    connections[rfEdge.source + source] = [connection]
                }
            } else {
                rfEdgesNew.push(rfEdge)
            }
        }

        // We're mutating rfEdges each iteration of the reduce. This is a bit sneaky
        // but it's a simple way to make sure we're not walking every single edge
        // every single iteration.
        rfEdges = rfEdgesNew

        const newNodes = nameToNode[rfNode.type].asAudioNodes(
            rfNode.id,
            rfNode.data,
            connections
        )

        return newNodes ? [...nodes, ...newNodes] : nodes
    }, [])
