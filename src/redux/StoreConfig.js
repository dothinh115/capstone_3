import {configureStore} from '@reduxjs/toolkit';
import { data } from './reducers/dataRecuder';
import { userData } from './reducers/userReducer';
import { cart } from './reducers/dataRecuder';

const globalStore = configureStore({
    reducer: {
        data,
        userData,
        cart
    }
});

export default globalStore;