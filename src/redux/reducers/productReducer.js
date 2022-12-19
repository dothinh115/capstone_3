import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    productData: []
}

const productReducer = createSlice({
  name: "productReducer",
  initialState,
  reducers: {
    updateProductReducer: (state, action) => {
        state.productData = action.payload;
    }
  }
});

export const {updateProductReducer} = productReducer.actions

export default productReducer.reducer