import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, Outlet } from 'react-router-dom'
import Footer from '../../components/footer/Footer'
import Header from '../../components/header/Header'
import axios from 'axios'
import Breadcrumbs from '../../components/breadCrumbs/BreadCrumbs'
import useUpdateUser from '../../hooks/useUpdateUser'
import { getLocalStorage, saveLocalStorage, totalCount } from '../../function'
import { updateProductReducer } from '../../redux/reducers/productReducer'
import { loadCartData } from '../../redux/reducers/cartReducer'
import { loadOrder } from '../../redux/reducers/orderReducer'
import useCurrentUserEmail from '../../hooks/useCurrentUserEmail'

const Homtemplate = () => {
  const dispatch = useDispatch();
  const {cartData} = useSelector(store => store.cart);
  const {orderData} = useSelector(store => store.orderHistory);
  const currentEmail = useCurrentUserEmail();
  const updateUser = useUpdateUser();

  const fetchData = async () => {
    try {
      const fetch = await axios({
        url: "https://shop.cyberlearn.vn/api/Product",
        method: "GET",
        dataType: "application/json"
      });
      const action = updateProductReducer(fetch.data.content);
      dispatch(action);
    }
    catch (error) {
      console.log(error);
    }
  }

  const saveOrderHistoryData = () => {
    if (currentEmail && orderData) {
      let data = orderData;
      saveLocalStorage(`orderHistoryData.${currentEmail}`, data);
    }
  }

  const getOrderHistoryData = () => {
    let data = getLocalStorage(`orderHistoryData.${currentEmail}`);
    if (data) {
      data = Object.values(data);
      const action = loadOrder(data);
      dispatch(action);
    }
  }

  const saveCartData = () => {
    if (currentEmail && cartData) {
      let data = cartData;
      saveLocalStorage(`cartData.${currentEmail}`, data);
    }
  }

  const getCartData = () => {
    const data = getLocalStorage(`cartData.${currentEmail}`);
    if (data) {
      const action = loadCartData(data);
      dispatch(action);
    }
  }

  useEffect(() => {
    fetchData();
    getCartData();
    getOrderHistoryData();
    updateUser();
  }, []);

  useEffect(() => {
    saveCartData();
  }, [cartData]);

  useEffect(() => {
    saveOrderHistoryData();
  }, [orderData])

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
                Giỏ hàng [ <b>{totalCount(cartData, "quantity")}</b> ]
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