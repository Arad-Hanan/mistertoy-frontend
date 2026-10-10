import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { loadToys, removeToyOptimistic, setFilterBy } from '../store/actions/toy.actions.js'

import { ToyFilter } from '../cmps/ToyFilter.jsx'
import { ToyList } from '../cmps/ToyList.jsx'

export function ToyIndex() {
    const toys = useSelector(storeState => storeState.toyModule.toys)
    const filterBy = useSelector(storeState => storeState.toyModule.filterBy)
    const isLoading = useSelector(storeState => storeState.toyModule.isLoading)

    useEffect(() => {
        loadToys()
            .catch(() => {
                showErrorMsg('Cannot load toys')
            })
    }, [filterBy])

    function onSetFilter(filterBy) {
        setFilterBy(filterBy)
    }

    function onRemoveToy(toyId) {
        removeToyOptimistic(toyId)
            .then(() => {
                showSuccessMsg('Toy removed')
            })
            .catch(() => {
                showErrorMsg('Cannot remove toy')
            })
    }

    return (
        <section className="toy-index">
            <header className="toy-index-header flex justify-between align-center">
                <h2>Our Toys</h2>
                <Link to="/toy/edit" className="btn">Add Toy</Link>
            </header>

            <ToyFilter filterBy={filterBy} onSetFilter={onSetFilter} />

            {isLoading
                ? <div className="loader">Loading...</div>
                : <ToyList toys={toys} onRemoveToy={onRemoveToy} />
            }
        </section>
    )
}
