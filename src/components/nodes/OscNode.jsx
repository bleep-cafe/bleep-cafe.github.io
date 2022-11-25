import * as Audio from "../../audio/context"
import * as React from "react"
import * as Router from "react-router-dom"

import BaseNode from "./BaseNode"
import Radio from "../controls/Radio"
import Slider from "../controls/Slider"
import { useGraphStore } from "../../hooks/useGraphStore"
import { useStore } from "reactflow"

// CONSTANTS -------------------------------------------------------------------

const name = "osc"
const info =
    <>
        <p>
            An oscillator produces signals by quickly repeating
            a <strong>waveform</strong>. The <strong>frequency</strong> of
            the oscillator, measured in <strong>Hertz (Hz)</strong>, is the
            number of times it repeats per second.
        </p>
        <p className="mt-4 text-right">
            <Router.Link to="/" className="underline">
                Learn more about <strong>pitch</strong>.
            </Router.Link>
        </p>
    </>

const inputs = [".frequency"]
const outputs = [""]

export const defaults = {
    frequency: 440,
    waveform: "sine"
}

// COMPONENTS ------------------------------------------------------------------

export default function OscNode({ id, data = defaults }) {
    const updateNode = useGraphStore(state => state.updateNode)

    return (
        <BaseNode name={name} info={info} inputs={inputs} outputs={outputs}>
            <Slider label="frequency" value={data.frequency} min={20} max={7040} step={1}
                formatter={val => `${val} Hz`}
                onValueChange={([val]) => updateNode(id, { ...data, frequency: val })} />
            <hr className="my-2 border-neutral-200" />
            <Radio label="waveform" value={data.waveform} options={["sine", "triangle", "sawtooth", "square"]}
                onValueChange={val => updateNode(id, { ...data, waveform: val })} />
        </BaseNode>
    )
}

// CONSTRUCTORS ----------------------------------------------------------------

export const asReactFlowNode = (id, data = defaults, opts = {}) => ({
    type: OscNode.name, id, data, ...opts
})

export const asAudioNodes = (id, data = defaults, connections = {}) => [
    Audio.keyed(id,
        Audio.node("OscillatorNode", [Audio.param("frequency", data.frequency), Audio.property("type", data.waveform)],
            connections?.[id] ?? []
        )
    )
]