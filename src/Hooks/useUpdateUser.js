import axios from 'axios';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { updateUserReducer } from '../redux/reducers/userReducer';
import useToken from './useToken';

const useUpdateUser = () => {
    const token = useToken();
    const dispatch = useDispatch();
    const getUserInfo = async () => {
      if(token) {
        try {
          const fetch = await axios({
            url: "https://shop.cyberlearn.vn/api/Users/getProfile",
            method: "POST",
            dataType: "application/json",
            headers: {
              "Authorization": `Bearer ${token}`
            }
          });
          const action = updateUserReducer(fetch.data.content);
          dispatch(action);
        } catch (error) {
          localStorage.removeItem("loginInfo");
          window.location.reload(false);
        }
      }
    }

    const getUserInfoCallback = useCallback(() => {
      getUserInfo();
    }, [token])
    
    return getUserInfoCallback;
}

export default useUpdateUser