import { useState } from "react";
import { getLocalStorage, saveLocalStorage } from "../util/function";
const useToken = () => {
  const getToken = () => {
    const token = getLocalStorage("loginInfo");
    if (token) return token.accessToken;
    return null;
  };

  const [token, setToken] = useState(getToken());

  const saveToken = (userInfo) => {
    saveLocalStorage("loginInfo", userInfo);
    setToken(userInfo.accessToken);
  };

  return { token, setToken: saveToken };
};

export default useToken;
