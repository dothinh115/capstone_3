import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';

const Register = () => {
  const currentUser = useSelector(store => store.user);

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

  const [result, setResult] = useState({
    result: "",
    message: ""
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
      if(dataValue[key] === "" || error[key] !== ""){
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

    setValid(checkValid());
  }

  const sendData = async () => {
    try {
      const fetch = await axios({
        url: "https://shop.cyberlearn.vn/api/Users/signup",
        method: "POST",
        data: dataValue
      });
      setResult({
        result: true,
        message: fetch.data.message
      });
    } catch (error) {
      setResult({
        result: false,
        message: error.response.data.message
      });
    }
  }

  const submitHandle = e => {
    e.preventDefault();
  }

  const showResult = res => {
    if(res) {
      return (
        <>
          <i className="fa-solid fa-check" style={{color: "green"}}></i>Đăng ký thành công, {<Link to="/login"><i className="fa-solid fa-arrow-right"></i>bấm vào đây</Link>} để đăng nhập!!
        </>
      )
    }
    return (
      <>
        <i className="fa-solid fa-circle-exclamation" style={{color: "red"}}></i> 
        {result.message}
      </>
    ) 
  }

  const resetButtonHandle = e => {
    e.preventDefault();
    setDataValue({
      email: "",
      password: "",
      name: "",
      gender: true,
      phone: ""
    });
    setError({
      email: "",
      password: "",
      name: "",
      gender: "",
      phone: ""
    });
  }

  const regButtonHandle = e => {
    if(checkValid()){
      sendData();
    }
  }

  useEffect(() => {
    currentUser.accessToken && navigate("/");
  }, [currentUser]);

  return (
    <>
    {result.message && <div className="main-container">
      <div className="page-header">
        <h1>
          THÔNG BÁO
        </h1>
      </div>
      <div className="main-body">
        {showResult(result.result)}
      </div>
    </div>}
      <div className="main-container" style={{marginTop: result.message && "20px"}}>
        <div className="page-header">
          <h1>
            ĐĂNG KÝ TÀI KHOẢN
          </h1>
        </div>
        <div className="main-body">
          <p>
            <i className="fa-solid fa-arrow-right"></i>
            Nếu đã có tài khoản, vui lòng <Link to="/login">đăng nhập</Link>!!!
          </p>
          <div className="register-form">
            <form onSubmit={e => submitHandle(e)}>
              <div className="register-form-main">
                {dataConfig.id.map((item, index) => {
                  return (
                    <div key={index} className="item">
                      <div className="item-left">
                        {<i className={`fa-solid fa-${dataConfig.icon[index]}`}></i>}
                        {dataConfig.name[index]}
                      </div>
                      <div className="item-right">
                        {item === "gender" ? <select name="gender" data-id={item} onChange={e => inputChangeHandle(e)} value={dataValue.gender}>
                          <option value="true">
                            Nam
                          </option>
                          <option value="false">
                            Nữ
                          </option>
                          </select> : <input data-id={item} type={item === "password" ? "password" : "text"} value={dataValue[item]} onChange={e => inputChangeHandle(e)} />}
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
                      <button className="btn" onClick={e => resetButtonHandle(e)}>
                        Reset
                      </button>
                      <button className="btn" disabled={valid ? false : true} onClick={e => regButtonHandle(e)}>
                        Đăng ký
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Register