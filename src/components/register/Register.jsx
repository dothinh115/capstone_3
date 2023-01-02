import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { sendRegisterApi } from "../../redux/reducers/userReducer";
import { dataConfig } from "../../util/config";
import MyForm from "../Form/MyForm";
import { Input, Select } from "../Form/MyFormItem";
import MyFormButton from "../Form/MyFormButton";
import TopMessages from "../others/TopMessages";

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
      <TopMessages
        value={[
          "Nếu đã có tài khoản, vui lòng ",
          <Link key={"letLogin"} to="/login" className="alert-link">
            đăng nhập
          </Link>,
          " !!!",
        ]}
        iconStyle="arrow-right"
      />

      {(state?.resMess || state?.errMess) && (
        <TopMessages
          value={
            state?.resMess
              ? [
                  state?.resMess,
                  " ",
                  <Link key={"regRes"} className="alert-link" to="/login">
                    <i className="fa-solid fa-arrow-right"></i>bấm vào đây
                  </Link>,
                  " để đăng nhập!!!",
                ]
              : state.errMess
          }
          iconStyle={state?.resMess ? "check" : "circle-exclamation"}
          iconColor={state?.resMess ? "green" : "red"}
          header={true}
        />
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
                      type={
                        item === "password"
                          ? "password"
                          : "" || item === "phone"
                          ? "number"
                          : ""
                      }
                    />
                  );
                })}
                <MyFormButton btn={[{ type: "submit", value: "Đăng ký" }]} />
              </MyForm>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Register;
