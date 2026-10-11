import { useEffect } from 'react'

export function NicePopup({ heading, footing, onClose, children }) {

    useEffect(() => {
        function onKeyDown(ev) {
            if (ev.key === 'Escape') onClose()
        }
        document.body.addEventListener('keydown', onKeyDown)
        return () => {
            document.body.removeEventListener('keydown', onKeyDown)
        }
    }, [onClose])

    return (
        <section className="nice-popup-backdrop" onClick={onClose}>
            <section className="nice-popup" onClick={ev => ev.stopPropagation()}>
                <header>
                    <h3>{heading}</h3>
                    <button className="close-btn" onClick={onClose} title="Close (Esc)">x</button>
                </header>
                <main>
                    {children}
                </main>
                <footer>
                    {footing}
                </footer>
            </section>
        </section>
    )
}
