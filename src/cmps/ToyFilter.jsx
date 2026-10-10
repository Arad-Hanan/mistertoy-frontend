import { useState, useRef } from 'react'

import { utilService } from '../services/util.service.js'
import { toyService } from '../services/toy.service.js'
import { useEffectUpdate } from '../hooks/useEffectUpdate.js'

export function ToyFilter({ filterBy, onSetFilter }) {
    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    const debouncedOnSetFilter = useRef(utilService.debounce(onSetFilter, 400))
    const labels = toyService.getLabels()

    useEffectUpdate(() => {
        debouncedOnSetFilter.current(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        let { value, name: field, type } = target

        switch (field) {
            case 'inStock':
                // 3 states: '' = all (undefined), 'true', 'false'
                value = value === '' ? undefined : value === 'true'
                break
            case 'labels':
                value = [...target.selectedOptions].map(option => option.value)
                break
            case 'sortDir':
                value = target.checked ? -1 : 1
                break
            default:
                if (type === 'number') value = +value
        }

        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    function onClearFilter() {
        setFilterByToEdit(toyService.getDefaultFilter())
    }

    const { txt, inStock, sortBy, sortDir } = filterByToEdit
    const inStockValue = inStock === undefined ? '' : String(inStock)

    return (
        <section className="toy-filter">
            <form onSubmit={ev => ev.preventDefault()}>
                <label className="filter-field">
                    <span>Name</span>
                    <input type="text"
                        name="txt"
                        placeholder="Search by name..."
                        value={txt}
                        onChange={handleChange}
                    />
                </label>

                <label className="filter-field">
                    <span>Stock</span>
                    <select name="inStock" value={inStockValue} onChange={handleChange}>
                        <option value="">All</option>
                        <option value="true">In stock</option>
                        <option value="false">Out of stock</option>
                    </select>
                </label>

                <label className="filter-field">
                    <span>Labels</span>
                    <select name="labels" multiple value={filterByToEdit.labels} onChange={handleChange}>
                        {labels.map(label =>
                            <option key={label} value={label}>{label}</option>
                        )}
                    </select>
                </label>

                <label className="filter-field">
                    <span>Sort by</span>
                    <select name="sortBy" value={sortBy} onChange={handleChange}>
                        <option value="">None</option>
                        <option value="name">Name</option>
                        <option value="price">Price</option>
                        <option value="createdAt">Created</option>
                    </select>
                </label>

                <label className="filter-field sort-dir">
                    <input type="checkbox"
                        name="sortDir"
                        checked={sortDir === -1}
                        onChange={handleChange}
                        disabled={!sortBy}
                    />
                    <span>Descending</span>
                </label>

                <button type="button" className="btn btn-light" onClick={onClearFilter}>Clear</button>
            </form>
        </section>
    )
}
