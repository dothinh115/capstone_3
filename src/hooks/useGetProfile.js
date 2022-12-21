import { useDispatch } from "react-redux";
import { getProfileApi } from "../redux/reducers/userReducer";
import { getToken } from "../util/function";

const useGetProfile = () => {
    const dispatch = useDispatch();
    return () => {
        if (getToken()) {
            const getProfileAction = getProfileApi;
            dispatch(getProfileAction);
        }
    }
}

export default useGetProfile