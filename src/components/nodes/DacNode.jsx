import * as Audio from "../../audio/context"
import * as React from "react"

import BaseNode from "./BaseNode"
import Slider from "../controls/Slider"

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
    return (
        <BaseNode name={name} info={info} inputs={inputs} outputs={outputs}>
            <Slider label="master gain" value={data.gain} min={0} max={1} step={0.01}
                onValueChange={([val]) => data.onNodeChange?.(id, { ...data, gain: val })} />
        </BaseNode>
    )
}

// CONSTUCTORS -----------------------------------------------------------------

export const asReactFlowNode = (id, data = defaults, opts = {}) => ({
    type: DacNode.name, id, data, ...opts
})

export const asAudioNodes = (id, data = defaults) => [
    Audio.keyed(id,
        Audio.node("GainNode", [Audio.param("gain", data.gain)], [
            Audio.node("AudioDestinationNode")
        ])
    )
]
