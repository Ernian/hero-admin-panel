import { configureStore } from '@reduxjs/toolkit';
import { heroReducer as heroes } from '../reducers/heroReducer';
import { filterReducer as filters } from '../reducers/filterReducer';

const store = configureStore({
    reducer: { heroes, filters },
    middleware: getDefaultMiddleware => getDefaultMiddleware(),
    devTools: process.env.NODE_ENV !== 'production',
})

export default store;