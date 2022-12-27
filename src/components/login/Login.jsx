import React, { useState } from 'react'
import ReactFacebookLogin from 'react-facebook-login';
import { Link, useLocation } from 'react-router-dom';
import useToken from '../../hooks/useToken';
import { http } from '../../util/config';

const Login = () => {
  const { state } = useLocation();
  const { setToken } = useToken();
  const [loginValue, setLoginValue] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState({
    email: "",
    password: ""
  });
  const [valid, setValid] = useState(false);
  const [result, setResult] = useState("");

  const checkValid = () => {
    for (let key in loginValue) {
      if (loginValue[key] === "" || error[key] !== "") return false;
    }
    return true;
  }

  const inputChangeHandle = e => {
    const { value } = e.target;
    const id = e.target.getAttribute("data-id");
    let errMess = "";
    if (value.trim() === "") errMess = "Không được để trống!";
    else {
      const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (!value.match(reg) && id === "email") errMess = "Email phải đúng định dạng!";
    }

    setLoginValue({
      ...loginValue,
      [id]: value
    });

    setError({
      ...error,
      [id]: errMess
    });
    setValid(checkValid());
  }

  const windowNavigate = page => page ? window.location.href = page : window.location.reload();

  const sendData = async () => {
    try {
      const fetch = await http.post("https://shop.cyberlearn.vn/api/Users/signin", loginValue);
      setToken(fetch.data.content);
    } catch (error) {
      setResult(error.response?.data.message);
    } finally {
      windowNavigate(state?.page);
    }
  }

  const submitHandle = e => {
    e.preventDefault();
    checkValid() && sendData();
  }

  const responseFacebook = async response => {
    try {
      const data = {
        facebookToken: response.accessToken
      }
      const fetch = await http.post("/api/Users/facebooklogin", data);
      setToken(fetch.data.content);
    } catch (error) {
      console.log(error);
    } finally {
      windowNavigate(state?.page);
    }
  }

  return (
    <>
      {state?.needLoginMessage &&
        <div className="main-container" style={{ marginBottom: "20px" }}>
          <div className="page-header">
            <p>
              <i className="fa-solid fa-circle-exclamation" style={{ color: "red" }}></i>
              {state.needLoginMessage}
            </p>
          </div>
        </div>
      }

      <div className="main-container" style={{ marginBottom: "20px" }}>
        <div className="page-header">
          <p>
            <i className="fa-solid fa-arrow-right"></i>
            Nếu chưa có tài khoản, <Link to="/register" className="alert-link">bấm vào đây</Link> để đăng ký!!
          </p>
        </div>
      </div>
      {result && <div className="main-container">
        <div className="page-header">
          <h1>
            THÔNG BÁO
          </h1>
        </div>
        <div className="main-body">
          <p>
            <i className="fa-solid fa-circle-exclamation" style={{ color: "red" }}></i>
            {result}
          </p>
        </div>
      </div>}

      <div className="main-container" style={{ marginTop: result && "20px" }}>
        <div className="page-header">
          <h1>
            ĐĂNG NHẬP
          </h1>
        </div>
        <div className="main-body login-container">
          <form onSubmit={e => submitHandle(e)}>
            <div className="form-main">
              <div className="item">
                <div className="item-left">
                  <i className="fa-solid fa-user"></i>
                  Email
                </div>
                <div className="item-right">
                  <input type="text" data-id="email" onChange={e => inputChangeHandle(e)} className={error.email && "isInvalid"} />
                  {error.email &&
                    <div className="form-error">
                      <i className="fa-solid fa-circle-exclamation" style={{ color: "red" }}></i>
                      {error.email}
                    </div>}
                </div>
              </div>
              <div className="item">
                <div className="item-left">
                  <i className="fa-solid fa-lock"></i>
                  Mật khẩu
                </div>
                <div className="item-right">
                  <input type="password" data-id="password" onChange={e => inputChangeHandle(e)} className={error.password && "isInvalid"} />
                  {error.password && <div className="form-error">{error.password}</div>}
                </div>
              </div>
              <div className="item">
                <div className="item-left">

                </div>
                <div className="item-right">
                  <button className="btn" disabled={valid ? false : true}>
                    Đăng nhập
                  </button>
                </div>
              </div>
            </div>
          </form>
          <div className="footer-hr-span">
            <span>
              Hoặc
            </span>
            <div>
              <ReactFacebookLogin
                appId="3435564930010422"
                autoLoad={false}
                fields="name,email,picture"
                callback={responseFacebook}
                cssClass="my-fb-login-btn btn"
                textButton="Đăng nhập bằng Facebook"
                icon="fa-brands fa-facebook" />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login