import { useDispatch } from "react-redux";
import { getAllProductApi } from "../redux/reducers/productReducer";

const useGetAllProduct = () => {
  const dispatch = useDispatch();
  return () => dispatch(getAllProductApi);
};

export default useGetAllProduct;
