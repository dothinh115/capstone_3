import React from "react";
import { useSelector } from "react-redux";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import useToken from "../../hooks/useToken";
import { loginKey } from "../../util/config";

const Header = () => {
  const { userData } = useSelector((store) => store.userData);
  const navigate = useNavigate();
  const location = useLocation();
  const { token } = useToken();
  const logoutHandle = (e) => {
    e.preventDefault();
    localStorage.removeItem(loginKey);
    window.location.reload();
  };

  const loginClickHandle = (e) => {
    e.preventDefault();
    navigate("/login", { state: { page: location.pathname } });
  };

  return (
    <div className="header">
      <div className="header-logo">
        <img src="../img/logo.png" alt="" />
      </div>
      <div className="header-menu">
        <ul>
          {token ? (
            <>
              <li>
                <NavLink to="/profile">
                  <i className="fa-solid fa-user"></i>
                  {userData?.name}
                </NavLink>
              </li>
              <li>
                <a href="#" onClick={(e) => logoutHandle(e)}>
                  <i className="fa-solid fa-power-off"></i>
                  Thoát
                </a>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink
                  to="/login"
                  onClick={(e) => {
                    loginClickHandle(e);
                  }}
                >
                  <i className="fa-solid fa-right-to-bracket"></i>
                  Đăng nhập
                </NavLink>
              </li>
              <li>
                <NavLink to="/register">
                  <i className="fa-solid fa-user-plus"></i>
                  Đăng ký
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Header;
