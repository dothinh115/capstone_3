import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { NavLink, Outlet } from 'react-router-dom'
import Footer from '../../components/footer/Footer'
import Header from '../../components/header/Header'
import Breadcrumbs from '../../components/breadCrumbs/BreadCrumbs'
import { getEmail, saveLocalStorage, totalCount } from '../../util/function'
import useGetAllProduct from '../../hooks/useGetAllProduct'
import useGetCartData from '../../hooks/useGetCartData'
import useGetProfile from '../../hooks/useGetProfile'

const Homtemplate = ({ loggedIn }) => {
  const { cartData } = useSelector(store => store.cart);
  const getAllProduct = useGetAllProduct();
  const getCartData = useGetCartData();
  const getProfile = useGetProfile();

  const saveCartData = () => {
    if (getEmail() && cartData) {
      let data = cartData;
      saveLocalStorage(`cartData.${getEmail()}`, data);
    }
  }

  useEffect(() => {
    getAllProduct();
    getCartData(getEmail());
    if (loggedIn) getProfile();
  }, [loggedIn]);

  useEffect(() => {
    saveCartData();
  }, [cartData]);

  return (
    <div className="container main-contain">
      <div className="contain-header">
        <Header loggedIn={loggedIn} />
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