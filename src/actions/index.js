
const CREATE_HERO = 'CREATE_HERO'
const DELETE_HERO = 'DELETE_HERO'
const HEROES_FETCHING = 'HEROES_FETCHING'
const HEROES_FETCHED = 'HEROES_FETCHED'
const HEROES_FETCHING_ERROR = 'HEROES_FETCHING_ERROR'

export const createHero = hero => ({
    type: CREATE_HERO,
    payload: hero
})
export const deleteHero = heroId => ({
    type: DELETE_HERO,
    payload: heroId
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