import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import Header from '../components/Header'
import axios from 'axios'
import Breadcrumbs from '../components/Breadcrumbs'
import { loadCartData, loadOrderHistory, updateData } from '../redux/actions/dataActions'
import useCurrentUserEmail from '../Hooks/useCurrentUserEmail'

const Homtemplate = () => {
  const dispatch = useDispatch();
  const cartData = useSelector(store => store.cart);
  const orderHistoryData = useSelector(store => store.orderHistory);
  const currentEmail = useCurrentUserEmail();

  const fetchData = async () => {
    try {
      const fetch = await axios({
        url: "https://shop.cyberlearn.vn/api/Product",
        method: "GET",
        dataType: "application/json"
      });
      const action = updateData(fetch.data.content);
      dispatch(action);
    }
    catch (error) {
      console.log(error);
    }
  }

  const saveOrderHistoryData = () => {
    if (currentEmail && orderHistoryData) {
      let data = orderHistoryData;
      data = JSON.stringify(data);
      localStorage.setItem(`orderHistoryData.${currentEmail}`, data);
    }
  }

  const getOrderHistoryData = () => {
    let data = localStorage.getItem(`orderHistoryData.${currentEmail}`);
    if (data) {
      data = JSON.parse(data);
      const action = loadOrderHistory(data);
      dispatch(action);
    }
  }

  const saveCartData = () => {
    if (currentEmail && cartData) {
      let data = cartData;
      data = JSON.stringify(data);
      localStorage.setItem(`cartData.${currentEmail}`, data);
    }
  }

  const getCartData = () => {
    let data = localStorage.getItem(`cartData.${currentEmail}`);
    if (data) {
      data = JSON.parse(data);
      const action = loadCartData(data);
      dispatch(action);
    }
  }

  const cartItemsCounting = () => {
    let total = 0;
    for (let key in cartData) {
      total += cartData[key].quantity;
    }
    return total;
  }

  useEffect(() => {
    fetchData();
    getCartData();
    getOrderHistoryData();
  }, []);

  useEffect(() => {
    saveCartData();
  }, [cartData]);

  useEffect(() => {
    saveOrderHistoryData();
  }, [orderHistoryData])

  return (
    <div className="container main-contain">
      <div className="contain-header">
        <Header />
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
                Giỏ hàng [ <b>{cartItemsCounting()}</b> ]
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="body-right">
          <Breadcrumbs />
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