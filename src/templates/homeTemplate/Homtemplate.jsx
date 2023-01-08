import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import Breadcrumbs from "../../components/breadCrumbs/BreadCrumbs";
import Sidebar from "../../components/sidebar/Sidebar";
import useCartData from "../../hooks/useCartData";
import {
  getAllProductApi,
  getProductFavoriteApi,
} from "../../redux/reducers/productReducer";
import { getProfileApi } from "../../redux/reducers/userReducer";

const Homtemplate = () => {
  const { cartData } = useSelector((store) => store.cart);
  const [pageYOffset, setPageYOffset] = useState(0);
  const { saveCartData } = useCartData();
  const dispatch = useDispatch();

  const getAllProduct = () => dispatch(getAllProductApi);

  const setHeight = () => setPageYOffset(window.pageYOffset);

  const backToTopHandle = () => window.scrollTo({ top: 0, behavior: "smooth" });

  useEffect(() => saveCartData(cartData), [cartData]);

  useEffect(() => {
    getAllProduct();
    dispatch(getProfileApi);
    dispatch(getProductFavoriteApi);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", setHeight);
    return () => window.removeEventListener("scroll", setHeight);
  });

  return (
    <div className="container main-contain">
      <div className="contain-header">
        <Header />
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
      <i
        className={`fa-sharp fa-solid fa-arrow-up back-to-top-button ${
          pageYOffset >= 300 && "showBackToTop"
        }`}
        onClick={() => backToTopHandle()}
      ></i>
    </div>
  );
};

export default Homtemplate;
