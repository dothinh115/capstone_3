import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import Header from '../components/Header'
import axios from 'axios'
import { loginUpdate, userDataUpdate } from '../redux/actions/userActions'

const Homtemplate = () => {
  const userInfo = useSelector(store => store.user);

  const dispatch = useDispatch();

  const getUserInfo = async () => {
    try {
      const fetch = await axios({
        url: "https://shop.cyberlearn.vn/api/Users/getProfile",
        method: "POST",
        dataType: "application/json",
        headers: {
          "Authorization": `Bearer ${userInfo.accessToken}`
        }
      });
      const action = userDataUpdate(fetch.data.content);
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  }

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
  }, []);

  useEffect(()=> {
    if(userInfo.accessToken) {
      getUserInfo();
    }
  }, [userInfo]);

  useEffect(()=> {
    if(userInfo.accessToken) {
      getUserInfo();
    }
  }, [userInfo]);

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