import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
  productData: [],
  productDetail: {},
  ifProductLiked: false,
  productFavorite: []
}

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
    updateProductLike: (state, action) => {
      state.ifProductLiked = action.payload;
    },
    updateProductFavorite: (state, action) => {
      state.productFavorite = action.payload;
    }
  }
});

export const { updateProductReducer, updateProductDetail, updateProductLike, updateProductFavorite } = productReducer.actions;

export default productReducer.reducer;


/***************** async action *****************/
export const getAllProductApi = async (dispatch) => {
  try {
    const fetch = await axios({
      url: "https://shop.cyberlearn.vn/api/Product",
      method: "GET",
      dataType: "application/json"
    });
    const action = updateProductReducer(fetch.data.content);
    dispatch(action);
  }
  catch (error) {
    console.log(error);
  }
}

export const getProductByIdApi = productId => {
  return async (dispatch) => {
    try {
      const fetch = await axios({
        url: `https://shop.cyberlearn.vn/api/Product/getbyid?id=${productId}`,
        method: "GET",
        dataType: "application/json"
      });
      const action = updateProductDetail(fetch.data.content);
      dispatch(action)
    } catch (error) {
      console.log(error);
    }
  }
}

export const setLikeByIdApi = (bool, token, productId) => {
  return async (dispatch) => {
    try {
      await axios({
        url: `https://shop.cyberlearn.vn/api/Users/${bool ? "" : "un"}like?productId=${productId}`,
        method: "GET",
        dataType: "application/json",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      const action = updateProductLike(bool);
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  }
}

export const findIfLikeApi = (token, productId) => {
  return async (dispatch) => {
    try {
      const fetch = await axios({
        url: "https://shop.cyberlearn.vn/api/Users/getproductfavorite",
        method: "GET",
        dataType: "application/json",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      const find = Object.values(fetch.data.content.productsFavorite).find(item => item.id == productId);
      if(find) {
        const action = updateProductLike(true);
        dispatch(action);
      }
      else {
        const action = updateProductLike(false);
        dispatch(action);
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export const getProductFavoriteApi = (token) => {
  return async (dispatch) => {
    try {
      const fetch = await axios({
        url: "https://shop.cyberlearn.vn/api/Users/getproductfavorite",
        method: "GET",
        dataType: "application/json",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      const action = updateProductFavorite(fetch.data.content.productsFavorite);
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  }
}