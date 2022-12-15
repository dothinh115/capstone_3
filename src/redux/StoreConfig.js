import { configureStore } from '@reduxjs/toolkit';
import { data, orderHistory, cart } from './reducers/dataRecuder';
import { userData } from './reducers/userReducer';

const globalStore = configureStore({
    reducer: {
        data,
        userData,
        cart,
        orderHistory
    }
});

export default globalStore;