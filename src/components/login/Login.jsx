import React, { useState } from "react";
import ReactFacebookLogin from "react-facebook-login";
import { useForm } from "react-hook-form";
import { Link, useLocation } from "react-router-dom";
import useToken from "../../hooks/useToken";
import dataConfig from "../../templates/dataConfig";
import { http } from "../../util/config";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { state } = useLocation();
  const { setToken } = useToken();

  const reg = () => {
    for (let key in dataConfig.id) {
      if (dataConfig.id[key] === "email") return dataConfig.reg[key];
    }
  };

  const placeHolder = () => {
    for (let key in dataConfig.id) {
      if (dataConfig.id[key] === "email") return dataConfig.placeHolder[key];
    }
  };

  const [result, setResult] = useState("");

  const windowNavigate = (page) =>
    page ? (window.location.href = page) : window.location.reload();

  const submitHandle = async (data) => {
    console.log(data);
    try {
      const fetch = await http.post(
        "https://shop.cyberlearn.vn/api/Users/signin",
        data
      );
      setToken(fetch.data.content);
      windowNavigate(state?.page);
    } catch (error) {
      setResult(error.response?.data.message);
    }
  };

  const responseFacebook = async (response) => {
    try {
      const data = {
        facebookToken: response.accessToken,
      };
      const fetch = await http.post("/api/Users/facebooklogin", data);
      setToken(fetch.data.content);
      windowNavigate(state?.page);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {state?.needLoginMessage && (
        <div className="main-container" style={{ marginBottom: "20px" }}>
          <div className="page-header">
            <p>
              <i
                className="fa-solid fa-circle-exclamation"
                style={{ color: "red" }}
              ></i>
              {state.needLoginMessage}
            </p>
          </div>
        </div>
      )}

      <div className="main-container" style={{ marginBottom: "20px" }}>
        <div className="page-header">
          <p>
            <i className="fa-solid fa-arrow-right"></i>
            Nếu chưa có tài khoản,{" "}
            <Link to="/register" className="alert-link">
              bấm vào đây
            </Link>{" "}
            để đăng ký!!
          </p>
        </div>
      </div>
      {result && (
        <div className="main-container">
          <div className="page-header">
            <h1>THÔNG BÁO</h1>
          </div>
          <div className="main-body">
            <p>
              <i
                className="fa-solid fa-circle-exclamation"
                style={{ color: "red" }}
              ></i>
              {result}
            </p>
          </div>
        </div>
      )}

      <div className="main-container" style={{ marginTop: result && "20px" }}>
        <div className="page-header">
          <h1>ĐĂNG NHẬP</h1>
        </div>
        <div className="main-body login-container">
          <form onSubmit={handleSubmit(submitHandle)}>
            <div className="form-main">
              <div className="item">
                <div className="item-left">
                  <i className="fa-solid fa-user"></i>
                  Email
                </div>
                <div className="item-right">
                  <input
                    type="text"
                    data-id="email"
                    placeholder={placeHolder()}
                    className={errors.email?.message && "isInvalid"}
                    {...register("email", {
                      required: "Không được để trống!",
                      pattern: {
                        value: reg(),
                        message: "Email phải đúng định dạng!",
                      },
                    })}
                  />
                  {errors.email?.message && (
                    <div className="form-error">
                      <i
                        className="fa-solid fa-circle-exclamation"
                        style={{ color: "red" }}
                      ></i>
                      {errors.email?.message}
                    </div>
                  )}
                </div>
              </div>
              <div className="item">
                <div className="item-left">
                  <i className="fa-solid fa-lock"></i>
                  Mật khẩu
                </div>
                <div className="item-right">
                  <input type="password" {...register("password")} />
                </div>
              </div>
              <div className="item">
                <div className="item-left"></div>
                <div className="item-right">
                  <button className="btn">Đăng nhập</button>
                </div>
              </div>
            </div>
          </form>
          <div className="footer-hr-span">
            <span>Hoặc</span>
            <div>
              <ReactFacebookLogin
                appId="3435564930010422"
                autoLoad={false}
                fields="name,email,picture"
                callback={responseFacebook}
                cssClass="my-fb-login-btn btn"
                textButton="Đăng nhập bằng Facebook"
                icon="fa-brands fa-facebook"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
