import { useAnalyser } from "../hooks/useAnalyser"
import useAnimationFrame from "../hooks/useAnimationFrame"
import { useRef } from "react"

export default function Oscilloscope({ nodeId, width = 256, height = width / 3, ...props }) {
    const analyser = useAnalyser(nodeId)
    const canvas = useRef(null)

    useAnimationFrame(() => {
        const data = new Uint8Array(512)
        analyser.getByteTimeDomainData(data)
        const height = canvas.current.height
        const width = canvas.current.width
        const context = canvas.current.getContext('2d')
        const sliceWidth = (width * 1.0) / data.length

        context.lineWidth = 3
        context.strokeStyle = "#ec4899"
        context.clearRect(0, 0, width, height)

        context.beginPath()
        context.moveTo(0, height / 2)

        const x = data.reduce((x, n) => {
            const y = (n / 255.0) * height
            context.lineTo(x, y)
            return x + sliceWidth
        }, 0)

        context.lineTo(x, height / 2)
        context.stroke()
    })

    return <canvas width={width} height={height} ref={canvas} {...props} />
}