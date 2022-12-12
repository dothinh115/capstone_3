const useCurrentUserEmail = () => {
    const getEmail = () => {
        let data = localStorage.getItem("loginInfo");
        if (data) {
            data = JSON.parse(data);
            return data.email;
        }
    }
    return getEmail();
}

export default useCurrentUserEmail