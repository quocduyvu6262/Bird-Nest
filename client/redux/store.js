import { configureStore } from '@reduxjs/toolkit';
import dataReducer from './slices/data';

const store = configureStore({
    reducer: {
        data: dataReducer,
    }
});

export default store;