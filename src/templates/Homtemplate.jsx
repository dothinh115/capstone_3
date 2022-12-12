import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { NavLink, Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import Header from '../components/Header'
import axios from 'axios'
import { loginUpdate } from '../redux/actions/userActions'
import useUpdateUser from '../components/Hooks/useUpdateUser'

const Homtemplate = () => {
  const dispatch = useDispatch();
  const updateUserFunc = useUpdateUser();

  const fetchData = async () => {
    try {
      const fetch = await axios({
        url: "https://shop.cyberlearn.vn/api/Product",
        method: "GET",
        dataType: "application/json"
      });
      const action = {
        type: "UPDATE_DATA",
        payload: fetch.data.content
      }
      dispatch(action);
    } 
    catch (error) {
      console.log(error);
    }
  }

  const getLocalStorage = () => {
    let data = localStorage.getItem("loginInfo");
    if(data) {
      data = JSON.parse(data);
      const action = loginUpdate(data);
      dispatch(action);
    }
  }

  useEffect(() => {
    fetchData();
    getLocalStorage();
    updateUserFunc();
  }, []);

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
                Trang chủ
              </NavLink>
            </li>
            <li>
              <NavLink to="/search">
                <i className="fa-solid fa-magnifying-glass"></i>
                Tìm kiếm
              </NavLink>
            </li>
            <li>
              <NavLink to="/cart">
                <i className="fa-solid fa-cart-shopping"></i>
                Giỏ hàng
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