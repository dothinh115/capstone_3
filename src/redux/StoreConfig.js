import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './reducers/cartReducer';
import orderReducer from './reducers/orderReducer';
import productReducer from './reducers/productReducer';
import userReducer from './reducers/userReducer';

const globalStore = configureStore({
    reducer: {
        userData: userReducer,
        cart: cartReducer,
        orderHistory: orderReducer,
        product: productReducer
    }
});

export default globalStore;