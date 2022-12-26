import { useEffect, useState } from "react";
import { getToken } from "../util/function"

const useCheckToken = () => {
  const token = getToken();
  const [loggedIn, setLoggedIn] = useState(true);
  useEffect(() => {
    if(!token) setLoggedIn(false);
  }, [token]);
  return loggedIn;
}

export default useCheckToken