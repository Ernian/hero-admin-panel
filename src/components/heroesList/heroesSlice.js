import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    heroesLoadingStatus: 'idle',
    updateHeroId: null,
    heroes: [
        {
            "id": 1,
            "name": "Первый герой",
            "description": "Первый герой в рейтинге!!",
            "element": "fire"
        },
        {
            "id": 2,
            "name": "Неизвестный герой",
            "description": "Скрывающийся в тени",
            "element": "wind"
        },
        {
            "id": 3,
            "name": "Морской герой",
            "description": "Как аквамен, но не из DC",
            "element": "water"
        },
        {
            "id": "63e4ef3e-afad-4a1c-9753-10d3eaef065d",
            "name": "fireMan",
            "description": "wowowoooooo",
            "element": "fire"
        }
    ]
}

const heroesSlice = createSlice({
    name: 'heroes',
    initialState,
    reducers: {
        heroesFetching: state => { state.heroesLoadingStatus = 'loading' },
        heroesFetched: (state, action) => {
            state.heroesLoadingStatus = 'idle'
            state.heroes = action.payload
        },
        heroesFetchingError: state => { state.heroesLoadingStatus = 'error' },
        createHero: (state, action) => { state.heroes.push(action.payload) },
        deleteHero: (state, action) => {
            state.heroes = state.heroes.filter(hero => hero.id !== action.payload)
        },
        updateHero: (state, action) => {
            state.heroes = state.heroes.map(hero => {
                if (hero.id === action.payload.id) {
                    return action.payload
                }
                return hero
            })
        },
        setIdUpdateHero: (state, action) => { state.updateHeroId = action.payload },
        parseHeroes: state => {
            state.heroes = state.heroes.map(hero => {
                if (typeof hero === 'string') return JSON.parse(hero)
                return hero
            })
        },
    }
})

const { actions, reducer } = heroesSlice

export default reducer
export const {
    heroesFetching,
    heroesFetched,
    heroesFetchingError,
    createHero,
    deleteHero,
    updateHero,
    setIdUpdateHero,
    parseHeroes
} = actions