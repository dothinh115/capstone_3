import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updatePasswordApi } from "../../redux/reducers/userReducer";
import MyForm from "../Form/MyForm";
import MyFormButton from "../Form/MyFormButton";
import { Input } from "../Form/MyFormItem";
import MainBlock from "../others/MainBlock";

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
        <MainBlock
          headerValue="ĐỔI MẬT KHẨU"
          otherClass="edit-container"
          value={
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
          }
        />
      )}
    </>
  );
};

export default PasswordEdit;
