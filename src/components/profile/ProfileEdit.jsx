import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateProfileApi } from "../../redux/reducers/userReducer";
import { dataConfig } from "../../util/config";
import MyForm from "../Form/MyForm";
import MyFormButton from "../Form/MyFormButton";
import { Input, Select } from "../Form/MyFormItem";

const ProfileEdit = () => {
  const dispatch = useDispatch();
  const { userData, loading } = useSelector((store) => store.userData);
  const navigate = useNavigate();

  const defaultValues = {
    email: userData?.email,
    name: userData?.name,
    gender: userData?.gender,
    phone: userData?.phone,
  };

  const submitHandle = (data) => dispatch(updateProfileApi(data));

  return (
    <>
      {loading && <div className="loader"></div>}
      <div className="main-container">
        <div className="page-header">
          <h1>Chỉnh sửa thông tin cá nhân - {userData?.name}</h1>
        </div>
        <div className="main-body edit-container">
          <MyForm defaultValues={defaultValues} onSubmit={submitHandle}>
            {dataConfig.id.map((item, index) => {
              if (index === 1 || index === 5) return false;
              if (index === 3) return <Select key={index} item={item} />;
              return (
                <Input
                  key={index}
                  item={item}
                  type="text"
                  disabled={item === "email" && true}
                />
              );
            })}
            <MyFormButton
              btn={[
                { type: "submit", value: "Sửa" },
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
    </>
  );
};

export default ProfileEdit;
