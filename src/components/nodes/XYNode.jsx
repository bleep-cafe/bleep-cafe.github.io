import * as Audio from '../../audio/context'
import * as Router from 'react-router-dom'

import { useEffect, useRef, useState } from 'react'

import BaseNode from './BaseNode'
import Slider from '../controls/Slider'
import { useGraphStore } from '../../hooks/useGraphStore'

const name = 'xy'
const info = (
    <p>
        An XY pad is a two-dimensional control that can be connected to multiple
        parameters at once. It's a lot easier to create interesting sounds with
        this than with a bunch of sliders!
    </p>
)

const inputs = []
const outputs = ['x', 'y']

export const defaults = {
    x: 0.5,
    y: 0.5,
}

// COMPONENTS ------------------------------------------------------------------

export default function XYNode({ id, data = defaults }) {
    const svg = useRef(null)
    const updateNode = useGraphStore((state) => state.updateNode)
    const [trackingMouse, shouldTrackMouse] = useState(false)

    const updateNodePosition = (xPos, yPos) => {
        const { width, height } = svg.current.getBoundingClientRect()
        const x = Math.max(0, Math.min(1, xPos / width))
        const y = Math.max(0, Math.min(1, yPos / height))

        updateNode(id, { x, y })
    }

    useEffect(() => {
        const onMouseDown = ({ offsetX, offsetY }) => {
            updateNodePosition(offsetX, offsetY)
            shouldTrackMouse(true)
        }
        const onMouseUp = () => shouldTrackMouse(false)
        const onMouseMove = ({ offsetX, offsetY }) => {
            if (trackingMouse) {
                updateNodePosition(offsetX, offsetY)
            }
        }

        const onMouseLeave = ({ clientX, clientY }) => {
            if (trackingMouse) {
                const { top, left } = svg.current.getBoundingClientRect()
                updateNodePosition(clientX - left, clientY - top)
            }
        }

        svg.current?.addEventListener('mousedown', onMouseDown)
        svg.current?.addEventListener('mouseup', onMouseUp)
        svg.current?.addEventListener('mousemove', onMouseMove)
        svg.current?.addEventListener('mouseleave', onMouseLeave)

        return () => {
            svg.current?.removeEventListener('mousedown', onMouseDown)
            svg.current?.removeEventListener('mouseup', onMouseUp)
            svg.current?.removeEventListener('mousemove', onMouseMove)
            svg.current?.removeEventListener('mouseleave', onMouseLeave)
        }
    }, [trackingMouse])

    return (
        <BaseNode
            name={name}
            info={info}
            inputs={inputs}
            outputs={outputs}
            colour={{ from: 'from-indigo-500', to: 'to-blue-400' }}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                ref={svg}
                className={`w-full aspect-square rounded-lg
                    bg-gradient-to-r from-neutral-200 to-neutral-100 animate-gradient-xy
                    transition ${trackingMouse ? 'opacity-100' : 'opacity-50'}
                `}
            >
                <circle
                    className="cursor-default pointer-events-none"
                    cx={`${data.x * 100}%`}
                    cy={`${data.y * 100}%`}
                    r="5px"
                    fill="#ec4899"
                />
            </svg>

            <Slider
                label="x"
                value={data.x}
                min={0}
                max={1}
                step={0.01}
                formatter={(v) => v.toFixed(2)}
                onValueChange={([val]) => updateNode(id, { ...data, x: val })}
            />

            <Slider
                label="y"
                value={data.y}
                min={0}
                max={1}
                step={0.01}
                formatter={(v) => v.toFixed(2)}
                onValueChange={([val]) => updateNode(id, { ...data, y: val })}
            />
        </BaseNode>
    )
}

// CONSTUCTORS -----------------------------------------------------------------

export const type = XYNode.name

export const asReactFlowNode = (id, data = defaults, opts = {}) => ({
    type: XYNode.name,
    id,
    data,
    ...opts,
})

export const asAudioNodes = (id, data = defaults, connections = {}) => {
    return [
        Audio.keyed(
            id + 'x',
            Audio.node(
                'ConstantSourceNode',
                [Audio.param('offset', data.x)],
                connections?.[id + 'x'] ?? []
            )
        ),
        Audio.keyed(
            id + 'y',
            Audio.node(
                'ConstantSourceNode',
                [Audio.param('offset', data.y)],
                connections?.[id + 'y'] ?? []
            )
        ),
    ]
}
