import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import dataConfig from "../../templates/dataConfig";
import { updateProfileApi } from "../../redux/reducers/userReducer";
import { useForm } from "react-hook-form";

const ProfileEdit = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector((store) => store.userData);
  const navigate = useNavigate();
  const [messErr, setMessErr] = useState(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
    defaultValues: {
      email: userData?.email,
      name: userData?.name,
      gender: userData?.gender,
      phone: userData?.phone,
    },
  });

  const submitHandle = async (data) => {
    setLoading(true);
    try {
      await dispatch(updateProfileApi(data));
    } catch (error) {
      setMessErr(error.response.data.content);
    } finally {
      setLoading(false);
      navigate("/profile", {
        state: { resMess: "Chỉnh sửa thông tin thành công" },
      });
    }
  };

  return (
    <>
      {messErr && (
        <>
          <div className="main-container" style={{ marginBottom: "20px" }}>
            <div className="page-header">
              <i
                className="fa-solid fa-circle-exclamation"
                style={{ color: "red" }}
              ></i>
              {messErr}
            </div>
          </div>
        </>
      )}
      {loading && <div className="loader"></div>}
      <div className="main-container">
        <div className="page-header">
          <h1>Chỉnh sửa thông tin cá nhân - {userData?.name}</h1>
        </div>
        <div className="main-body edit-container">
          <form onSubmit={handleSubmit(submitHandle)}>
            {dataConfig.id.map((item, index) => {
              if (index === 1) return false;
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
                        disabled={item === "email" ? true : false}
                        {...register(item, {
                          required: "Không được bỏ trống!",
                          pattern: {
                            value: dataConfig.reg[index],
                            message: dataConfig.errorMessage[index],
                          },
                        })}
                        placeholder={dataConfig.placeHolder[index]}
                        className={errors[item]?.message && "isInvalid"}
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
                  <button type="submit" className="btn">
                    Sửa
                  </button>
                  <button
                    type="button"
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
    </>
  );
};

export default ProfileEdit;
