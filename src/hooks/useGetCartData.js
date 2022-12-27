import { useDispatch } from "react-redux";
import { loadCartData } from "../redux/reducers/cartReducer";
import { getLocalStorage } from "../util/function";

const useGetCartData = () => {
  const dispatch = useDispatch();
  return (email) => {
    const cartData = getLocalStorage(`cartData.${email}`);
    if (cartData) dispatch(loadCartData(cartData));
  };
};

export default useGetCartData;
