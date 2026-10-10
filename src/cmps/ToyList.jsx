import { Link } from 'react-router-dom'

import { ToyPreview } from './ToyPreview.jsx'

export function ToyList({ toys, onRemoveToy }) {
    if (!toys.length) return <p className="no-toys">No toys to show...</p>

    return (
        <ul className="toy-list clean-list">
            {toys.map(toy =>
                <li key={toy._id}>
                    <ToyPreview toy={toy} />
                    <section className="toy-actions">
                        <Link to={`/toy/${toy._id}`} className="btn btn-light">Details</Link>
                        <Link to={`/toy/edit/${toy._id}`} className="btn btn-light">Edit</Link>
                        <button className="btn btn-danger" onClick={() => onRemoveToy(toy._id)}>Remove</button>
                    </section>
                </li>
            )}
        </ul>
    )
}
