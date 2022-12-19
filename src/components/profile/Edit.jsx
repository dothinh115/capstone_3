import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import dataConfig from '../../templates/dataConfig';
import useToken from '../../hooks/useToken';
import useCheckToken from '../../hooks/useCheckToken';
import { getProfileApi, updateProfileApi } from '../../redux/reducers/userReducer';

const Edit = () => {
  const token = useToken();
  const dispatch = useDispatch()
  const {userData} = useSelector(store => store.userData);
  const navigate = useNavigate();
  const checkToken = useCheckToken();

  const [dataValue, setDataValue] = useState({
    email: "",
    password: "",
    name: "",
    gender: true,
    phone: ""
  });

  const [error, setError] = useState({
    email: "",
    password: "",
    name: "",
    gender: "",
    phone: ""
  });

  const [valid, setValid] = useState(false);

  const checkValid = () => {
    for (let key in dataValue) {
      if(key === "gender"){
        continue;
      }
      if(dataValue[key] == "" || error[key] != ""){
        return false;
      }
    }
    return true;
  }

  const inputChangeHandle = e => {
    const {value} = e.target;
    const id = e.target.getAttribute("data-id");
    let errMess = "";
    if(value.trim() === "") {
      errMess = "Không được để trống!";
    }
    else {
      for (let key in dataConfig.id) {
        switch (id) {
          case dataConfig.id[key]: {
            if(!value.match(dataConfig.reg[key])){
              errMess = dataConfig.errorMessage[key];
            }
          }
        }
      }
    }
    setError({
      ...error,
      [id]: errMess
    });

    setDataValue({
      ...dataValue,
      [id]: value
    });
  }

  const submitHandle = e => {
    e.preventDefault();
    if(checkValid()) {
      sendData();
    }
  }

  const sendData = async () => {
    const action = await updateProfileApi(token, dataValue);
    await dispatch(action);
    const action_2 = await getProfileApi(token);
    await dispatch(action_2);
    await navigate("/profile");
  }

  useEffect(() => {
    // for (let key in dataValue) {
    //   setDataValue({
    //     ...dataValue,
    //     [key]: userInfo[key]
    //   });
    // }
    setDataValue({
      ...dataValue,
      name: userData.name,
      gender: userData.gender,
      email: userData.email,
      phone: userData.phone
    })
  }, [userData]);

  useEffect(() => {
    setValid(checkValid());
  }, [dataValue]);

  useEffect(() => {
    !token && navigate("/login");
    checkToken();
  }, [])

  return (
    <>
      <div className="main-container">
        <div className="page-header">
          <h1>
            Chỉnh sửa thông tin cá nhân - {userData.name}
          </h1>
        </div>
        <div className="main-body edit-container">
          <form onSubmit={e => submitHandle(e)}>
            {dataConfig.id.map((item, index) => {
              return (
                <div key={index} className="item">
                  <div className="item-left">
                    {<i className={`fa-solid fa-${dataConfig.icon[index]}`}></i>}
                    {dataConfig.name[index]}
                  </div>
                  <div className="item-right">
                    {item === "gender" ? <select name="gender" data-id={item} onChange={e => inputChangeHandle(e)} value={dataValue.gender}>
                      <option value="true" >
                        Nam
                      </option>
                      <option value="false">
                        Nữ
                      </option>
                      </select> : <input data-id={item} type={item === "password" ? "password" : "text"} defaultValue={dataValue[item]} onChange={e => inputChangeHandle(e)} onBlur={e => setValid(checkValid())} />}
                      {error[item] && <div className="form-error">
                        {error[item]}
                      </div>}
                  </div>
                </div>
              )
            })}
            <div className="item">
              <div className="item-left">

              </div>
              <div className="item-right">
                <div className="form-button">
                  <button className="btn" disabled={valid ? false : true}>
                    Sửa
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Edit