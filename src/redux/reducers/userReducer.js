import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

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

/****************** async dispatch ******************/
export const getProfileApi = token => {
  return async (dispatch) => {
    try {
      const fetch = await axios({
        url: "https://shop.cyberlearn.vn/api/Users/getProfile",
        method: "POST",
        dataType: "application/json",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      const action = updateUserReducer(fetch.data.content);
      dispatch(action);
    } catch (error) {
      localStorage.removeItem("loginInfo");
      window.location.reload();
    }
  }
}
