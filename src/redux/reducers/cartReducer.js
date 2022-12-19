import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    cartData: []
}

const cartReducer = createSlice({
    name: "cartReducer",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            let { cartData } = state;
            const { payload } = action;
            const index = cartData.findIndex(item => item.id === payload.id);
            if (index !== -1) {
                cartData[index] = {
                    ...cartData[index],
                    quantity: cartData[index].quantity + payload.quantity
                }
            }
            else {
                cartData = [
                    ...cartData,
                    payload
                ];
            }
            state.cartData = cartData;
        },
        loadCartData: (state, action) => {
            state.cartData = action.payload
        },
        quantityUpdate: (state, action) => {
            let { cartData } = state;
            const { payload } = action;
            const index = cartData.findIndex(item => item.id === payload.id);
            if (index !== -1) cartData[index] = {
                ...cartData[index],
                quantity: cartData[index].quantity + payload.value
            }
            state.cartData = cartData;
        },
        deleteCartItem: (state, action) => {
            const { cartData } = state;
            const { payload } = action;
            state.cartData = cartData.filter(item => item.id !== payload);
        },
        checkItem: (state, action) => {
            let { cartData } = state;
            const { payload } = action;
            const index = cartData.findIndex(item => item.id === payload);
            if (index !== -1) {
                cartData[index] = {
                    ...cartData[index],
                    checked: !cartData[index].checked
                }
            }
            state.cartData = cartData;
        },
        checkAll: (state, action) => {
            let { cartData } = state;
            const { payload } = action;
            for (let key in cartData) {
                cartData[key] = {
                    ...cartData[key],
                    checked: payload
                }
            }
            state.cartData = cartData;
        }
    }
});

export const { addToCart, loadCartData, quantityUpdate, deleteCartItem, checkItem, checkAll } = cartReducer.actions

export default cartReducer.reducer