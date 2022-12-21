import { useDispatch } from "react-redux";
import { getAllProductApi } from "../redux/reducers/productReducer";

const useGetAllProduct = () => {
    const dispatch = useDispatch();
    return () => {
        const getAllProductAction = getAllProductApi;
        dispatch(getAllProductAction);
    }
}

export default useGetAllProduct