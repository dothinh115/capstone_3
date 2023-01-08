import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import { totalCount } from "../../util/function";

const Sidebar = () => {
  const { cartData } = useSelector((store) => store.cart);
  const { state } = useLocation();
  const [showAlert, setShowAlert] = useState(false);
  useEffect(() => {
    setShowAlert(state?.success);
  });

  useEffect(() => {
    if (showAlert === true) {
      setTimeout(() => {
        setShowAlert(false);
        state.success = false;
      }, 4000);
    }
  }, [showAlert]);
  return (
    <ul className="index-menu">
      <li>
        <NavLink to="/">
          <i className="fa-solid fa-house"></i>
          Trang chủ
        </NavLink>
      </li>
      <li>
        <NavLink to="/all">
          <i className="fa-solid fa-binoculars"></i>
          Sản phẩm
        </NavLink>
      </li>
      <li>
        <NavLink to="/search">
          <i className="fa-solid fa-magnifying-glass"></i>
          Tìm kiếm
        </NavLink>
      </li>
      <li style={{ position: "relative" }}>
        <NavLink to="/cart">
          <i className="fa-solid fa-cart-shopping"></i>
          Giỏ hàng <b>[ {totalCount(cartData, "quantity")} ]</b>
        </NavLink>
        <div
          className="add-to-cart-success"
          style={{ opacity: !showAlert ? 0 : 1 }}
        >
          <i className="fa-solid fa-check"></i>
        </div>
      </li>
    </ul>
  );
};

export default Sidebar;
