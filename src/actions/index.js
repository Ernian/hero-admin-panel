import {
    heroesFetching,
    heroesFetched,
    heroesFetchingError,
    createHero,
    deleteHero,
    updateHero,
    parseHeroes,
} from '../components/heroesList/heroesSlice'

export const FILTERS_FETCHING = 'FILTERS_FETCHING'
export const FILTERS_FETCHED = 'FILTERS_FETCHED'
export const FILTERS_FETCHING_ERROR = 'FILTERS_FETCHING_ERROR'
export const SET_ACTIVE_FILTER = 'SET_ACTIVE_FILTER'

export const fetchHeroesThunk = request => dispatch => {
    dispatch(heroesFetching);
    request("http://localhost:3001/heroes")
        .then(data => dispatch(heroesFetched(data)))
        .catch(() => dispatch(heroesFetchingError()))
}

export const fetchFiltersThunk = request => dispatch => {
    dispatch(filtersFetching)
    request('http://localhost:3001/filters')
        .then(data => dispatch(filtersFetched(data)))
        .catch(() => dispatch(filtersFetchingError()))
}

export const deleteHeroThunk = (request, heroId) => dispatch => {
    request(`http://localhost:3001/heroes/${heroId}`, "DELETE")
        .then(() => dispatch(deleteHero(heroId)))
        .catch(() => dispatch(heroesFetchingError()))
}

export const createHeroThunk = (request, hero, clearForm) => dispatch => {
    request('http://localhost:3001/heroes', 'POST', hero)
        .then(() => dispatch(createHero(hero)))
        .then(() => dispatch(parseHeroes()))
        .then(() => clearForm())
        .catch(() => dispatch(heroesFetchingError()))
}

export const updateHeroThunk = (request, updateHeroId, hero, clearForm) => dispatch => {
    request(`http://localhost:3001/heroes/${updateHeroId}`, 'PUT', hero)
        .then(() => dispatch(updateHero(hero)))
        .then(() => dispatch(parseHeroes()))
        .then(() => clearForm())
        .catch(() => dispatch(heroesFetchingError()))
}

export const filtersFetching = () => ({
    type: FILTERS_FETCHING
})

export const filtersFetched = filters => ({
    type: FILTERS_FETCHED,
    payload: filters
})

export const filtersFetchingError = () => ({
    type: FILTERS_FETCHING_ERROR
})

export const setActiveFilter = filter => ({
    type: SET_ACTIVE_FILTER,
    payload: filter
})