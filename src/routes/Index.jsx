import * as Amp from "../components/nodes/AmpNode"
import * as Dac from "../components/nodes/DacNode"
import * as Nodes from '../components/Nodes'
import * as Osc from "../components/nodes/OscNode"
import * as Router from "react-router-dom"

import ReactFlow, { applyNodeChanges } from "reactflow"
import { useEffect, useReducer } from "react"

import { distribute } from "../util/maths"
import useAudio from "../hooks/useAudio"
import useElementSize from "../hooks/useElementSize"

export default function Index() {
    return (
        <>
            <section className="pt-24 pb-16 space-y-16 prose prose-xl bg-neutral-50 max-w-none">
                <h1 className="font-bold text-8xl font-title">Let's make some sound!</h1>
                <p>
                    bleep.cafe is a place to learn and explore the world of digital
                    and modular synthesis. It runs entirely in your browser so
                    there"s no need to install anything!
                </p>

                <div className="w-full h-96 not-prose">
                    <DemoGraph />
                </div>

                <p>
                    If you're entirely new to synthesis or digital audio, we have
                    a <Router.Link to="/play">bunch of tutorials</Router.Link> that
                    will guide you from the ground up and teach you the basics of
                    synthesis.
                </p>
                <p>
                    If you just want to get stuck in and have a play around on
                    the platform, check out the <Router.Link to="/play">playground</Router.Link>.
                </p>

                <h2>How can I get involved?</h2>
                <p>
                    The easiest way to help out is to start making things and
                    tell all your friends. If you're a developer, you can get
                    involved by reporting any bugs you find on GitHub or even
                    contributing to the codebase yourself: bleep.cafe is entirely
                    open source!
                </p>
            </section>

            <footer className="p-4 font-mono text-right text-white bg-neutral-900">
                <p>
                    Made with <span aria-label="love" role="img"> 💖 </span>
                    by <a href="https://github.com/hayleigh-dot-dev">hayleigh-dot-dev</a>.
                </p>
            </footer>
        </>
    )
}

// 

function DemoGraph() {
    const [ref, { width, height }] = useElementSize()
    // This is obviously a super ad-hoc way to do state management. What I'd really
    // like is to use some sort of state management library like Zustand (that
    // one is recommended by the ReactFlow folks) but I'm not sure how to do that
    // in a way that makes sure each graph gets its own state.
    const [nodes, dispatch] = useReducer((state, { event, ...action }) => {
        switch (event) {
            // The width of the container isn't fixed in pixels. We want to
            // distribute the nodes evenly across the width of the container, so
            // we need to re-set the position of everything once we have the
            // container's dimensions.
            case "onGotDimensions": {
                const { width, height } = action
                return applyNodeChanges(
                    state.map(({ id }, i) => ({ id, type: "position", position: { x: distribute(0, width, 3, i) - 54, y: height / 4 } })),
                    state
                )
            }

            // This action gets dispatched by individual nodes whenever their 
            // data changes. 
            case "onNodeChange": {
                const { id, data } = action
                return state.map((node) => {
                    if (node.id == id) {
                        node.data = { ...node.data, ...data }
                    }
                    return node
                })
            }

            // This action gets dispatched by the ReactFlow component itself. 
            // Presumably when things change 😅 somehow.
            case "onNodesChange": {
                const { changes } = action
                return applyNodeChanges(changes, state)
            }

            default:
                return state
        }
    }, [
        // Once we work out state management, we won't need to pass down these
        // `onNodeChange` handlers anymore. Instead, nodes can just dispatch
        // the appropriate actions and magically it will all work, I hope.
        { id: "1", type: Nodes.names.osc, position: { x: 0, y: 0 }, data: { ...Osc.defaults, onNodeChange: (id, data) => dispatch({ event: "onNodeChange", id, data }) } },
        { id: "2", type: Nodes.names.amp, position: { x: 0, y: 0 }, data: { ...Amp.defaults, onNodeChange: (id, data) => dispatch({ event: "onNodeChange", id, data }) } },
        { id: "3", type: Nodes.names.dac, position: { x: 0, y: 0 }, data: { ...Dac.defaults, onNodeChange: (id, data) => dispatch({ event: "onNodeChange", id, data }) } },
    ])
    const [_, setAudioFromReactFlow, context] = useAudio()

    useEffect(() => { window.addEventListener('click', () => context.resume()) }, [])
    useEffect(() => { setAudioFromReactFlow(nodes, edges) }, [nodes])
    useEffect(() => dispatch({ event: "onGotDimensions", width, height }), [width])

    return <ReactFlow
        edges={edges}
        nodes={nodes}
        nodeTypes={Nodes.types}
        onNodesChange={changes => dispatch({ event: "onNodesChange", changes })}
        className="bg-neutral-100"
        preventScrolling={false}
        zoomOnScroll={false}
        panOnDrag={false}
        ref={ref}
    />
}

const edges = [
    { id: "1->2", source: "1", sourceHandle: "out", target: "2", targetHandle: "in" },
    { id: "2->3", source: "2", sourceHandle: "out", target: "3", targetHandle: "in" },
]
