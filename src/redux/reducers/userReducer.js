import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    userData: {}
}

const userReducer = createSlice({
  name: "userReducer",
  initialState,
  reducers: {
    updateUserReducer: (state, action) => {
        state.userData = action.payload
    }
  }
});

export const {updateUserReducer} = userReducer.actions

export default userReducer.reducer
