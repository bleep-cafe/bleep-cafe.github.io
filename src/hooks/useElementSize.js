import { useCallback, useLayoutEffect, useState } from "react"

export default function useElementSize() {
    // Mutable values like "ref.current" aren"t valid dependencies because
    // mutating them doesn"t re-render the component. Instead, we you `useState`
    // and let the caller set the ref themselves so it is reactive.
    const [ref, setRef] = useState(null)
    const [size, setSize] = useState({
        width: 0,
        height: 0,
    })

    const handleSize = useCallback(() => {
        setSize({ width: ref?.offsetWidth || 0, height: ref?.offsetHeight || 0 })
    }, [ref?.offsetHeight, ref?.offsetWidth])

    useLayoutEffect(handleSize, [ref?.offsetHeight, ref?.offsetWidth])

    return [setRef, size]
}
