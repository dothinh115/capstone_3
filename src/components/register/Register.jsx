import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { sendRegisterApi } from "../../redux/reducers/userReducer";
import { dataConfig } from "../../util/config";
import MyForm from "../Form/MyForm";
import { Input, Select } from "../Form/MyFormItem";

const Register = () => {
  const dispatch = useDispatch();
  const { state } = useLocation();
  const defaultValues = {
    email: "",
    password: "",
    name: "",
    gender: true,
    phone: "",
  };

  const submitHandle = (data) => dispatch(sendRegisterApi(data));

  return (
    <>
      <div className="main-container" style={{ marginBottom: "20px" }}>
        <div className="page-header">
          <p>
            <i className="fa-solid fa-arrow-right"></i>
            Nếu đã có tài khoản, vui lòng{" "}
            <Link to="/login" className="alert-link">
              đăng nhập
            </Link>
            !!!
          </p>
        </div>
      </div>
      {(state?.resMess || state?.errMess) && (
        <div className="main-container" style={{ marginBottom: "20px" }}>
          <div className="page-header">
            <h1>THÔNG BÁO</h1>
          </div>
          <div className="main-body">
            <i
              className={`fa-solid fa-${
                (state?.resMess && "check") ||
                (state?.errMess && "circle-exclamation")
              }`}
              style={{
                color: `${
                  (state?.resMess && "green") || (state?.errMess && "red")
                }`,
              }}
            ></i>
            {(state?.resMess && (
              <>
                {state?.resMess} {", "}
                <Link className="alert-link" to="/login">
                  <i className="fa-solid fa-arrow-right"></i>bấm vào đây
                </Link>{" "}
                để đăng nhập!!
              </>
            )) ||
              state?.errMess}
          </div>
        </div>
      )}

      {!state?.resMess && (
        <div className="main-container">
          <div className="page-header">
            <h1>ĐĂNG KÝ TÀI KHOẢN</h1>
          </div>
          <div className="main-body">
            <div className="register-form">
              <MyForm defaultValues={defaultValues} onSubmit={submitHandle}>
                {dataConfig.id.map((item, index) => {
                  if (index === 5) return false;
                  if (index === 3) return <Select key={index} item={item} />;
                  return (
                    <Input
                      key={index}
                      item={item}
                      type={item === "password" ? "password" : ""}
                    />
                  );
                })}
                <div className="item">
                  <div className="item-left"></div>
                  <div className="item-right">
                    <div className="form-button">
                      <button className="btn" type="submit">
                        Đăng ký
                      </button>
                    </div>
                  </div>
                </div>
              </MyForm>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Register;
