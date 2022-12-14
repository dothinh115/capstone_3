import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import useToken from '../Hooks/useToken';
import useUpdateUser from '../Hooks/useUpdateUser';

const Login = () => {
  const token = useToken();

  const userUpdateFunc = useUpdateUser();

  const navigate = useNavigate();

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
    if (value.trim() === "") {
      errMess = "Không được để trống!";
    }
    else {
      const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (!value.match(reg) && id === "email") {
        errMess = "Email phải đúng định dạng!";
      }
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

  const setLocalStorage = data => {
    data = JSON.stringify(data);
    localStorage.setItem("loginInfo", data);
  }

  const sendData = async () => {
    try {
      const fetch = await axios({
        url: "https://shop.cyberlearn.vn/api/Users/signin",
        method: "POST",
        dataType: "application/json",
        data: loginValue
      });
      setLocalStorage(fetch.data.content);
      userUpdateFunc();
      window.location.reload(false);
    } catch (err) {
      setResult(err.response.data.message);
    }
  }

  const submitHandle = e => {
    e.preventDefault();
    checkValid() && sendData();
  }

  useEffect(() => {
    token && navigate("/");
  }, []);

  return (
    <>
      <div className="main-container" style={{marginBottom: "20px"}}>
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
                  <input type="text" data-id="email" onChange={e => inputChangeHandle(e)} />
                  {error.email && <div className="form-error">{error.email}</div>}
                </div>
              </div>
              <div className="item">
                <div className="item-left">
                  <i className="fa-solid fa-lock"></i>
                  Mật khẩu
                </div>
                <div className="item-right">
                  <input type="password" data-id="password" onChange={e => inputChangeHandle(e)} />
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
        </div>
      </div>
    </>
  )
}

export default Login