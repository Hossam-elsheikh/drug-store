import {configureStore} from '@reduxjs/toolkit';
import localCartReducer from './slices/addToCart';

const store = configureStore({
    reducer:{
        localCart:localCartReducer
    }
});

export default store;