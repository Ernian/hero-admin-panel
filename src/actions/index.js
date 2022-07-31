export const CREATE_HERO = 'CREATE_HERO'
export const DELETE_HERO = 'DELETE_HERO'
export const UPDATE_HERO = 'UPDATE_HERO'
export const SET_ID_UPDATE_HERO = 'SET_ID_UPDATE_HERO'
export const PARSE_HEROES = 'PARSE_HEROES'
export const HEROES_FETCHING = 'HEROES_FETCHING'
export const HEROES_FETCHED = 'HEROES_FETCHED'
export const HEROES_FETCHING_ERROR = 'HEROES_FETCHING_ERROR'
export const FILTERS_FETCHING = 'FILTERS_FETCHING'
export const FILTERS_FETCHED = 'FILTERS_FETCHED'
export const FILTERS_FETCHING_ERROR = 'FILTERS_FETCHING_ERROR'
export const SET_ACTIVE_FILTER = 'SET_ACTIVE_FILTER'

export const createHero = hero => ({
    type: CREATE_HERO,
    payload: hero
})

export const deleteHero = heroId => ({
    type: DELETE_HERO,
    payload: heroId
})

export const updateHero = hero => ({
    type: UPDATE_HERO,
    payload: hero
})

export const setIdUpdateHero = heroId => ({
    type: SET_ID_UPDATE_HERO,
    payload: heroId
})

export const parseHeroes = () => ({
    type: PARSE_HEROES
})

export const heroesFetching = () => ({
    type: HEROES_FETCHING
})

export const heroesFetched = heroes => ({
    type: HEROES_FETCHED,
    payload: heroes
})

export const heroesFetchingError = () => ({
    type: HEROES_FETCHING_ERROR
})

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