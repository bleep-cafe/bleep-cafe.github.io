import { useCallback, useEffect, useRef } from 'react'

// `useAnimationFrame` lets us pass in some effectful callback to exectue on
// every animation frame.
export default function useAnimationFrame(callback) {
    // We use mutable refs to track the id of the animation frame across renders.
    const previousTimeRef = useRef(null)
    const requestRef = useRef(null)
    const animate = useCallback(
        (time) => {
            previousTimeRef.current = time
            requestRef.current = requestAnimationFrame(animate)

            callback()
        },
        [callback]
    )

    // This kicks off the render, and provides a cleanup function to cancel a
    // pending animation frame.
    useEffect(() => {
        requestRef.current = requestAnimationFrame(animate)

        return () => {
            if (requestRef.current != null) {
                cancelAnimationFrame(requestRef.current)
            }
        }
    }, [animate])
}
