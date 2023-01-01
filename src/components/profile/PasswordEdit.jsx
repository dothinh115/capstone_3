import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updatePasswordApi } from "../../redux/reducers/userReducer";
import MyForm from "../Form/MyForm";
import { Input } from "../Form/MyFormItem";

const PasswordEdit = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((store) => store.userData);
  const defaultValues = {
    password: "",
    passwordConfirm: "",
  };

  const submitHandle = (data) => dispatch(updatePasswordApi(data.password));

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
            <MyForm defaultValues={defaultValues} onSubmit={submitHandle}>
              <Input type="password" item="password" />
              <Input type="password" item="passwordConfirm" />
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
            </MyForm>
          </div>
        </div>
      )}
    </>
  );
};

export default PasswordEdit;
