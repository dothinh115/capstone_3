import axios from "axios";
import { history } from "../App";
import { getToken } from "./function";
import { isExpired } from "react-jwt";
//tạo 1 api mới
export const http = axios.create({
  baseURL: "https://shop.cyberlearn.vn",
  timeout: 30000,
});

export const needLoginToDoSth = "Bạn cần đăng nhập để sử dụng chức năng này!";
export const needLoginToViewSth = "Bạn cần đăng nhập để sử dụng trang này!";

//cấu hình interceptor cho cấu hình request
http.interceptors.request.use(
  (config) => {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${getToken()}`,
    };
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

// cấu hình interceptor cho cấu hình response
http.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    //check Token
    const ifTokenExpired = isExpired(getToken());
    if (getToken() && ifTokenExpired) {
      localStorage.removeItem("loginInfo");
      history.push("/login", {
        needLoginMessage: "Hết phiên đăng nhập, vui lòng đăng nhập lại!",
        page: window.location.pathname,
      });
    } else if (err.response?.status === 400) {
      if (
        window.location.pathname === "/register" ||
        window.location.pathname === "/login"
      ) {
        //nếu lỗi ở /login và /register
        return Promise.reject(err);
      }
      //lỗi ko hợp lệ, ví dụ: sai id sản phẩm
      history.push("/");
    }
    //lỗi unauthorized
    else if (err.response?.status === 401 || err.response?.status === 403) {
      //Chưa hoạt động
      localStorage.removeItem("loginInfo");
      window.location.reload();
    } else {
      localStorage.removeItem("loginInfo");
      window.location.reload();
    }
    return Promise.reject(err);
  }
);
