import { createStore, combineReducers } from 'redux';
import { heroReducer } from '../reducers/heroReducer';
import { filterReducer } from '../reducers/filterReducer';

const rootReducer = combineReducers({
    heroes: heroReducer,
    filters: filterReducer,
})

const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;