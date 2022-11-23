import * as Nodes from '../components/Nodes'
import * as Router from "react-router-dom"

import ReactFlow from "reactflow"
import { useRef } from "react"
import { useGraph } from "../hooks/useGraph"
import { GraphContext } from '../contexts/graphContext'

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
    const ref = useRef(null);
    const useStore = useGraph({
        ref,
        nodes: [
            { id: "1", type: Nodes.names.osc },
            { id: "2", type: Nodes.names.amp },
            { id: "3", type: Nodes.names.dac },
        ],
        edges: [
            { id: "1->2", source: "1", sourceHandle: "out", target: "2", targetHandle: "in" },
            { id: "2->3", source: "2", sourceHandle: "out", target: "3", targetHandle: "in" },
        ],
    });

    const nodes = useStore(state => state.nodes);
    const edges = useStore(state => state.edges);
    const updateNodes = useStore(state => state.updateNodes);
    const updateEdges = useStore(state => state.updateEdges);

    return <GraphContext.Provider value={useStore}>
        <ReactFlow
            edges={edges}
            nodes={nodes}
            nodeTypes={Nodes.types}
            onNodesChange={updateNodes}
            onEdgesChange={updateEdges}
            className="bg-neutral-100"
            preventScrolling={false}
            zoomOnScroll={false}
            panOnDrag={false}
            ref={ref}
        />
    </GraphContext.Provider>
}
