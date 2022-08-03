import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useHttp } from '../../hooks/http.hook'


const initialState = {
    filtersLoadingStatus: 'idle',
    filters: [],
    activeFilter: null
}

export const fetchFiltersThunk = createAsyncThunk(
    'filters/fetchFilters',
    () => {
        const { request } = useHttp()
        return request('http://localhost:3001/filters')
    }
)

const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setActiveFilter: (state, action) => { state.activeFilter = action.payload }
    },
    extraReducers: builder => {
        builder
            .addCase(fetchFiltersThunk.pending, state => { state.filtersLoadingStatus = 'loading' })
            .addCase(fetchFiltersThunk.fulfilled, (state, action) => {
                state.filtersLoadingStatus = 'idle'
                state.filters = action.payload
            })
            .addCase(fetchFiltersThunk.rejected, state => { state.filtersLoadingStatus = 'error' })
    }
})

const { actions, reducer } = filtersSlice

export default reducer
export const { setActiveFilter } = actions