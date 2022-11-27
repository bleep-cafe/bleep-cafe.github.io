import { useCallback } from "react"
import { ctx } from "../../util/audioContext"

import * as Audio from "../../audio/context"
import BaseNode from "./BaseNode"
import { useGraphStore } from "../../hooks/useGraphStore"
import Checkbox from "../controls/Checkbox"

const name = "sample"
const info =
    <p>
        A node that can hold an audio sample
    </p>


const inputs = []
const outputs = [""]

export const defaults = {
    sample: null,
    loop: true,
    // This field holds the "version" of the sample because the buffer of an AudioBufferSourceNode
    // can only be set once, whenever the sample changes, we increment the version number so that
    // a new audio node is created with the new buffer because the version is part of the key.
    version: 0,
}

// COMPONENTS ------------------------------------------------------------------

export default function SampleNode({ id, data = defaults }) {
    const updateNode = useGraphStore(state => state.updateNode)
    const onSampleChange = useCallback(async (ev) => {
        // FIXME: this is async, if you attempt to load a long sample and immediately load a shorter
        // sample, the short sample will finish loading and the longer sample will overwrite it
        // if it finishes loading later. There's probably also something to be said about calling
        // updateNode after the component has been destroyed.
        const rawBuffer = await ev.target.files[0].arrayBuffer()
        const audioBuffer = await ctx.decodeAudioData(rawBuffer)
        updateNode(id, { sample: audioBuffer, version: data.version + 1 })
    }, [data.version]);
    const onLoopChange = useCallback(newVal => updateNode(id, { loop: newVal }), [])

    return (
        <BaseNode name={name} info={info} inputs={inputs} outputs={outputs} colour={{ from: "from-indigo-500", to: "to-blue-400" }}>
            <label className="bg-neutral-200 rounded-full py-1 px-2 mb-2">
                Pick sample
                <input className="hidden" type="file" accept="audio/*" onChange={onSampleChange} />
            </label>
            <hr className="my-2 border-neutral-200" />
            <label className="flex items-center">
                <Checkbox checked={data.loop} onCheckedChange={onLoopChange}/> Loop
            </label>
        </BaseNode>
    )
}

// CONSTUCTORS -----------------------------------------------------------------

export const type = SampleNode.name

export const asReactFlowNode = (id, data = defaults, opts = {}) => ({
    type, id, data, ...opts
})

export const asAudioNodes = (id, data = defaults, connections = {}) => [
    Audio.keyed(`${id}-${data.version}`,
        Audio.node("AudioBufferSourceNode", [{ type: "NodeProperty", label: "buffer", value: data.sample }, { type: "NodeProperty", label: "loop", value: data.loop }, ],
            connections?.[id] ?? []
        )
    )
]
