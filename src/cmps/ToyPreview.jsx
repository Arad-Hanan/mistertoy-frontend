import { Link } from 'react-router-dom'

export function ToyPreview({ toy }) {
    return (
        <article className="toy-preview">
            <Link to={`/toy/${toy._id}`}>
                <img src={toy.imgUrl} alt={toy.name} />
                <h3>{toy.name}</h3>
            </Link>
            <p className="price">${toy.price}</p>
            <p className={`stock ${toy.inStock ? 'in' : 'out'}`}>
                {toy.inStock ? 'In stock' : 'Out of stock'}
            </p>
        </article>
    )
}
