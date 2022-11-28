// The module is provided as a template for impementing new audio nodes in the
// ReactFlow graph. Do *not* import this module directly. Instead, copy it to
// a new file in the same directory, and modify it to suit your needs.
import * as Audio from '../../audio/context'
import * as React from 'react'

import BaseNode from './BaseNode'

// CONSTANTS -------------------------------------------------------------------

const name = ''
const info = '' /*
    // When `info` isn't empty, it will be displayed in a popover if the user
    // clicks the "?" icon in the top right corner of the node.
    //
    // You can put any old JSX here, but try to keep it brief and simple. For more
    // detailed explanations, maybe consider adding a chapter to the learning
    // guide.
    <p>
    </p>
*/

// The `inputs` and `outputs` arrays define the number and names of the node's
// input and output ports. The names are used to generate the labels for the
// ports, and also used when converting the node to Web Audio bits.
//
// An empty name implicitly means the port is named after the node's ID. Names
// beginning with a period, such as ".frequency", map to an audio node's parameters.
// It's clearer to just see how this works, so let's take a quick look:
//
// ""               -> signal.connect(nodes[id])
// ".gain"          -> signal.connect(nodes[id].gain)
// "left"           -> signal.connect(nodes[`${id}-left`])
// "left.frequency" -> signal.connect(nodes[`${id}-left`].frequency)
//
const inputs = []
const outputs = []

// The `defaults` object is used to initialize the node's data when it is
// created. It is also used to reset the node's data when the user clicks the
// "reset" button in the node's popover.
export const defaults = {}

// COMPONENTS ------------------------------------------------------------------

export default function _TemplateNode({ id, data = defaults }) {
    return (
        <BaseNode name={name} info={info} inputs={inputs} outputs={outputs}>
            {/* All UI controls for your node should go here. Sliders, toggles,
                oscilloscopes... whatever you want! */}
        </BaseNode>
    )
}

// CONSTUCTORS -----------------------------------------------------------------

export const asReactFlowNode = (id, data = defaults, opts = {}) => ({
    type: _TemplateNode.name,
    id,
    data,
    ...opts,
})

export const asAudioNodes = (id, data = defaults, connections = {}) => []
