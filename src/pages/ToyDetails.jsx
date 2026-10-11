import { useCallback, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { toyService } from '../services/toy.service.js'
import { showErrorMsg } from '../services/event-bus.service.js'

import { NicePopup } from '../cmps/NicePopup.jsx'
import { Chat } from '../cmps/Chat.jsx'

export function ToyDetails() {
    const [toy, setToy] = useState(null)
    const [isChatOpen, setIsChatOpen] = useState(false)
    const { toyId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadToy()
    }, [toyId])

    function loadToy() {
        toyService.getById(toyId)
            .then(setToy)
            .catch(err => {
                console.log('Had issues loading toy', err)
                showErrorMsg('Cannot load toy')
                navigate('/toy')
            })
    }

    const onCloseChat = useCallback(() => setIsChatOpen(false), [])

    if (!toy) return <div className="loader">Loading...</div>

    return (
        <section className="toy-details">
            <img src={toy.imgUrl} alt={toy.name} />

            <div className="toy-info">
                <h2>{toy.name}</h2>
                <p className="price">${toy.price}</p>
                <p className={`stock ${toy.inStock ? 'in' : 'out'}`}>
                    {toy.inStock ? 'In stock' : 'Out of stock'}
                </p>

                <ul className="labels clean-list">
                    {toy.labels.map(label => <li key={label}>{label}</li>)}
                </ul>

                <p className="created-at">Added on {new Date(toy.createdAt).toLocaleDateString()}</p>

                <div className="toy-details-actions">
                    <Link to={`/toy/edit/${toy._id}`} className="btn">Edit</Link>
                    <Link to="/toy" className="btn btn-light">Back</Link>
                </div>
            </div>

            <button className="chat-btn" onClick={() => setIsChatOpen(true)} title="Chat with us">
                💬
            </button>

            {isChatOpen &&
                <NicePopup
                    heading={`Ask us about ${toy.name}`}
                    footing="Our support team usually answers in seconds"
                    onClose={onCloseChat}
                >
                    <Chat />
                </NicePopup>
            }
        </section>
    )
}
