const CREATE_HERO = 'CREATE_HERO'
const DELETE_HERO = 'DELETE_HERO'
const PARSE_HEROES = 'PARSE_HEROES'
const HEROES_FETCHING = 'HEROES_FETCHING'
const HEROES_FETCHED = 'HEROES_FETCHED'
const HEROES_FETCHING_ERROR = 'HEROES_FETCHING_ERROR'

const initialState = {
    heroesLoadingStatus: 'idle',
    heroes: [],
}

export const heroReducer = (state = initialState, action) => {
    switch (action.type) {
        case HEROES_FETCHING:
            return {
                ...state,
                heroesLoadingStatus: 'loading'
            }
        case HEROES_FETCHED:
            return {
                ...state,
                heroes: action.payload,
                heroesLoadingStatus: 'idle'
            }
        case HEROES_FETCHING_ERROR:
            return {
                ...state,
                heroesLoadingStatus: 'error'
            }
        case PARSE_HEROES:
            return {
                ...state,
                heroes: state.heroes.map(hero => {
                    if (typeof hero === 'string') return JSON.parse(hero)
                    return hero
                })
            }
        case CREATE_HERO:
            return {
                ...state,
                heroes: [...state.heroes, action.payload]
            }
        case DELETE_HERO:
            return {
                ...state,
                heroes: state.heroes.filter(hero => hero.id !== action.payload)
            }
        default:
            return state
    }
}