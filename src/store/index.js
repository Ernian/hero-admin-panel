import { createStore, combineReducers } from 'redux';
import { heroReducer } from '../reducers/heroReducer';

const rootReducer = combineReducers({
    heroes: heroReducer,
})

const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;