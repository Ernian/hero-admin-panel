import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    filtersLoadingStatus: 'idle',
    filters: [],
    activeFilter: null
}

const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        filtersFetching: state => { state.filtersLoadingStatus = 'loading' },
        filtersFetched: (state, action) => {
            state.filtersLoadingStatus = 'idle'
            state.filters = action.payload
        },
        filtersFetchingError: state => { state.filtersLoadingStatus = 'error' },
        setActiveFilter: (state, action) => { state.activeFilter = action.payload }
    }
})

const { actions, reducer } = filtersSlice

export default reducer
export const {
    filtersFetching,
    filtersFetched,
    filtersFetchingError,
    setActiveFilter
} = actions