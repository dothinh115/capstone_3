const useToken = () => {
  let token = localStorage.getItem("loginInfo");
  if (token) {
    token = JSON.parse(token);
    return token.accessToken;
  }
  return false;
}

export default useToken