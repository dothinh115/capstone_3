import { getLocalStorage } from "../function";

const useToken = () => {
  let token = getLocalStorage("loginInfo");
  if(token) {
    return token.email;
  }
  return false;
}

export default useToken