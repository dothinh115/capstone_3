import { createSlice } from "@reduxjs/toolkit";
import { history } from "../../App";
import { http, needLoginToDoSth } from "../../util/config";
import { getToken, suffleArray } from "../../util/function";
import { getProfileApi } from "./userReducer";

const initialState = {
  productData: [],
  productDetail: {},
  productDetailLoading: false,
  productFavorite: [],
  productRandomCarousel: [],
};

const productReducer = createSlice({
  name: "productReducer",
  initialState,
  reducers: {
    updateProductReducer: (state, action) => {
      state.productData = action.payload;
    },
    updateProductDetail: (state, action) => {
      state.productDetail = action.payload;
    },
    updateProductDetailLoading: (state, action) => {
      state.productDetailLoading = action.payload;
    },
    updateProductFavorite: (state, action) => {
      state.productFavorite = action.payload;
    },
    updateProductRandomCarousel: (state, action) => {
      state.productRandomCarousel = action.payload;
    },
  },
});

export const {
  updateProductReducer,
  updateProductDetail,
  updateProductDetailLoading,
  updateProductFavorite,
  updateProductRandomCarousel,
} = productReducer.actions;

export default productReducer.reducer;

/***************** async action *****************/
export const getAllProductApi = async (dispatch) => {
  try {
    const fetch = await http.get("https://shop.cyberlearn.vn/api/Product");
    dispatch(updateProductReducer(fetch.data.content));
    dispatch(updateProductRandomCarousel(suffleArray(fetch.data.content, 5)));
  } catch (error) {
    console.log(error);
  }
};

export const getProductByIdApi = (productId) => {
  return async (dispatch) => {
    dispatch(updateProductDetailLoading(true));
    try {
      const fetch = await http.get(
        `https://shop.cyberlearn.vn/api/Product/getbyid?id=${productId}`
      );
      dispatch(updateProductDetail(fetch.data.content));
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(updateProductDetailLoading(false));
    }
  };
};

export const setLikeByIdApi = (bool, productId) => {
  return async (dispatch) => {
    if (!getToken())
      return history.push("/login", {
        needLoginMessage: needLoginToDoSth,
        page: window.location.pathname,
      });
    try {
      await http.get(
        `https://shop.cyberlearn.vn/api/Users/${
          bool ? "" : "un"
        }like?productId=${productId}`
      );
      dispatch(getProductFavoriteApi);
    } catch (error) {
      console.log(error);
    }
  };
};

export const getProductFavoriteApi = async (dispatch) => {
  if (!getToken()) return;
  try {
    const fetch = await http.get(
      "https://shop.cyberlearn.vn/api/Users/getproductfavorite"
    );
    dispatch(updateProductFavorite(fetch.data.content.productsFavorite));
  } catch (error) {
    console.log(error);
  }
};

export const sendDeleteOrderApi = (id) => {
  if (!getToken()) return;
  return async (dispatch) => {
    try {
      await http.post("https://shop.cyberlearn.vn/api/Users/deleteOrder", {
        orderId: id,
      });
      dispatch(getProfileApi);
    } catch (error) {
      console.log(error);
    }
  };
};
