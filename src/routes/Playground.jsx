import * as Nodes from "../components/Nodes"
import * as ContextMenu from "../components/ContextMenu"
import * as Osc from "../components/nodes/OscNode"
import * as Amp from "../components/nodes/AmpNode"
import * as Dac from "../components/nodes/DacNode"

import ReactFlow, { ReactFlowProvider } from "reactflow"
import { useRef, useState, useEffect } from "react"
import { useGraph } from "../hooks/useGraph"
import { GraphContext } from '../contexts/graphContext'

export default function Playground() {
    const editor = useRef(null)
    const useStore = useGraph({
        ref: editor, nodes: [], edges: []
    })

    const nodes = useStore(state => state.nodes)
    const edges = useStore(state => state.edges)
    const insertNode = useStore(state => state.insertNode)
    const updateNodes = useStore(state => state.updateNodes)
    const updateEdges = useStore(state => state.updateEdges)

    const [position, setPosition] = useState({ x: 0, y: 0 })
    useEffect(() => {
        const onMouseMove = ({ clientX, clientY }) => {
            setPosition({ x: clientX, y: clientY })
        }

        window.addEventListener("mousemove", onMouseMove)
        return () => window.removeEventListener("mousemove", onMouseMove)
    }, [])

    const createNode = constructor => _ => {
        const opts = { position }
        const node = constructor(Date.now(), undefined, opts)

        insertNode(node)
    }

    const menu = <>
        <ContextMenu.Item onSelect={createNode(Osc.asReactFlowNode)}>
            <span className="flex-1">Oscillator</span>
            <kbd className="text-xs w-10 text-right text-neutral-400">⌘+O</kbd>
        </ContextMenu.Item>
        <ContextMenu.Item onSelect={createNode(Amp.asReactFlowNode)}>
            <span className="flex-1">Amp</span>
            <kbd className="text-xs w-10 text-right text-neutral-400">⌘+A</kbd>
        </ContextMenu.Item>
        <ContextMenu.Item onSelect={createNode(Dac.asReactFlowNode)}>
            <span className="flex-1">Dac</span>
            <kbd className="text-xs w-10 text-right text-neutral-400">⌘+D</kbd>
        </ContextMenu.Item>
    </>

    return (
        <ContextMenu.Root content={menu}>
            <div className="w-screen h-screen">
                <GraphContext.Provider value={useStore}>
                    <ReactFlowProvider>
                        <ReactFlow
                            edges={edges}
                            nodes={nodes}
                            nodeTypes={Nodes.types}
                            onNodesChange={updateNodes}
                            onEdgesChange={updateEdges}
                            className="bg-neutral-100"
                            preventScrolling={false}
                            zoomOnScroll={false}
                            panOnDrag={false}
                            ref={editor}
                        />
                    </ReactFlowProvider>
                </GraphContext.Provider>
            </div>
        </ContextMenu.Root>
    )
}