import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './reducers/cartReducer';
import productReducer from './reducers/productReducer';
import userReducer from './reducers/userReducer';

const globalStore = configureStore({
    reducer: {
        userData: userReducer,
        cart: cartReducer,
        product: productReducer
    }
});

export default globalStore;