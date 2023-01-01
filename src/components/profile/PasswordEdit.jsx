import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updatePasswordApi } from "../../redux/reducers/userReducer";
import MyForm from "../Form/MyForm";
import MyFormButton from "../Form/MyFormButton";
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
              <MyFormButton
                btn={[
                  { type: "submit", value: "Lưu" },
                  {
                    type: "button",
                    className: "btn-red",
                    value: "Hủy",
                    function: () => navigate("/profile"),
                  },
                ]}
              />
            </MyForm>
          </div>
        </div>
      )}
    </>
  );
};

export default PasswordEdit;
