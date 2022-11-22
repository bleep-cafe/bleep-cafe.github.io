export { default as AmpNode } from "./nodes/AmpNode"
export { default as DacNode } from "./nodes/DacNode"
export { default as OscNode } from "./nodes/OscNode"

import AmpNode from './nodes/AmpNode'
import DacNode from './nodes/DacNode'
import OscNode from './nodes/OscNode'

export default {
    AmpNode,
    DacNode,
    OscNode,
}

export const names = {
    amp: AmpNode.name,
    dac: DacNode.name,
    osc: OscNode.name,
}

// ReactFlow takes an object that maps node types to React components. It makes
// it simpler if we reuse the component function's name as the node name, and it
// makes sense to define that once here and import it wherever we want to create
// a new ReactFlow graph.
export const types = {
    [AmpNode.name]: AmpNode,
    [DacNode.name]: DacNode,
    [OscNode.name]: OscNode,
}
