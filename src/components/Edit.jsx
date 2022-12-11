import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { userDataUpdate } from '../redux/actions/userActions';

const Edit = () => {
  const currentUser = useSelector(store => store.user);

  const userInfo = useSelector(store => store.userData);

  const dispatch = useDispatch();

  const navigate = useNavigate();

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

  const dataConfig = {
    id: ["email", "password", "name", "gender", "phone"],
    name: ["Email", "Password", "Họ tên", "Giới tính", "Số điện thoại"],
    errorMessage: ["Email phải đúng định dạng!", "Passworld không hợp lệ!", "Tên chỉ được điền chữ!", "Giới tính phải được chọn!", "Số điện thoại chỉ được điền số!"],
    icon: ["envelope", "lock", "file-signature", "venus-mars", "phone"],
    reg: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{0,}$/, "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" + "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" + "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$", "^([Tt][Rr][Uu][Ee]|[Ff][Aa][Ll][Ss][Ee])$", /^[0-9]+$/]
  }

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
    try {
      const fetch = await axios({
        url: "https://shop.cyberlearn.vn/api/Users/updateProfile",
        method: "POST",
        dataType: "application/json",
        data: dataValue,
        headers: {
          "Authorization": `Bearer ${currentUser.accessToken}`
        }
      });
      window.location.reload(false);
    } catch (error) {
      console.log(error);
    }
  }

  const getLocalStorage = () => {
    let data = localStorage.getItem("loginInfo");
    if(data) {
      data = JSON.parse(data);
      return data;
    }
  }

  useEffect(() => {
    !getLocalStorage().accessToken && navigate("/login");
    // for (let key in dataValue) {
    //   setDataValue({
    //     ...dataValue,
    //     [key]: userInfo[key]
    //   });
    // }
    setDataValue({
      ...dataValue,
      name: userInfo.name,
      gender: userInfo.gender,
      email: userInfo.email,
      phone: userInfo.phone
    })
  }, [currentUser, userInfo]);

  useEffect(() => {
    setValid(checkValid());
  }, [dataValue]);

  return (
    <>
      <div className="main-container">
        <div className="page-header">
          <h1>
            Chỉnh sửa thông tin cá nhân - {userInfo.name}
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