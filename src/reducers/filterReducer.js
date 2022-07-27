const FILTERS_FETCHING = 'FILTERS_FETCHING'
const FILTERS_FETCHED = 'FILTERS_FETCHED'
const FILTERS_FETCHING_ERROR = 'FILTERS_FETCHING_ERROR'

const initialState = {
    filtersLoadingStatus: 'idle',
    filters: [],
}

export const filterReducer = (state = initialState, action) => {
    switch (action.type) {
        case FILTERS_FETCHING:
            return {
                ...state,
                filtersLoadingStatus: 'loading'
            }
        case FILTERS_FETCHED:
            return {
                ...state,
                filters: action.payload,
                filtersLoadingStatus: 'idle'
            }
        case FILTERS_FETCHING_ERROR:
            return {
                ...state,
                filtersLoadingStatus: 'error'
            }
        default:
            return state
    }
}