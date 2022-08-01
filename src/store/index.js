import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { heroReducer } from '../reducers/heroReducer';
import { filterReducer } from '../reducers/filterReducer';

const rootReducer = combineReducers({
    heroes: heroReducer,
    filters: filterReducer,
})

const store = createStore(
    rootReducer,
    compose(applyMiddleware(ReduxThunk),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
);

export default store;