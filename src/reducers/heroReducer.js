
const CREATE_HERO = 'CREATE_HERO'
const DELETE_HERO = 'DELETE_HERO'
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
        case CREATE_HERO:
            return state
        case DELETE_HERO:
            return {
                ...state,
                heroes: state.heroes.filter(hero => hero.id !== action.payload)
            }
        default:
            return state
    }
}