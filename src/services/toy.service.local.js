import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

const STORAGE_KEY = 'toyDB'

const labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle', 'Outdoor', 'Battery Powered']

_createToys()

export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
    getRandomToy,
    getDefaultFilter,
    getLabels,
}

function query(filterBy = {}) {
    return storageService.query(STORAGE_KEY)
        .then(toys => {
            let filteredToys = toys

            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                filteredToys = filteredToys.filter(toy => regExp.test(toy.name))
            }

            if (filterBy.inStock !== undefined) {
                filteredToys = filteredToys.filter(toy => toy.inStock === filterBy.inStock)
            }

            if (filterBy.labels && filterBy.labels.length) {
                filteredToys = filteredToys.filter(toy =>
                    filterBy.labels.every(label => toy.labels.includes(label))
                )
            }

            if (filterBy.sortBy) {
                const dir = filterBy.sortDir || 1
                filteredToys = [...filteredToys].sort((t1, t2) => {
                    if (filterBy.sortBy === 'name') return t1.name.localeCompare(t2.name) * dir
                    return (t1[filterBy.sortBy] - t2[filterBy.sortBy]) * dir
                })
            }

            return filteredToys
        })
}

function getById(toyId) {
    return storageService.get(STORAGE_KEY, toyId)
}

function remove(toyId) {
    return storageService.remove(STORAGE_KEY, toyId)
}

function save(toy) {
    if (!toy.imgUrl) toy = { ...toy, imgUrl: _getImgUrl(toy.name) }

    if (toy._id) {
        return storageService.put(STORAGE_KEY, toy)
    } else {
        toy = { ...toy, createdAt: Date.now() }
        return storageService.post(STORAGE_KEY, toy)
    }
}

function getEmptyToy() {
    return {
        name: '',
        imgUrl: '',
        price: '',
        labels: [],
        inStock: true,
    }
}

function getRandomToy() {
    const name = 'Toy-' + utilService.makeId(3)
    return {
        name,
        imgUrl: _getImgUrl(name),
        price: utilService.getRandomIntInclusive(20, 300),
        labels: _getRandomLabels(),
        inStock: Math.random() > 0.3,
    }
}

// inStock: undefined = all, true = in stock, false = out of stock
function getDefaultFilter() {
    return { txt: '', inStock: undefined, labels: [], sortBy: '', sortDir: 1 }
}

function getLabels() {
    return [...labels]
}

// Private functions

function _getImgUrl(name) {
    return `https://robohash.org/${encodeURIComponent(name)}?set=set3&size=200x200`
}

function _getRandomLabels() {
    const count = utilService.getRandomIntInclusive(1, 3)
    const shuffled = [...labels].sort(() => Math.random() - 0.5)
    return shuffled.slice(0, count)
}

function _createToys() {
    let toys = utilService.loadFromStorage(STORAGE_KEY)
    if (toys && toys.length) return

    const toyNames = [
        { name: 'Talking Doll', labels: ['Doll', 'Battery Powered', 'Baby'] },
        { name: 'Race Car', labels: ['On wheels', 'Battery Powered'] },
        { name: 'Giant Puzzle', labels: ['Puzzle', 'Box game'] },
        { name: 'Crayon Set', labels: ['Art'] },
        { name: 'Baby Rattle', labels: ['Baby'] },
        { name: 'Monopoly', labels: ['Box game'] },
        { name: 'Kite', labels: ['Outdoor'] },
        { name: 'Robot Dog', labels: ['Battery Powered', 'On wheels'] },
        { name: 'Rag Doll', labels: ['Doll', 'Baby'] },
        { name: 'Skateboard', labels: ['On wheels', 'Outdoor'] },
        { name: 'Paint by Numbers', labels: ['Art', 'Puzzle'] },
        { name: 'Water Gun', labels: ['Outdoor'] },
    ]

    const DAY = 1000 * 60 * 60 * 24
    toys = toyNames.map(({ name, labels }) => ({
        _id: utilService.makeId(),
        name,
        imgUrl: _getImgUrl(name),
        price: utilService.getRandomIntInclusive(20, 300),
        labels,
        createdAt: Date.now() - utilService.getRandomIntInclusive(1, 365) * DAY,
        inStock: Math.random() > 0.3,
    }))

    utilService.saveToStorage(STORAGE_KEY, toys)
}
