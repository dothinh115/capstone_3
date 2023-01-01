import axios from "axios";
import { history } from "../App";
import { getToken } from "./function";
import { isExpired } from "react-jwt";

export const dataConfig = {
  id: ["email", "password", "name", "gender", "phone", "passwordConfirm"],
  name: [
    "Email",
    "Password",
    "Họ tên",
    "Giới tính",
    "Số điện thoại",
    "Xác nhận lại",
  ],
  errorMessage: [
    "Email phải đúng định dạng!",
    "Passworld không hợp lệ!",
    "Tên chỉ được điền chữ!",
    "Giới tính phải được chọn!",
    "Số điện thoại chỉ được điền số!",
    "Mật khẩu nhập lại chưa khớp!",
  ],
  icon: ["envelope", "lock", "file-signature", "venus-mars", "phone", "key"],
  reg: [
    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{0,}$/,
    "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
      "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
      "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$",
    "^([Tt][Rr][Uu][Ee]|[Ff][Aa][Ll][Ss][Ee])$",
    /^[0-9]+$/,
    "",
  ],
  placeHolder: [
    "yourname@example.com",
    "Phải chứa ký tự, số, ký tự in hoa và ký tự đặc biệt!",
    "Chỉ được nhập chữ!",
    "",
    "Chỉ được nhập số!",
    "",
  ],
};

export const needLoginToDoSth = "Bạn cần đăng nhập để sử dụng chức năng này!";
export const needLoginToViewSth = "Bạn cần đăng nhập để truy cập trang này!";
export const loginKey = "loginInfo";

//tạo 1 api mới
export const http = axios.create({
  baseURL: "https://shop.cyberlearn.vn",
  timeout: 30000,
});

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
      localStorage.removeItem(loginKey);
      history.push("/login", {
        needLoginMessage: "Hết phiên đăng nhập, vui lòng đăng nhập lại!",
        page: window.location.pathname,
      });
    }

    if (err.response?.status === 404) {
      //login không thành công
      if (window.location.pathname === "/login ") return Promise.reject(err);
    }

    if (err.response?.status === 400) {
      //register trùng email
      if (window.location.pathname === "/register") return Promise.reject(err);
      //lỗi ko hợp lệ, ví dụ sai id sản phẩm
      history.push("/");
    }
    //lỗi unauthorized
    if (err.response?.status === 401 || err.response?.status === 403) {
      //Chưa hoạt động
      localStorage.removeItem(loginKey);
      window.location.reload();
    }

    if (err.code == "ERR_NETWORK") {
      localStorage.removeItem(loginKey);
      window.location.reload();
    }

    return Promise.reject(err);
  }
);
