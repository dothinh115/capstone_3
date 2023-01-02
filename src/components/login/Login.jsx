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
import MainBlock from "../others/MainBlock";

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
        <MainBlock
          value={state.needLoginMessage}
          iconStyle="circle-exclamation"
          iconColor="red"
        />
      )}

      <MainBlock
        value={[
          "Nếu chưa có tài khoản, ",
          <Link key={"letReg"} to="/register" className="alert-link">
            bấm vào đây
          </Link>,
          " để đăng ký!!",
        ]}
        iconStyle="arrow-right"
      />
      {(state?.errMess || state?.loginRes) && (
        <MainBlock
          value={
            state?.errMess
              ? state?.errMess
              : "Đăng nhập thành công, bạn sẽ được chuyển hướng sang trang đang xem trước đó trong vài giây!"
          }
          iconStyle={state?.errMess ? "circle-exclamation" : "check"}
          iconColor={state.errMess ? "red" : "green"}
          hrFooterValue={
            state?.loginRes && (
              <>
                <button
                  className="btn"
                  onClick={() => windowNavigate(state?.page)}
                >
                  <i
                    className="fa-solid fa-arrow-right"
                    style={{ color: "blue" }}
                  ></i>{" "}
                  Chuyển hướng ngay!
                </button>
              </>
            )
          }
        />
      )}

      {!state?.loginRes && (
        <MainBlock
          value={
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
          }
          headerValue="ĐĂNG NHẬP"
          hrFooterValue={
            <ReactFacebookLogin
              appId="3435564930010422"
              autoLoad={false}
              fields="name,email,picture"
              callback={responseFacebook}
              cssClass="my-fb-login-btn btn"
              textButton="Đăng nhập bằng Facebook"
              icon="fa-brands fa-facebook"
            />
          }
          otherClass="login-container"
        />
      )}
    </>
  );
};

export default Login;
