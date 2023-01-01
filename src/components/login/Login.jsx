import React, { useEffect } from "react";
import ReactFacebookLogin from "react-facebook-login";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import useToken from "../../hooks/useToken";
import {
  sendFacebookLoginApi,
  sendLoginApi,
} from "../../redux/reducers/userReducer";
import MyForm from "../Form/MyForm";
import MyFormButton from "../Form/MyFormButton";
import { Input } from "../Form/MyFormItem";

const Login = () => {
  const dispatch = useDispatch();
  const defaultValues = {
    email: "",
    password: "",
  };
  const { state } = useLocation();
  const { setToken } = useToken();
  const windowNavigate = (page) =>
    page ? (window.location.href = page) : window.location.reload();
  const submitHandle = (data) => dispatch(sendLoginApi(data, state?.page));
  const responseFacebook = (response) =>
    dispatch(sendFacebookLoginApi(response.accessToken, state?.page));
  useEffect(() => {
    if (state?.loginRes) {
      setToken(state.loginRes);
      setTimeout(() => {
        windowNavigate(state?.page);
      }, 5000);
    }
  }, [state]);

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
      {(state?.errMess || state?.loginRes) && (
        <div className="main-container" style={{ marginBottom: "20px" }}>
          <div className="page-header">
            <h1>THÔNG BÁO</h1>
          </div>
          <div className="main-body">
            {(state?.errMess && (
              <>
                <i
                  className="fa-solid fa-circle-exclamation"
                  style={{ color: "red" }}
                ></i>
                {state?.errMess}
              </>
            )) ||
              (state?.loginRes && (
                <>
                  <p>
                    <i
                      className="fa-solid fa-check"
                      style={{ color: "green" }}
                    ></i>
                    Đăng nhập thành công, bạn sẽ được chuyển hướng sang trang
                    đang xem trước đó trong vài giây!
                  </p>
                  <div className="footer-hr-span" style={{ marginTop: "20px" }}>
                    <span>Hoặc</span>
                    <div>
                      <button
                        className="btn"
                        onClick={() => windowNavigate(state?.page)}
                      >
                        <i
                          className="fa-solid fa-arrow-right"
                          style={{ color: "blue" }}
                        ></i>{" "}
                        Chuyển hướng ngay
                      </button>
                    </div>
                  </div>
                </>
              ))}
          </div>
        </div>
      )}

      {!state?.loginRes && (
        <>
          <div className="main-container">
            <div className="page-header">
              <h1>ĐĂNG NHẬP</h1>
            </div>
            <div className="main-body login-container">
              <MyForm defaultValues={defaultValues} onSubmit={submitHandle}>
                <Input type="text" item="email" />
                <Input type="password" item="password" placeHolder={false} />
                <MyFormButton
                  btn={[
                    {
                      type: "submit",
                      value: "Đăng nhập",
                    },
                  ]}
                />
              </MyForm>
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
      )}
    </>
  );
};

export default Login;
