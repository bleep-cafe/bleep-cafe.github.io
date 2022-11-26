export { default as AmpNode } from './nodes/AmpNode'
export { default as DacNode } from './nodes/DacNode'
export { default as OscNode } from './nodes/OscNode'
export { default as XYNode } from './nodes/XYNode'

import AmpNode, { defaults as AmpNodeDefaults } from './nodes/AmpNode'
import DacNode, { defaults as DacNodeDefaults } from './nodes/DacNode'
import OscNode, { defaults as OscNodeDefaults } from './nodes/OscNode'
import XYNode, { defaults as XYNodeDefaults } from './nodes/XYNode'

export default {
    AmpNode,
    DacNode,
    OscNode,
}

export const names = {
    amp: AmpNode.name,
    dac: DacNode.name,
    osc: OscNode.name,
    xy: XYNode.name,
}

// ReactFlow takes an object that maps node types to React components. It makes
// it simpler if we reuse the component function's name as the node name, and it
// makes sense to define that once here and import it wherever we want to create
// a new ReactFlow graph.
export const types = {
    [AmpNode.name]: AmpNode,
    [DacNode.name]: DacNode,
    [OscNode.name]: OscNode,
    [XYNode.name]: XYNode,
}

export const defaults = new Map([
    [AmpNode.name, AmpNodeDefaults],
    [DacNode.name, DacNodeDefaults],
    [OscNode.name, OscNodeDefaults],
    [XYNode.name, XYNodeDefaults],
])
