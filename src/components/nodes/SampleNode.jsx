import { useCallback } from "react"
import { ctx } from "../../util/audioContext"

import * as Audio from "../../audio/context"
import BaseNode from "./BaseNode"
import { useGraphStore } from "../../hooks/useGraphStore"

const name = "sample"
const info =
    <p>
        A node that can hold an audio sample
    </p>


const inputs = []
const outputs = [""]

export default function SampleNode({ id, data = defaults }) {
    const updateNode = useGraphStore(state => state.updateNode)
    const onInputChange = useCallback(async (ev) => {
        // FIXME: this is async, if you attempt to load a long sample and immediately load a shorter
        // sample, the short sample will finish loading and the longer sample will overwrite it
        // if it finishes loading later. There's probably also something to be said about calling
        // updateNode after the component has been destroyed.
        const rawBuffer = await ev.target.files[0].arrayBuffer()
        const audioBuffer = await ctx.decodeAudioData(rawBuffer)
        updateNode(id, { ...data, sample: audioBuffer, version: data.version + 1 })
    }, [data.version]);

    return (
        <BaseNode name={name} info={info} inputs={inputs} outputs={outputs} colour={{ from: "from-indigo-500", to: "to-blue-400" }}>
            <label>
                Pick sample
                <input className="hidden" type="file" accept="audio/*" onChange={onInputChange} />
            </label>
        </BaseNode>
    )
}

export const defaults = {
    sample: null,
    // This field holds the "version" of the sample because the buffer of an AudioBufferSourceNode
    // can only be set once, whenever the sample changes, we increment the version number so that
    // a new audio node is created with the new buffer because the version is part of the key.
    version: 0,
}

export const asReactFlowNode = (id, data = defaults, opts = {}) => ({
    type: SampleNode.name, id, data, ...opts
})

export const asAudioNodes = (id, data = defaults, connections = {}) => [
    Audio.keyed(`${id}-${data.version}`,
        Audio.node("AudioBufferSourceNode", [{ type: "NodeProperty", label: "buffer", value: data.sample }],
            connections?.[id] ?? []
        )
    )
]
