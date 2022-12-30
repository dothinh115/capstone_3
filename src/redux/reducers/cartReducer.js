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
      history.push("/cart", { justAddId: payload.id });
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
  },
});

export const { addToCart, deleteCartItem, checkItem, checkAll } =
  cartReducer.actions;

export default cartReducer.reducer;

/************ async action **********/
export const sendOrderApi = (data) => {
  return async (dispatch) => {
    try {
      await http.post("https://shop.cyberlearn.vn/api/Users/order", data);
      await dispatch(getProfileApi);
    } catch (error) {
      console.log(error);
    }
  };
};
