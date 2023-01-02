import { createSlice } from "@reduxjs/toolkit";
import { history } from "../../App";
import { http } from "../../util/config";
import { getToken } from "../../util/function";

const initialState = {
  userData: null,
  messRes: null,
  loading: false,
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
    updateLoadingReducer: (state, action) => {
      state.loading = action.payload;
    },
    updateMessResReducer: (state, action) => {
      state.messRes = action.payload;
    },
  },
});

export const { updateUserReducer, updateLoadingReducer, updateMessResReducer } =
  userReducer.actions;

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
    dispatch(updateLoadingReducer(true));
    try {
      await http.post(
        "https://shop.cyberlearn.vn/api/Users/updateProfile",
        dataValue
      );
      dispatch(getProfileApi);
      history.push("/profile", {
        resMess: "Chỉnh sửa thông tin thành công",
      });
    } catch (error) {
      console.log(error);
      history.push(window.location.pathname, {
        errMess: error.response?.data?.content,
      });
    } finally {
      dispatch(updateLoadingReducer(false));
    }
  };
};

export const updatePasswordApi = (data) => {
  return async (dispatch) => {
    dispatch(updateLoadingReducer(true));
    try {
      await http.post("/api/Users/changePassword", {
        newPassword: data,
      });
      history.push("/profile", {
        resMess: "Đổi mật khẩu thành công!",
      });
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(updateLoadingReducer(false));
    }
  };
};

export const sendRegisterApi = (data) => {
  return async () => {
    try {
      const fetch = await http.post("/api/Users/signup", data);
      history.push(window.location.pathname, {
        resMess: fetch.data?.message,
      });
    } catch (error) {
      console.log(error);
      history.push(window.location.pathname, {
        errMess: error.response?.data?.message,
      });
    }
  };
};

export const sendLoginApi = (data, page) => {
  return async () => {
    try {
      const fetch = await http.post(
        "https://shop.cyberlearn.vn/api/Users/signin",
        data
      );
      history.push(window.location.pathname, {
        loginRes: fetch.data.content,
        ...(page && { page }),
      });
    } catch (error) {
      console.log(error);
      history.push(window.location.pathname, {
        errMess: error.response?.data?.message,
        ...(page && { page }),
      });
    }
  };
};

export const sendFacebookLoginApi = (data, page) => {
  return async () => {
    try {
      const fetch = await http.post("/api/Users/facebooklogin", data);
      history.push(window.location.pathname, {
        loginRes: fetch.data.content,
        ...(page && { page }),
      });
    } catch (error) {
      console.log(error);
      history.push(window.location.pathname, {
        errMess: error.response?.statusText,
        ...(page && { page }),
      });
    }
  };
};
