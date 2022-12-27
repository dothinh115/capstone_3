import { useDispatch } from "react-redux";
import { getProfileApi } from "../redux/reducers/userReducer";
import useToken from "./useToken";

const useGetProfile = () => {
    const dispatch = useDispatch();
    const { token } = useToken();
    return () => {
        if (token) dispatch(getProfileApi);
    }
}

export default useGetProfile