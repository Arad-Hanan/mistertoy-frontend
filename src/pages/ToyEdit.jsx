import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { toyService } from '../services/toy.service.js'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { saveToy } from '../store/actions/toy.actions.js'

export function ToyEdit() {
    const [toyToEdit, setToyToEdit] = useState(toyService.getEmptyToy())
    const { toyId } = useParams()
    const navigate = useNavigate()
    const labels = toyService.getLabels()

    useEffect(() => {
        if (toyId) loadToy()
    }, [toyId])

    function loadToy() {
        toyService.getById(toyId)
            .then(setToyToEdit)
            .catch(err => {
                console.log('Had issues loading toy', err)
                showErrorMsg('Cannot load toy')
                navigate('/toy')
            })
    }

    function handleChange({ target }) {
        let { value, type, name: field, checked } = target
        if (type === 'number') value = +value
        if (type === 'checkbox') value = checked
        setToyToEdit(prevToy => ({ ...prevToy, [field]: value }))
    }

    function onToggleLabel(label) {
        setToyToEdit(prevToy => {
            const labels = prevToy.labels.includes(label)
                ? prevToy.labels.filter(currLabel => currLabel !== label)
                : [...prevToy.labels, label]
            return { ...prevToy, labels }
        })
    }

    function onSaveToy(ev) {
        ev.preventDefault()
        if (!toyToEdit.name.trim()) return showErrorMsg('Toy name is required')

        saveToy(toyToEdit)
            .then(savedToy => {
                showSuccessMsg(`Toy saved (${savedToy.name})`)
                navigate('/toy')
            })
            .catch(() => {
                showErrorMsg('Cannot save toy')
            })
    }

    const { name, price, imgUrl, inStock } = toyToEdit

    return (
        <section className="toy-edit">
            <h2>{toyToEdit._id ? 'Edit' : 'Add'} Toy</h2>

            <form onSubmit={onSaveToy}>
                <label>
                    <span>Name</span>
                    <input type="text"
                        name="name"
                        placeholder="Enter toy name..."
                        value={name}
                        onChange={handleChange}
                        required
                    />
                </label>

                <label>
                    <span>Price</span>
                    <input type="number"
                        name="price"
                        min="0"
                        placeholder="Enter price"
                        value={price}
                        onChange={handleChange}
                    />
                </label>

                <label>
                    <span>Image URL</span>
                    <input type="text"
                        name="imgUrl"
                        placeholder="https://..."
                        value={imgUrl}
                        onChange={handleChange}
                    />
                </label>

                <label className="in-stock">
                    <input type="checkbox"
                        name="inStock"
                        checked={inStock}
                        onChange={handleChange}
                    />
                    <span>In stock</span>
                </label>

                <fieldset className="labels-select">
                    <legend>Labels</legend>
                    {labels.map(label =>
                        <label key={label}>
                            <input type="checkbox"
                                checked={toyToEdit.labels.includes(label)}
                                onChange={() => onToggleLabel(label)}
                            />
                            <span>{label}</span>
                        </label>
                    )}
                </fieldset>

                <div className="toy-edit-actions">
                    <button className="btn">{toyToEdit._id ? 'Save' : 'Add'}</button>
                    <Link to="/toy" className="btn btn-light">Cancel</Link>
                </div>
            </form>
        </section>
    )
}
