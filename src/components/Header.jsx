import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import useToken from '../Hooks/useToken'
import useCheckLogin from '../Hooks/useCheckLogin'
const Header = () => {
  const userData = useSelector(store => store.userData);
  const token = useToken();
  const checkLoginFunc = useCheckLogin();
  const navigate = useNavigate();
  const logoutHandle = e => {
    e.preventDefault();
    setLocalStorage();
    checkLoginFunc();
    navigate("/");
  }

  const setLocalStorage = () => {
    localStorage.removeItem("loginInfo");
  }

  return (
    <div className="header">
      <div className="header-logo">
        <img src="../img/logo.png" alt="" />
      </div>
      <div className="header-menu">
        <ul>
          {token ?
            <>
              <li>
                <NavLink to="/profile">
                  <i className="fa-solid fa-user"></i>
                  {userData.name}
                </NavLink>
              </li>
              <li>
                <a href="#" onClick={e => logoutHandle(e)}>
                  <i className="fa-solid fa-power-off"></i>
                  Thoát
                </a>
              </li>
            </>
            :
            <>
              <li>
                <NavLink to="/login">
                  <i className="fa-solid fa-right-to-bracket"></i>
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink to="/register">
                  <i className="fa-solid fa-user-plus"></i>
                  Register
                </NavLink>
              </li></>}

        </ul>
      </div>
    </div>
  )
}

export default Header