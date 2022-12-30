import React from "react";
import { useSelector } from "react-redux";
import { NavLink, useNavigate, useParams } from "react-router-dom";

const Breadcrumbs = () => {
  const { productId } = useParams();
  const { productData } = useSelector((store) => store.product);
  const find = productData.find((item) => item.id == productId);
  const navigate = useNavigate();

  const onClickCate = (e) => {
    e.preventDefault();
    navigate(`/search/?keywords=${JSON.parse(find?.categories)[0].category}`);
  };

  return (
    <div className="main-container" style={{ marginBottom: "20px" }}>
      <div className="page-header">
        <ul className="breadcrumbs">
          <li>
            <NavLink to="/">
              <i className="fa-solid fa-house"></i>
            </NavLink>
          </li>
          <li>
            <NavLink to="/profile">Thông tin cá nhân</NavLink>
          </li>
          <li>
            <NavLink to="/profile/profile-edit">Sửa thông tin</NavLink>
          </li>
          <li>
            <NavLink to="/profile/password-edit">Đổi mật khẩu</NavLink>
          </li>
          <li>
            <NavLink
              to={`/detail/${productId}`}
              onClick={(e) => onClickCate(e)}
            >
              {find && JSON.parse(find?.categories)[0].category}
            </NavLink>
          </li>
          <li>
            <NavLink to={`/detail/${productId}`}>{find?.name}</NavLink>
          </li>
          <li>
            <NavLink to="/search">Tìm kiếm</NavLink>
          </li>
          <li>
            <NavLink to="/cart">Giỏ hàng</NavLink>
          </li>
          <li>
            <NavLink to="/login">Đăng nhập</NavLink>
          </li>
          <li>
            <NavLink to="/register">Đăng ký</NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Breadcrumbs;
