import * as Amp from "../components/nodes/AmpNode"
import * as ContextMenu from "../components/ContextMenu"
import * as Dac from "../components/nodes/DacNode"
import * as Nodes from "../components/Nodes"
import * as Osc from "../components/nodes/OscNode"
import * as XY from "../components/nodes/XYNode"
import * as Sample from "../components/nodes/SampleNode"

import ReactFlow, { ReactFlowProvider } from "reactflow"
import { useEffect, useRef, useState } from "react"

import { GraphContext } from '../contexts/graphContext'
import { useGraph } from "../hooks/useGraph"

export default function Playground() {
    const editor = useRef(null)
    const useStore = useGraph({
        ref: editor, nodes: [], edges: []
    })

    const nodes = useStore(state => state.nodes)
    const edges = useStore(state => state.edges)
    const insertNode = useStore(state => state.insertNode)
    const updateNodes = useStore(state => state.updateNodes)
    const updateEdges = useStore(state => state.updateEdges)
    const onConnect = useStore(state => state.onConnect)

    // We keep track of the mouse position to know where to place a newly created
    // node.
    const [trackMouse, shouldTrackMouse] = useState(true)
    const [position, setPosition] = useState({ x: 0, y: 0 })
    useEffect(() => {
        const onMouseMove = ({ clientX, clientY }) => {
            if (trackMouse) {
                setPosition({ x: clientX, y: clientY })
            }
        }
        // Users should be able to create nodes either via keyboard shortcuts for
        // the most common nodes, or via a context menu to select from all nodes.
        // 
        // If the context menu is opened, we want to stop tracking mouse position
        // so the new node is created at the position where the menu was opened
        // and not wherever the mouse was when navigating the menu!
        const onContextMenu = ({ clientX, clientY }) => {
            shouldTrackMouse(false)
            setPosition({ x: clientX, y: clientY })
        }

        window.addEventListener("mousemove", onMouseMove)
        window.addEventListener("contextmenu", onContextMenu)

        return () => {
            window.addEventListener("mousemove", onMouseMove)
            window.removeEventListener("contextmenu", onContextMenu)
        }
    }, [])

    const createNode = constructor => _ => {
        const opts = { position }
        // It's important to note the id of a node *must* be a string. Using just
        // `Date.now()` here would result in the node being added to the graph
        // but never being rendered.
        const node = constructor(String(Date.now()), undefined, opts)

        // Re-enable mouse tracking if it was disabled by the context menu.
        shouldTrackMouse(true)
        insertNode(node)
    }

    const menuItems = [
        { type: "item", label: "oscillator", shortcut: "O", onSelect: createNode(Osc.asReactFlowNode), classes: "rounded-t" },
        { type: "item", label: "amp", shortcut: "A", onSelect: createNode(Amp.asReactFlowNode) },
        { type: "item", label: "sample", onSelect: createNode(Sample.asReactFlowNode)},
        { type: "divider" },
        { type: "item", label: "xy pad", onSelect: createNode(XY.asReactFlowNode) },
        { type: "divider" },
        { type: "item", label: "dac", shortcut: "D", onSelect: createNode(Dac.asReactFlowNode), classes: "rounded-b" },
    ]

    const menu = menuItems.map(({ type, label, shortcut, onSelect, classes = "" }, i) => {
        switch (type) {
            case "item":
                return <ContextMenu.Item key={label} onSelect={onSelect} className={classes}>
                    <span className="text-sm flex-1">{label}</span>
                    {shortcut &&
                        <kbd className="text-xs w-10 font-mono text-right text-neutral-500 group-hover:text-white">
                            ⌘+{shortcut}
                        </kbd>
                    }
                </ContextMenu.Item>

            case "divider":
                return <ContextMenu.Divider key={label || i} />

            default:
                return null
        }
    })

    return (
        <ContextMenu.Root content={menu}>
            <div className="w-screen h-screen">
                <GraphContext.Provider value={useStore}>
                    <ReactFlowProvider>
                        <ReactFlow
                            edges={edges}
                            nodes={nodes}
                            nodeTypes={Nodes.types}
                            onNodesChange={updateNodes}
                            onEdgesChange={updateEdges}
                            onConnect={onConnect}
                            className="bg-neutral-100"
                            preventScrolling={false}
                            zoomOnScroll={false}
                            panOnDrag={false}
                            ref={editor}
                        />
                    </ReactFlowProvider>
                </GraphContext.Provider>
            </div>
        </ContextMenu.Root>
    )
}