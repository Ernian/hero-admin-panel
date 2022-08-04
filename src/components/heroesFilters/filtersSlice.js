import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    filtersLoadingStatus: 'idle',
    activeFilter: null,
    filters: [
        {
            "filter": "fire",
            "lable": "Огонь",
            "classNames": "btn btn-danger"
        },
        {
            "filter": "water",
            "lable": "Вода",
            "classNames": "btn btn-primary"
        },
        {
            "filter": "wind",
            "lable": "Ветер",
            "classNames": "btn btn-success"
        },
        {
            "filter": "earth",
            "lable": "Земля",
            "classNames": "btn btn-secondary"
        }
    ]
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