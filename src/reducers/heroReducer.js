import {
    CREATE_HERO,
    DELETE_HERO,
    SET_ID_UPDATE_HERO,
    UPDATE_HERO,
    PARSE_HEROES,
    HEROES_FETCHING,
    HEROES_FETCHED,
    HEROES_FETCHING_ERROR
} from '../actions'

const initialState = {
    heroesLoadingStatus: 'idle',
    heroes: [],
    updateHeroId: null
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
        case SET_ID_UPDATE_HERO:
            return {
                ...state,
                updateHeroId: action.payload
            }
        case UPDATE_HERO:
            const payload = JSON.parse(action.payload)
            const updatedHeroes = state.heroes.reduce((heroes, hero) => {
                if (hero.id === payload.id) {
                    heroes = [...heroes, payload]
                } else {
                    heroes = [...heroes, hero]
                }
                return heroes
            }, [])
            return {
                ...state,
                heroes: updatedHeroes
            }
        default:
            return state
    }
}