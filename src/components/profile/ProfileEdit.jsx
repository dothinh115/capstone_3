import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import dataConfig from "../../templates/dataConfig";
import { updateProfileApi } from "../../redux/reducers/userReducer";

const ProfileEdit = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector((store) => store.userData);
  const navigate = useNavigate();
  const [messErr, setMessErr] = useState(null);
  const [loading, setLoading] = useState(false);

  const [dataValue, setDataValue] = useState({
    email: userData?.email,
    name: userData?.name,
    gender: userData?.gender,
    phone: userData?.phone,
  });

  const [error, setError] = useState({
    email: "",
    name: "",
    gender: "",
    phone: "",
  });

  const [valid, setValid] = useState(false);

  const checkValid = () => {
    for (let key in dataValue) {
      if (key === "gender") continue;
      if (dataValue[key] === "" || error[key] !== "") return false;
    }
    return true;
  };

  const inputChangeHandle = (e) => {
    const { value } = e.target;
    const id = e.target.getAttribute("data-id");
    let errMess = "";
    if (value.trim() === "") {
      errMess = "Không được để trống!";
    } else {
      for (let key in dataConfig.id) {
        switch (id) {
          case dataConfig.id[key]: {
            if (!value.match(dataConfig.reg[key]))
              errMess = dataConfig.errorMessage[key];
          }
        }
      }
    }
    setError({
      ...error,
      [id]: errMess,
    });

    setDataValue({
      ...dataValue,
      [id]: value,
    });
  };

  const submitHandle = (e) => {
    e.preventDefault();
    if (checkValid()) {
      sendData();
    }
  };

  const sendData = async () => {
    setLoading(true);
    try {
      await dispatch(updateProfileApi(dataValue));
    } catch (error) {
      setMessErr(error.response.data.content);
    } finally {
      setLoading(false);
      navigate("/profile", {
        state: { resMess: "Chỉnh sửa thông tin thành công" },
      });
    }
  };

  useEffect(() => {
    setValid(checkValid());
  }, [dataValue]);

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
          <form onSubmit={(e) => submitHandle(e)}>
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
                      <select
                        name="gender"
                        data-id={item}
                        onChange={(e) => inputChangeHandle(e)}
                        value={dataValue.gender}
                      >
                        <option value="true">Nam</option>
                        <option value="false">Nữ</option>
                      </select>
                    ) : (
                      <input
                        disabled={item === "email" ? true : false}
                        data-id={item}
                        defaultValue={dataValue[item]}
                        onChange={(e) => inputChangeHandle(e)}
                        onBlur={(e) => inputChangeHandle(e)}
                        placeholder={dataConfig.placeHolder[index]}
                        className={error[item] && "isInvalid"}
                      />
                    )}
                    {error[item] && (
                      <div className="form-error">
                        <i
                          className="fa-solid fa-circle-exclamation"
                          style={{ color: "red" }}
                        ></i>
                        {error[item]}
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
                  <button
                    type="submit"
                    className="btn"
                    disabled={valid ? false : true}
                  >
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
