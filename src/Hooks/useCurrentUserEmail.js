import { getLocalStorage } from "../function";

const useCurrentUserEmail = () => {
  let token = getLocalStorage("loginInfo");
  if(token) {
    return token.email;
  }
  return false;
}

export default useCurrentUserEmail