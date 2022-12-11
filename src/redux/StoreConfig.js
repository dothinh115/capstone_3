import {configureStore} from '@reduxjs/toolkit';
import { data } from './reducers/dataRecuder';
import { user, userData } from './reducers/userReducer';

const globalStore = configureStore({
    reducer: {
        data,
        user,
        userData
    }
});

export default globalStore;