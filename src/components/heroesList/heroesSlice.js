import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    heroesLoadingStatus: 'idle',
    heroes: [],
    updateHeroId: null
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
            const payload = JSON.parse(action.payload)
            state.heroes = state.heroes.map(hero => {
                if (hero.id === payload.id) {
                    return payload
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