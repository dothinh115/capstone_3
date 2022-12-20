import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, Outlet } from 'react-router-dom'
import Footer from '../../components/footer/Footer'
import Header from '../../components/header/Header'
import Breadcrumbs from '../../components/breadCrumbs/BreadCrumbs'
import { getLocalStorage, saveLocalStorage, totalCount } from '../../function'
import { getAllProductApi } from '../../redux/reducers/productReducer'
import { loadCartData } from '../../redux/reducers/cartReducer'
import useCurrentUserEmail from '../../hooks/useCurrentUserEmail'
import { getProfileApi } from '../../redux/reducers/userReducer'
import useToken from '../../hooks/useToken'

const Homtemplate = () => {
  const dispatch = useDispatch();
  const token = useToken();
  const {cartData} = useSelector(store => store.cart);
  const currentEmail = useCurrentUserEmail();

  const getAllProduct = () => {
    const action = getAllProductApi;
    dispatch(action);
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

  const getProfile = () => {
    const action = getProfileApi(token);
    dispatch(action);
  }

  useEffect(() => {
    getAllProduct();
    getCartData();
  }, []);

  useEffect(() => {
    if(token) getProfile();
  }, [token]);

  useEffect(() => {
    saveCartData();
  }, [cartData]);

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