import { useEffect, useRef } from 'react'

// Like useEffect - but skips the first render
export function useEffectUpdate(callback, dependencies) {
    const isFirstRender = useRef(true)

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false
            return
        }

        return callback()
    }, dependencies)
}
