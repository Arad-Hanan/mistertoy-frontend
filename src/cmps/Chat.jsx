import { useState, useEffect, useRef } from 'react'

import { utilService } from '../services/util.service.js'

const AUTO_REPLY = 'Sure thing honey'

export function Chat() {
    const [msgs, setMsgs] = useState([])
    const [txt, setTxt] = useState('')
    const timeoutIdsRef = useRef([])
    const elMsgsRef = useRef()

    useEffect(() => {
        // Clear pending auto replies when the chat is closed
        const timeoutIds = timeoutIdsRef.current
        return () => timeoutIds.forEach(clearTimeout)
    }, [])

    useEffect(() => {
        const elMsgs = elMsgsRef.current
        if (elMsgs) elMsgs.scrollTop = elMsgs.scrollHeight
    }, [msgs])

    function addMsg(from, txt) {
        setMsgs(prevMsgs => [...prevMsgs, { id: utilService.makeId(), from, txt }])
    }

    function onSend(ev) {
        ev.preventDefault()
        if (!txt.trim()) return

        addMsg('Me', txt)
        setTxt('')

        const timeoutId = setTimeout(() => addMsg('Support', AUTO_REPLY), 1500)
        timeoutIdsRef.current.push(timeoutId)
    }

    return (
        <section className="chat">
            <ul className="chat-msgs clean-list" ref={elMsgsRef}>
                {!msgs.length && <li className="no-msgs">Say hi to our support team</li>}
                {msgs.map(msg =>
                    <li key={msg.id} className={msg.from === 'Me' ? 'mine' : 'theirs'}>
                        <span className="from">{msg.from}:</span> {msg.txt}
                    </li>
                )}
            </ul>

            <form className="chat-form" onSubmit={onSend}>
                <input type="text"
                    value={txt}
                    onChange={ev => setTxt(ev.target.value)}
                    placeholder="Type a message..."
                    autoFocus
                />
                <button className="btn">Send</button>
            </form>
        </section>
    )
}
