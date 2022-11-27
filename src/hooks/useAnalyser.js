import { useEffect, useMemo } from 'react'
import { ctx } from '../util/audioContext'

// Given the id for some audio connect, connect an analyser node to its output
// and return the analyser node. This lets us hook into anywhere in the graph and
// do things like visualisation with the data.
export function useAnalyser(id) {
    const analyser = useMemo(() => new AnalyserNode(ctx, { fftSize: 2048 }), [])

    useEffect(() => {
        if (id in ctx.nodes) {
            ctx.nodes[id].connect(analyser)
            return () => ctx.nodes[id]?.disconnect(analyser)
        }
    }, [])

    return analyser
}
