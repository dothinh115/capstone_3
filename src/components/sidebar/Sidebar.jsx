import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { totalCount } from "../../util/function";

const Sidebar = () => {
  const { cartData } = useSelector((store) => store.cart);
  return (
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
  );
};

export default Sidebar;
