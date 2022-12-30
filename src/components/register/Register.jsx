import React, { useState } from "react";
import { Link } from "react-router-dom";
import dataConfig from "../../templates/dataConfig";
import { http } from "../../util/config";
import { useForm } from "react-hook-form";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
    defaultValues: {
      email: "",
      password: "",
      name: "",
      gender: true,
      phone: "",
    },
  });

  const [result, setResult] = useState({
    result: "",
    message: "",
  });

  const submitHandle = async (data) => {
    try {
      const fetch = await http.post("/api/Users/signup", data);
      setResult({
        result: true,
        message: fetch.data?.message,
      });
    } catch (error) {
      setResult({
        result: false,
        message: error.response?.data?.message,
      });
    }
  };

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
      {result.message && (
        <div className="main-container">
          <div className="page-header">
            <h1>THÔNG BÁO</h1>
          </div>
          <div className="main-body">
            {result.result ? (
              <>
                <i className="fa-solid fa-check" style={{ color: "green" }}></i>
                Đăng ký thành công,
                <Link className="alert-link" to="/login">
                  <i className="fa-solid fa-arrow-right"></i>bấm vào đây
                </Link>
                để đăng nhập!!
              </>
            ) : (
              <>
                <i
                  className="fa-solid fa-circle-exclamation"
                  style={{ color: "red" }}
                ></i>
                {result.message}
              </>
            )}
          </div>
        </div>
      )}

      {!result.result && (
        <div
          className="main-container"
          style={{ marginTop: result.message && "20px" }}
        >
          <div className="page-header">
            <h1>ĐĂNG KÝ TÀI KHOẢN</h1>
          </div>
          <div className="main-body">
            <div className="register-form">
              <form onSubmit={handleSubmit(submitHandle)}>
                <div className="register-form-main">
                  {dataConfig.id.map((item, index) => {
                    return (
                      <div key={index} className="item">
                        <div className="item-left">
                          {
                            <i
                              className={`fa-solid fa-${dataConfig.icon[index]}`}
                            ></i>
                          }
                          {dataConfig.name[index]}
                        </div>
                        <div className="item-right">
                          {item === "gender" ? (
                            <select {...register(item)}>
                              <option value="true">Nam</option>
                              <option value="false">Nữ</option>
                            </select>
                          ) : (
                            <input
                              type={item === "password" ? "password" : "text"}
                              className={errors[item]?.message && "isInvalid"}
                              placeholder={dataConfig.placeHolder[index]}
                              {...register(item, {
                                required: "Không được để trống!",
                                pattern: {
                                  value: dataConfig.reg[index],
                                  message: dataConfig.errorMessage[index],
                                },
                              })}
                            />
                          )}
                          {errors[item]?.message && (
                            <div className="form-error">
                              <i
                                className="fa-solid fa-circle-exclamation"
                                style={{ color: "red" }}
                              ></i>
                              {errors[item]?.message}
                            </div>
                          )}
                        </div>
                      </div>
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
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Register;
