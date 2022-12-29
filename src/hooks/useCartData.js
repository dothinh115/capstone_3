import { useState } from "react";
import { getEmail, saveLocalStorage } from "../util/function";
import { getLocalStorage } from "../util/function";

const useCartData = () => {
  const email = getEmail();
  const cartKey = `cartData.${email}`;
  const getLocalData = () => {
    const data = getLocalStorage(cartKey);
    if (data) return data;
    return null;
  };
  const [localCartData, setLocalCardData] = useState(getLocalData());

  const saveCartData = (data) => {
    if (email) saveLocalStorage(cartKey, data);
    setLocalCardData(data);
  };

  return {
    localCartData,
    saveCartData,
  };
};

export default useCartData;
