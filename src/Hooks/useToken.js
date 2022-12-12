const useToken = () => {
  const getToken = () => {
    let data = localStorage.getItem("loginInfo");
    if (data) {
      data = JSON.parse(data);
      return data.accessToken;
    }
  }
  return getToken();
}

export default useToken