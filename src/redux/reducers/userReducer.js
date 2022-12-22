import { createSlice } from '@reduxjs/toolkit'
import { http } from '../../util/config';

const initialState = {
  userData: null
}

const userReducer = createSlice({
  name: "userReducer",
  initialState,
  reducers: {
    updateUserReducer: (state, action) => {
      let {payload} = action;
      payload = {
        ...payload,
        ordersHistory: payload.ordersHistory.reverse()
      }
      state.userData = payload;
    }
  }
});

export const { updateUserReducer } = userReducer.actions

export default userReducer.reducer

/****************** async dispatch ******************/
export const getProfileApi = async (dispatch) => {
  try {
    const fetch = await http.post("/api/Users/getProfile");
    const action = updateUserReducer(fetch.data.content);
    dispatch(action);
  } catch (error) {
    console.log(error);
  }
}

