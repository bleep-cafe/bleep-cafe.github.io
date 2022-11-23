import { useCallback, useLayoutEffect, useState } from "react"

export default function useElementSize(ref) {
    const [size, setSize] = useState({
        width: 0,
        height: 0,
    })

    const handleSize = useCallback(() => {
        setSize({
            width: ref?.current?.offsetWidth || 0,
            height: ref?.current?.offsetHeight || 0,
        });
    }, []);

    useLayoutEffect(handleSize, [ref?.current?.offsetHeight, ref?.current?.offsetWidth])

    return size
}
