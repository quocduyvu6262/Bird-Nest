import { configureStore } from '@reduxjs/toolkit';
// import reducers
import dataReducer from './slices/data';


export const store = configureStore({
    reducer: {
        data: dataReducer,
    },
});

