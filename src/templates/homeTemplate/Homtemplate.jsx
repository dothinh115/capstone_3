import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import Footer from '../../components/footer/Footer'
import Header from '../../components/header/Header'
import Breadcrumbs from '../../components/breadCrumbs/BreadCrumbs'
import { getEmail, saveLocalStorage } from '../../util/function'
import useGetAllProduct from '../../hooks/useGetAllProduct'
import useGetCartData from '../../hooks/useGetCartData'
import useGetProfile from '../../hooks/useGetProfile'
import Sidebar from '../../components/sidebar/Sidebar'

const Homtemplate = ({ loggedIn }) => {
  const { cartData } = useSelector(store => store.cart);
  const getAllProduct = useGetAllProduct();
  const getCartData = useGetCartData();
  const getProfile = useGetProfile();
  const [pageYOffset, setPageYOffset] = useState(0);

  const saveCartData = () => {
    if (getEmail() && cartData) {
      let data = cartData;
      saveLocalStorage(`cartData.${getEmail()}`, data);
    }
  }

  const setHeight = () => setPageYOffset(window.pageYOffset);

  const backToTopHandle = () => window.scrollTo({ top: 0, behavior: "smooth" });

  useEffect(() => {
    if (loggedIn) getProfile();
  }, [loggedIn]);

  useEffect(() => {
    saveCartData();
  }, [cartData]);

  useEffect(() => {
    if (getEmail()) getCartData(getEmail());
    getAllProduct();
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", setHeight);
    return () => {
      window.removeEventListener("scroll", setHeight);
    }
  });

  return (
    <div className="container main-contain" >
      <div className="contain-header">
        <Header loggedIn={loggedIn} />
      </div>
      <div className="contain-body">
        <div className="body-left">
          <Sidebar />
        </div>
        <div className="body-right">
          <Breadcrumbs />
          <Outlet />
        </div>
      </div>
      <div className="contain-footer">
        <Footer />
      </div>
      <i className={`fa-sharp fa-solid fa-arrow-up back-to-top-button ${pageYOffset >= 300 && "showBackToTop"}`} onClick={() => backToTopHandle()}></i>
    </div>
  )
}

export default Homtemplate