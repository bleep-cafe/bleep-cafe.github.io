import * as Audio from "../../audio/context"
import * as React from "react"

import BaseNode from "./BaseNode"
import Slider from "../controls/Slider"
import { useGraphStore } from "../../hooks/useGraphStore"

// CONSTANTS -------------------------------------------------------------------

const name = "dac"
const info =
    <p>

    </p>

const inputs = [""]
const outputs = []

export const defaults = {
    gain: 0
}

// COMPONENTS ------------------------------------------------------------------

export default function DacNode({ id, data = defaults }) {
    const updateNode = useGraphStore(state => state.updateNode);
    return (
        <BaseNode name={name} info={info} inputs={inputs} outputs={outputs}>
            <Slider label="master gain" value={data.gain} min={0} max={1} step={0.01}
                onValueChange={([val]) => updateNode(id, { ...data, gain: val })} />
        </BaseNode>
    )
}

// CONSTUCTORS -----------------------------------------------------------------

export const type = DacNode.name

export const asReactFlowNode = (id, data = defaults, opts = {}) => ({
    type, id, data, ...opts
})

export const asAudioNodes = (id, data = defaults) => [
    Audio.keyed(id,
        Audio.node("GainNode", [Audio.param("gain", data.gain)], [
            Audio.node("AudioDestinationNode")
        ])
    )
]
