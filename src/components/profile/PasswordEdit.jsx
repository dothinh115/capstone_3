import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import dataConfig from "../../templates/dataConfig";
import { http } from "../../util/config";

const PasswordEdit = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    mode: "all",
    defaultValues: {
      password: "",
      passwordConfirm: "",
    },
  });
  const [loading, setLoading] = useState(false);
  const reg = () => {
    for (let key in dataConfig.id) {
      if (dataConfig.id[key] === "password") return dataConfig.reg[key];
    }
  };

  const placeHolder = () => {
    for (let key in dataConfig.id) {
      if (dataConfig.id[key] === "password") return dataConfig.placeHolder[key];
    }
  };

  const submitHandle = async (data) => {
    setLoading(true);
    const newPass = {
      newPassword: data.password,
    };
    await http.post("/api/Users/changePassword", newPass);
    setLoading(false);
    navigate("/profile", { state: { resMess: "Đổi mật khẩu thành công" } });
  };

  return (
    <>
      {loading ? (
        <div className="loader"></div>
      ) : (
        <div className="main-container" style={{ marginTop: "20px" }}>
          <div className="page-header">
            <h1>Đổi mật khẩu</h1>
          </div>
          <div className="main-body edit-container">
            <form onSubmit={handleSubmit(submitHandle)}>
              <div className="item">
                <div className="item-left">
                  <i className="fa-solid fa-lock"></i>
                  Mật khẩu
                </div>
                <div className="item-right">
                  <input
                    type="password"
                    placeholder={placeHolder()}
                    className={errors.password?.message && "isInvalid"}
                    {...register("password", {
                      required: "Không được để trống!",
                      pattern: {
                        value: reg(),
                        message: "Mật khẩu không đúng định dạng!",
                      },
                    })}
                  />
                  {errors.password?.message && (
                    <div className="form-error">
                      <i
                        className="fa-solid fa-circle-exclamation"
                        style={{ color: "red" }}
                      ></i>
                      {errors.password?.message}
                    </div>
                  )}
                </div>
              </div>
              <div className="item">
                <div className="item-left">
                  <i className="fa-solid fa-key"></i>
                  Xác nhận
                </div>
                <div className="item-right">
                  <input
                    type="password"
                    className={errors.passwordConfirm?.message && "isInvalid"}
                    {...register("passwordConfirm", {
                      required: "Không được để trống!",
                      validate: (value) => {
                        if (watch("password") !== value)
                          return "Nhập lại mật khẩu chưa khớp!";
                      },
                    })}
                  />
                  {errors.passwordConfirm?.message && (
                    <div className="form-error">
                      <i
                        className="fa-solid fa-circle-exclamation"
                        style={{ color: "red" }}
                      ></i>
                      {errors.passwordConfirm?.message}
                    </div>
                  )}
                </div>
              </div>
              <div className="item">
                <div className="item-left"></div>
                <div className="item-right">
                  <div className="form-button">
                    <button type="submit" className="btn">
                      Lưu
                    </button>
                    <button
                      className="btn btn-red"
                      type="button"
                      onClick={() => navigate("/profile")}
                    >
                      Hủy
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default PasswordEdit;
