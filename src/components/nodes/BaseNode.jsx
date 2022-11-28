import * as React from 'react'
import * as ReactFlow from 'reactflow'

import Popover from '../Popover'
import { QuestionMarkIcon } from '@radix-ui/react-icons'
import { distribute } from '../../util/maths'

export default function BaseNode({
    name,
    info,
    inputs,
    outputs,
    children,
    standalone = false,
}) {
    return (
        <div className="relative flex flex-col w-32 font-sans group">
            {!standalone &&
                inputs.map((id, i) => (
                    <ReactFlow.Handle
                        key={id}
                        id={id ? `in-${id}` : 'in'}
                        title={id || 'in'}
                        position={ReactFlow.Position.Left}
                        style={{
                            top: distribute(0, 100, inputs.length, i) + '%',
                        }}
                        type="target"
                    />
                ))}

            <div className="drag flex justify-between items-center absolute opacity-80 group-hover:opacity-100 -translate-y-[45%] transition group-hover:-translate-y-[80%] rounded-t-xl w-full px-2 pb-2 bg-gradient-to-r from-pink-500 to-pink-400">
                <span className="font-bold text-white font-title">{name}</span>
                {info && (
                    <Popover content={info} side="right">
                        <button aria-label="Info">
                            <QuestionMarkIcon className="w-5 h-5 p-1 text-white transition rounded-full opacity-0 group-hover:opacity-100 hover:bg-neutral-700" />
                        </button>
                    </Popover>
                )}
            </div>

            <div
                className="min-h-[3rem] z-10 p-2 transition bg-white rounded shadow text-neutral-800 nodrag rounded-xl group-hover:shadow-lg"
                // This event listener captures keypress events on the node"s
                // controls. Without it, the node will start moving around in the
                // graph whenever you press an arrow key!
                onKeyDown={(e) => {
                    if (e.key != 'tab') {
                        e.stopPropagation()
                    }
                }}
            >
                {children}
            </div>

            {!standalone &&
                outputs.map((id, i) => (
                    <ReactFlow.Handle
                        key={id}
                        id={id ? `out-${id}` : 'out'}
                        title={id || 'out'}
                        position={ReactFlow.Position.Right}
                        style={{
                            top: distribute(0, 100, outputs.length, i) + '%',
                        }}
                        type="source"
                    />
                ))}
        </div>
    )
}
