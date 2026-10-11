import { useState } from 'react'

// Renders a list of collapsible items - only one item is open at a time
export function Accordion({ items }) {
    const [openIdx, setOpenIdx] = useState(null)

    function onToggle(idx) {
        setOpenIdx(prevIdx => prevIdx === idx ? null : idx)
    }

    return (
        <ul className="accordion clean-list">
            {items.map((item, idx) =>
                <AccordionItem
                    key={item.title}
                    title={item.title}
                    isOpen={openIdx === idx}
                    onToggle={() => onToggle(idx)}
                >
                    {item.content}
                </AccordionItem>
            )}
        </ul>
    )
}

function AccordionItem({ title, isOpen, onToggle, children }) {
    return (
        <li className={`accordion-item ${isOpen ? 'open' : ''}`}>
            <button className="accordion-title" onClick={onToggle} aria-expanded={isOpen}>
                <span>{title}</span>
                <span className="arrow">➜</span>
            </button>
            <section className="accordion-content">
                <div className="accordion-inner">
                    {children}
                </div>
            </section>
        </li>
    )
}
