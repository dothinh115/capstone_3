import { useState } from "react";
import { loginKey } from "../util/config";
import { getLocalStorage, saveLocalStorage } from "../util/function";
const useToken = () => {
  const getToken = () => {
    const token = getLocalStorage(loginKey);
    if (token) return token.accessToken;
    return null;
  };

  const [token, setToken] = useState(getToken());

  const saveToken = (userInfo) => {
    saveLocalStorage(loginKey, userInfo);
    setToken(userInfo.accessToken);
  };

  return { token, setToken: saveToken };
};

export default useToken;
