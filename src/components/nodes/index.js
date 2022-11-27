export * as AmpNode from './AmpNode'
export * as DacNode from './DacNode'
export * as OscNode from './OscNode'
export * as XYNode from './XYNode'
export * as SampleNode from './SampleNode'

import AmpNode from './AmpNode'
import DacNode from './DacNode'
import OscNode from './OscNode'
import SampleNode from './SampleNode'
import XYNode from './XYNode'

// ReactFlow takes an object that maps node types to React components. It makes
// it simpler if we reuse the component function's name as the node name, and it
// makes sense to define that once here and import it wherever we want to create
// a new ReactFlow graph.
export const nodeTypes = {
    AmpNode,
    DacNode,
    OscNode,
    XYNode,
    SampleNode,
}
