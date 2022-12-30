import { createSlice } from "@reduxjs/toolkit";
import { http } from "../../util/config";
import { getToken } from "../../util/function";

const initialState = {
  userData: null,
};

const userReducer = createSlice({
  name: "userReducer",
  initialState,
  reducers: {
    updateUserReducer: (state, action) => {
      let { payload } = action;
      payload = {
        ...payload,
        ordersHistory: payload.ordersHistory.reverse(),
      };
      state.userData = payload;
    },
  },
});

export const { updateUserReducer } = userReducer.actions;

export default userReducer.reducer;

/****************** async dispatch ******************/
export const getProfileApi = async (dispatch) => {
  if (!getToken()) return;
  try {
    const fetch = await http.post("/api/Users/getProfile");
    dispatch(updateUserReducer(fetch.data.content));
  } catch (error) {
    console.log(error);
  }
};

export const updateProfileApi = (dataValue) => {
  return async (dispatch) => {
    try {
      await http.post(
        "https://shop.cyberlearn.vn/api/Users/updateProfile",
        dataValue
      );
      dispatch(getProfileApi);
    } catch (error) {
      console.log(error);
    }
  };
};
