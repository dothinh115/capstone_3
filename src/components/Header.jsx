import React from 'react'
import { NavLink } from 'react-router-dom'

const Header = () => {
  return (
    <div className="header">
      <div className="header-logo">
        <img src="../img/logo.png" alt="" />
      </div>
      <div className="header-menu">
        <ul>
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
            </li>
        </ul>
      </div>
    </div>
  )
}

export default Header