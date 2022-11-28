export * as AddNode from './AddNode'
export * as AmpNode from './AmpNode'
export * as ConstNode from './ConstNode'
export * as DacNode from './DacNode'
export * as MulNode from './MulNode'
export * as OscNode from './OscNode'
export * as XYNode from './XYNode'
export * as SampleNode from './SampleNode'

import AddNode from './AddNode'
import AmpNode from './AmpNode'
import ConstNode from './ConstNode'
import DacNode from './DacNode'
import MulNode from './MulNode'
import OscNode from './OscNode'
import SampleNode from './SampleNode'
import XYNode from './XYNode'

// ReactFlow takes an object that maps node types to React components. It makes
// it simpler if we reuse the component function's name as the node name, and it
// makes sense to define that once here and import it wherever we want to create
// a new ReactFlow graph.
export const nodeTypes = {
    AddNode,
    AmpNode,
    ConstNode,
    DacNode,
    MulNode,
    OscNode,
    XYNode,
    SampleNode,
}
