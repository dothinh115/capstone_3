import axios from "axios";
import { history } from "../App";
import { getLocalStorage } from "../function";

const token = () => {
    const token = getLocalStorage("loginInfo");
    if (token) {
        return token.accessToken;
    }
    return null;
}
//tạo 1 api mới
export const http = axios.create({
    baseURL: "https://shop.cyberlearn.vn",
    timeout: 30000
});

//cấu hình interceptor cho cấu hình request
http.interceptors.request.use(config => {
    config.headers = {
        ...config.headers,
        "Authorization": `Bearer ${token()}`
    }
    return config;
}, err => {
    return Promise.reject(err);
});


// cấu hình interceptor cho cấu hình response
http.interceptors.response.use(res => {
    return res;
}, err => {
    //bắt lỗi 400 hoặc 404
    if (err.response?.status === 401 || err.response?.status === 403) {
        //chưa đăng nhập
        localStorage.removeItem("loginInfo");
        history.push("/login");
    }
    return Promise.reject(err);
});