import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
const Header = () => {
  const { userData } = useSelector(store => store.userData);
  const logoutHandle = e => {
    e.preventDefault();
    localStorage.removeItem("loginInfo");
    window.location.reload();
  }

  return (
    <div className="header">
      <div className="header-logo">
        <img src="../img/logo.png" alt="" />
      </div>
      <div className="header-menu">
        <ul>
          {userData ?
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
                  Đăng nhập
                </NavLink>
              </li>
              <li>
                <NavLink to="/register">
                  <i className="fa-solid fa-user-plus"></i>
                  Đăng ký
                </NavLink>
              </li></>}

        </ul>
      </div>
    </div>
  )
}

export default Header