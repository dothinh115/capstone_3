import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { userDataUpdate } from "../redux/actions/userActions";
import useToken from "./useToken";

const useCheckLogin = () => {
    const token = useToken();
    const dispatch = useDispatch();
    const checkLogin = () => {
      if(!token) {
        const action = userDataUpdate({});
        dispatch(action);
      }
    }
    const checkLoginCallback = useCallback(() => {
      checkLogin();
    }, [token]);
    
  return checkLoginCallback;
}

export default useCheckLogin