import { useDispatch } from "react-redux";
import { loadCartData } from "../redux/reducers/cartReducer";
import { getLocalStorage } from "../util/function";

const useGetCartData = () => {
    const dispatch = useDispatch();
    return (email) => {
        const cartData = getLocalStorage(`cartData.${email}`);
        if (cartData) {
            const loadCartDataAction = loadCartData(cartData);
            dispatch(loadCartDataAction);
        }
    }
}

export default useGetCartData