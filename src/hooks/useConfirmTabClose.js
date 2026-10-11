import { useState, useEffect } from 'react'

// Warns the user before closing / refreshing the tab while there are unsaved changes
export function useConfirmTabClose() {
    const [hasChanges, setHasChanges] = useState(false)

    useEffect(() => {
        if (!hasChanges) return

        function handleBeforeUnload(ev) {
            ev.preventDefault()
            ev.returnValue = true
        }

        window.addEventListener('beforeunload', handleBeforeUnload)

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload)
        }
    }, [hasChanges])

    return [hasChanges, setHasChanges]
}
