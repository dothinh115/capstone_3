import { useDispatch } from "react-redux";
import { getProfileApi } from "../redux/reducers/userReducer";
import { getToken } from "../util/function";

const useGetProfile = () => {
    const dispatch = useDispatch();
    return () => {
        if (getToken()) dispatch(getProfileApi);
    }
}

export default useGetProfile