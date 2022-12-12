import axios from 'axios';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { userDataUpdate } from '../redux/actions/userActions';
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
          const action = userDataUpdate(fetch.data.content);
          dispatch(action);
        } catch (error) {
          console.log(error);
          if(error.response.status === 401) {
            localStorage.removeItem("loginInfo");
            window.location.reload(false);
          }
        }
      }
    }

    const getUserInfoCallback = useCallback(() => {
      getUserInfo();
    }, [token])
    
    return getUserInfoCallback;
}

export default useUpdateUser