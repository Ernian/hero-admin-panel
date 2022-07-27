const CREATE_HERO = 'CREATE_HERO'
const DELETE_HERO = 'DELETE_HERO'
const PARSE_HEROES = 'PARSE_HEROES'
const HEROES_FETCHING = 'HEROES_FETCHING'
const HEROES_FETCHED = 'HEROES_FETCHED'
const HEROES_FETCHING_ERROR = 'HEROES_FETCHING_ERROR'
const FILTERS_FETCHING = 'FILTERS_FETCHING'
const FILTERS_FETCHED = 'FILTERS_FETCHED'
const FILTERS_FETCHING_ERROR = 'FILTERS_FETCHING_ERROR'

export const createHero = hero => ({
    type: CREATE_HERO,
    payload: hero
})
export const deleteHero = heroId => ({
    type: DELETE_HERO,
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