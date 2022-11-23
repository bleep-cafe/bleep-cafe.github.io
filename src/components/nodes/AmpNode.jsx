import * as Audio from "../../audio/context"
import * as React from "react"

import BaseNode from "./BaseNode"
import Oscilloscope from "../Oscilloscope"
import Slider from "../controls/Slider"
import { useGraphStore } from "../../hooks/useGraphStore"

// CONSTANTS -------------------------------------------------------------------

const name = "amp"
const info =
    <p>
        An amp modifies the volume of a signal by multiplying it by
        a <strong>gain</strong> value. A gain <code>0.5</code> will reduce the
        volume by half, while a gain of <code>2</code> will double it.
    </p>

const inputs = ["", ".gain"]
const outputs = [""]

export const defaults = {
    gain: 1
}

// COMPONENTS ------------------------------------------------------------------

export default function AmpNode({ id, data = defaults }) {
    const updateNode = useGraphStore(state => state.updateNode);
    return (
        <BaseNode name={name} info={info} inputs={inputs} outputs={outputs}>
            <Slider label="gain" value={data.gain} min={0} max={2} step={0.01}
                onValueChange={([val]) => updateNode(id, { ...data, gain: val })}
            />
            <Oscilloscope nodeId={id} className="w-full h-3 my-2 transition-all group-hover:h-8" />
        </BaseNode>
    )
}

// CONSTUCTORS -----------------------------------------------------------------

export const asReactFlowNode = (id, data = defaults, opts = {}) => ({
    type: AmpNode.name, id, data, ...opts
})

export const asAudioNodes = (id, data = defaults, connections = {}) => [
    Audio.keyed(id,
        Audio.node("GainNode", [Audio.param("gain", data.gain)],
            connections?.[id] ?? []
        )
    )
]