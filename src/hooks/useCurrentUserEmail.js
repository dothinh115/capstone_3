import { getLocalStorage } from "../util/function";

const useCurrentUserEmail = () => {
  let email = getLocalStorage("loginInfo");
  if (email) {
    return { email } = email;
  }
  return false;
}

export default useCurrentUserEmail