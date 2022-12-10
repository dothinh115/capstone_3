import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import Header from '../components/Header'

const Homtemplate = () => {
  return (
    <div className="container main-contain">
      <div className="contain-header">
        <Header />
        <div className="sub-menu">

        </div>
      </div>
      <div className="contain-body">
        <div className="body-left">
          <ul className="index-menu">
            <li>
              <NavLink to="/">
                <i className="fa-solid fa-house"></i>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/search">
                <i className="fa-solid fa-magnifying-glass"></i>
                Search
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="body-right">
          <Outlet />
        </div>
      </div>
      <div className="contain-footer">
        <Footer />
      </div>
    </div>
  )
}

export default Homtemplate