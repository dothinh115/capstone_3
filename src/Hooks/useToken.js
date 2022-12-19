import { getLocalStorage } from "../function";

const useToken = () => {
  let token = getLocalStorage("loginInfo");
  if(token) {
    return token.accessToken;
  }
  return false;
}

export default useToken