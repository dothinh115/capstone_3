import axios from 'axios';
import useToken from './useToken';

const useUpdateUser = () => {
    const token = useToken();
 
    const getUserInfo = async () => {
      if(token) {
        try {
          await axios({
            url: "https://shop.cyberlearn.vn/api/Users/getProfile",
            method: "POST",
            dataType: "application/json",
            headers: {
              "Authorization": `Bearer ${token}`
            }
          });
        } catch (error) {
          localStorage.removeItem("loginInfo");
          window.location.reload(false);
        }
      }
    }

    return getUserInfo;
}

export default useUpdateUser