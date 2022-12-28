import { useState } from "react";
import { useDispatch } from "react-redux";
import { loadCartData } from "../redux/reducers/cartReducer";
import { getEmail, saveLocalStorage } from "../util/function";
import { getLocalStorage } from "../util/function";

const useCartData = () => {
  const email = getEmail();
  const dispatch = useDispatch();
  const cartKey = `cartData.${email}`;
  const getLocalData = () => {
    const data = getLocalStorage(`cartData.${email}`);
    if (data) return data;
    return null;
  };
  const [localCartData, setLocalCardData] = useState(getLocalData());

  const saveCartData = (data) => {
    if (email) saveLocalStorage(cartKey, data);
  };

  const getCartData = () => {
    const data = getLocalStorage(`cartData.${email}`);
    dispatch(loadCartData(data));
  };

  return {
    localCartData,
    saveCartData,
    getCartData,
  };
};

export default useCartData;
