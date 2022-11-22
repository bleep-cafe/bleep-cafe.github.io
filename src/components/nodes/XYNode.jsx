import * as Audio from "../../audio/context"
import * as React from "react"

import BaseNode from "./BaseNode"

const name = "xy"
const info =
    <p>
        {/*  */}
    </p>

const inputs = []
const outputs = ["x", "y"]

export default function XYNode({ id, data = defaults }) {

    return (
        <BaseNode name={name} info={info} inputs={inputs} outputs={outputs}>
            <Slider label="x" value={data.x} min={0} max={1} step={0.01}
                onValueChange={([val]) => data.onNodeChange?.(id, { ...data, x: val })}
            />

            <Slider label="y" value={data.y} min={0} max={1} step={0.01}
                onValueChange={([val]) => data.onNodeChange?.(id, { ...data, y: val })}
            />
        </BaseNode>
    )
}

export const defaults = {
    x: 0,
    y: 0,
}

export const asReactFlowNode = (id, data = defaults, opts = {}) => ({
    type: _TemplateNode.name, id, data, ...opts
})

export const asAudioNodes = (id, data = defaults, connections = {}) => [
    Audio.keyed(id + "-x",
        Audio.node("ConstantSourceNode", [Audio.param("offset", data.x)],
            connections?.[id + "-x"] ?? []
        )
    ),
    Audio.keyed(id + "-y",
        Audio.node("ConstantSourceNode", [Audio.param("offset", data.y)],
            connections?.[id + "-y"] ?? []
        )
    )
]