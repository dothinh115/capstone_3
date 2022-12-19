import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    orderData: []
}

const d = new Date();
const today = `${d.getDate()}/${d.getMonth()+1}/${d.getFullYear()}`;

const orderReducer = createSlice({
    name: "orderReducer",
    initialState,
    reducers: {
        updateOrder: (state, action) => {
            let { orderData } = state;
            const { payload } = action;
            if (orderData[orderData.length - 1]?.date !== today) {
                const item = {
                    date: today,
                    orderDetail: payload
                }
                orderData = [
                    ...orderData,
                    item
                ]
            }
            else {
                let newOrderDetail = [...orderData[orderData.length - 1].orderDetail];
                for (let key in payload) {
                    newOrderDetail.push(payload[key]);
                }
                orderData[orderData.length - 1] = {
                    ...orderData[orderData.length - 1],
                    orderDetail: newOrderDetail
                }
            }
            state.orderData = orderData;
        },
        loadOrder: (state, action) => {
            state.orderData = action.payload;
        },
        deleteOrder: (state, action) => {
            state.orderData = state.orderData.filter(item => item.date !== action.payload);
        }
    }
});

export const { updateOrder, loadOrder, deleteOrder } = orderReducer.actions

export default orderReducer.reducer