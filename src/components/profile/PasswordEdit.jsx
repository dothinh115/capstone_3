import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import dataConfig from "../../templates/dataConfig";
import { http } from "../../util/config";

const PasswordEdit = () => {
  const navigate = useNavigate();

  const [value, setValue] = useState({
    password: "",
    passwordConfirm: "",
  });

  const [error, setError] = useState({
    password: "",
    passwordConfirm: "",
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

  const passwordChangeHandle = ({ target }) => {
    const id = target.getAttribute("data-id");
    let messageError = "";
    if (target.value === "") {
      messageError = "Không được để trống!";
    } else {
      if (id === "password" && !target.value.match(reg()))
        messageError = "Mật khẩu không đúng định dạng!";
      if (id === "passwordConfirm" && target.value !== value.password)
        messageError = "Mật khẩu chưa khớp";
    }
    setError({
      ...error,
      [id]: messageError,
    });

    setValue({
      ...value,
      [id]: target.value,
    });
  };

  const checkValid = () => {
    let result = true;
    if (value.password === "" || value.passwordConfirm === "") result = false;
    if (error.password !== "" || error.passwordConfirm !== "") result = false;
    return result;
  };

  const submitHandle = (e) => {
    e.preventDefault();
    sendData();
  };

  const sendData = async () => {
    if (!checkValid) return;
    setLoading(true);
    const data = {
      newPassword: value.password,
    };
    await http.post("/api/Users/changePassword", data);
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
            <form onSubmit={(e) => submitHandle(e)}>
              <div className="item">
                <div className="item-left">
                  <i className="fa-solid fa-lock"></i>
                  Mật khẩu
                </div>
                <div className="item-right">
                  <input
                    type="password"
                    placeholder={placeHolder()}
                    onChange={(e) => passwordChangeHandle(e)}
                    onBlur={(e) => passwordChangeHandle(e)}
                    data-id="password"
                  />
                  {error.password && (
                    <div className="form-error">
                      <i
                        className="fa-solid fa-circle-exclamation"
                        style={{ color: "red" }}
                      ></i>
                      {error.password}
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
                    data-id="passwordConfirm"
                    onChange={(e) => passwordChangeHandle(e)}
                    onBlur={(e) => passwordChangeHandle(e)}
                  />
                  {error.passwordConfirm && (
                    <div className="form-error">
                      <i
                        className="fa-solid fa-circle-exclamation"
                        style={{ color: "red" }}
                      ></i>
                      {error.passwordConfirm}
                    </div>
                  )}
                </div>
              </div>
              <div className="item">
                <div className="item-left"></div>
                <div className="item-right">
                  <div className="form-button">
                    <button
                      className="btn"
                      disabled={checkValid() ? false : true}
                    >
                      Lưu
                    </button>
                    <button
                      className="btn btn-red"
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
