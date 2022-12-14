import { createSlice } from "@reduxjs/toolkit";
import { history } from "../../App";
import { http, needLoginToDoSth } from "../../util/config";
import { getEmail, getLocalStorage, getToken } from "../../util/function";
import { getProfileApi } from "./userReducer";
const getCartData = () => {
  const data = getLocalStorage(`cartData.${getEmail()}`);
  if (data) return data;
  return [];
};

const initialState = {
  cartData: getCartData(),
  loading: false,
};

const cartReducer = createSlice({
  name: "cartReducer",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      if (!getToken())
        return history.push("/login", {
          needLoginMessage: needLoginToDoSth,
          page: window.location.pathname,
        });
      let { cartData } = state;
      let { payload } = action;
      const index = cartData.findIndex((item) => item.id === payload.id);
      if (index !== -1) {
        cartData[index] = {
          ...cartData[index],
          quantity: cartData[index].quantity + payload.quantity,
        };
      } else {
        payload = {
          ...payload,
          checked: false,
        };
        cartData = [...cartData, payload];
      }
      state.cartData = cartData;
      history.push(window.location.pathname, { success: true });
    },
    deleteCartItem: (state, action) => {
      const { cartData } = state;
      const { payload } = action;
      state.cartData = cartData.filter((item) => item.id !== payload);
    },
    checkItem: (state, action) => {
      let { cartData } = state;
      const { payload } = action;
      const index = cartData.findIndex((item) => item.id === payload);
      if (index !== -1) {
        cartData[index] = {
          ...cartData[index],
          checked: !cartData[index].checked,
        };
      }
      state.cartData = cartData;
    },
    checkAll: (state, action) => {
      let { cartData } = state;
      const { payload } = action;
      for (let key in cartData) {
        cartData[key] = {
          ...cartData[key],
          checked: payload,
        };
      }
      state.cartData = cartData;
    },
    setLoadingReducer: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const {
  addToCart,
  deleteCartItem,
  checkItem,
  checkAll,
  setLoadingReducer,
} = cartReducer.actions;

export default cartReducer.reducer;

/************ async action **********/
export const sendOrderApi = (data) => {
  return async (dispatch) => {
    dispatch(setLoadingReducer(true));
    try {
      await http.post("https://shop.cyberlearn.vn/api/Users/order", data);
      await dispatch(getProfileApi);
      await dispatch(setLoadingReducer(false));
    } catch (error) {
      console.log(error);
    }
  };
};
