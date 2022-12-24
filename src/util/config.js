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
    if(getToken() && ifTokenExpired) {
        localStorage.removeItem("loginInfo");
        window.location.reload();
        console.log(ifTokenExpired);
    }
    if (err.response?.status === 400) {
        if (window.location.pathname === "/register" || window.location.pathname === "/login") {
            //nếu lỗi ở /login và /register
            return Promise.reject(err);
        }
        //lỗi ko hợp lệ, ví dụ: sai id sản phẩm
        history.push("/");
    }
    //lỗi unauthorized
    if (err.response?.status === 401 || err.response?.status === 403) {
        // history.push("/login");
        localStorage.removeItem("loginInfo");
        window.location.reload();
    }
    return Promise.reject(err);
});