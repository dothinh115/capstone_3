import axios from "axios";
import { history } from "../App";
import { getToken } from "./function";
import { isExpired } from "react-jwt";
//tạo 1 api mới
export const http = axios.create({
    baseURL: "https://shop.cyberlearn.vn",
    timeout: 30000
});

//cấu hình interceptor cho cấu hình request
http.interceptors.request.use(config => {
    config.headers = {
        ...config.headers,
        "Authorization": `Bearer ${getToken()}`
    }
    return config;
}, err => {
    return Promise.reject(err);
});


// cấu hình interceptor cho cấu hình response
http.interceptors.response.use(res => {
    return res;
}, err => {
    //check Token
    const ifTokenExpired = isExpired(getToken());
    if (ifTokenExpired) {
        localStorage.removeItem("loginInfo");
        window.location.reload();
    }
    if (err.response?.status === 401 || err.response?.status === 403) {
        //chưa đăng nhập
        history.push("/login");
    }
    return Promise.reject(err);
});