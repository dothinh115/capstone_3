import { createSlice } from '@reduxjs/toolkit'
import { http } from '../../util/config';
import { getLocalStorage } from '../../util/function';
const token = () => {
  let token = getLocalStorage("loginInfo");
  if (token) {
    return token.accessToken;
  }
  return null;
}

const initialState = {
  productData: [],
  productDetail: {},
  productDetailLoading: false,
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
    updateProductDetailLoading: (state, action) => {
      state.productDetailLoading = action.payload;
    },
    updateProductLike: (state, action) => {
      state.ifProductLiked = action.payload;
    },
    updateProductFavorite: (state, action) => {
      if (!token()) return;
      state.productFavorite = action.payload;
    }
  }
});

export const {
  updateProductReducer,
  updateProductDetail,
  updateProductDetailLoading,
  updateProductLike,
  updateProductFavorite
} = productReducer.actions;

export default productReducer.reducer;


/***************** async action *****************/
export const getAllProductApi = async (dispatch) => {
  try {
    const fetch = await http.get("https://shop.cyberlearn.vn/api/Product");
    const action = updateProductReducer(fetch.data.content);
    dispatch(action);
  } catch (error) {
    console.log(error);
  }
}

export const getProductByIdApi = productId => {
  return async (dispatch) => {
    dispatch(updateProductDetailLoading(true));
    try {
      const fetch = await http.get(`https://shop.cyberlearn.vn/api/Product/getbyid?id=${productId}`);
      const action = updateProductDetail(fetch.data.content);
      dispatch(action)
    } catch (error) {
      console.log(error);
    }finally {
      dispatch(updateProductDetailLoading(false));
    }
  }
}

export const setLikeByIdApi = (bool, productId) => {
  return async (dispatch) => {
    try {
      await http.get(`https://shop.cyberlearn.vn/api/Users/${bool ? "" : "un"}like?productId=${productId}`);
      const action = updateProductLike(bool);
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  }
}

export const findIfLikeApi = (productId) => {
  return async (dispatch) => {
    try {
      let res = false;
      const fetch = await http.get("https://shop.cyberlearn.vn/api/Users/getproductfavorite");
      const find = Object.values(fetch.data.content.productsFavorite).find(item => item.id == productId);
      if (find) res = true;
      const action = updateProductLike(res);
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  }
}

export const getProductFavoriteApi = async (dispatch) => {
  try {
    const fetch = await http.get("https://shop.cyberlearn.vn/api/Users/getproductfavorite");
    const action = updateProductFavorite(fetch.data.content.productsFavorite);
    dispatch(action);
  } catch (error) {
    console.log(error);
  }
}