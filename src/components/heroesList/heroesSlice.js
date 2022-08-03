import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { useHttp } from '../../hooks/http.hook'

const initialState = {
    heroesLoadingStatus: 'idle',
    heroes: [],
    updateHeroId: null
}

export const fetchHeroesThunk = createAsyncThunk(
    'heroes/fetchHeroes',
    () => {
        const { request } = useHttp()
        return request('http://localhost:3001/heroes')
    }
)

export const createHeroThunk = createAsyncThunk(
    'heroes/createHero',
    hero => {
        const { request } = useHttp()
        request('http://localhost:3001/heroes', 'POST', hero)
        return { hero }
    }
)

export const deleteHeroThunk = createAsyncThunk(
    'heroes/deleteHero',
    heroId => {
        const { request } = useHttp()
        request(`http://localhost:3001/heroes/${heroId}`, "DELETE")
        return heroId
    }
)

export const updateHeroThunk = createAsyncThunk(
    'heroes/updateHero',
    ({ updateHeroId, hero }) => {
        const { request } = useHttp()
        request(`http://localhost:3001/heroes/${updateHeroId}`, 'PUT', hero)
        return { hero }
    }
)

const heroesSlice = createSlice({
    name: 'heroes',
    initialState,
    reducers: {
        setIdUpdateHero: (state, action) => { state.updateHeroId = action.payload },
    },
    extraReducers: builder => {
        builder
            .addCase(fetchHeroesThunk.pending, state => { state.heroesLoadingStatus = 'loading' })
            .addCase(fetchHeroesThunk.fulfilled, (state, action) => {
                state.heroesLoadingStatus = 'idle'
                state.heroes = action.payload
            })
            .addCase(fetchHeroesThunk.rejected, state => { state.heroesLoadingStatus = 'error' })
            .addCase(createHeroThunk.fulfilled, (state, action) => {
                state.heroes.push(JSON.parse(action.payload.hero))
            })
            .addCase(createHeroThunk.rejected, state => { state.heroesLoadingStatus = 'error' })
            .addCase(deleteHeroThunk.fulfilled, (state, action) => {
                state.heroes = state.heroes.filter(hero => hero.id !== action.payload)
            })
            .addCase(deleteHeroThunk.rejected, state => { state.heroesLoadingStatus = 'error' })
            .addCase(updateHeroThunk.fulfilled, (state, action) => {
                const payload = JSON.parse(action.payload.hero)
                state.heroes = state.heroes.map(hero => {
                    if (hero.id === payload.id) {
                        return payload
                    }
                    return hero
                })
            })
            .addCase(updateHeroThunk.rejected, state => { state.heroesLoadingStatus = 'error' })
            .addDefaultCase(() => { })
    }
})

const { actions, reducer } = heroesSlice

export default reducer
export const { setIdUpdateHero } = actions