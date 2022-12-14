import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import '../assets/css/breadcrumbs.css'

const Breadcrumbs = () => {
    const { productId } = useParams();
    const productData = useSelector(store => store.data);
    const find = productData.find(item => item.id == productId);
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
                        <NavLink to="/profile">
                            Thông tin cá nhân
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/profile/edit">
                            Sửa
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={`/detail/${productId}`}>
                            Sản phẩm
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={`/detail/${productId}`}>
                            {find?.name}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/search">
                            Tìm kiếm
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/cart">
                            Giỏ hàng
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/login">
                            Đăng nhập
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/register">
                            Đăng ký
                        </NavLink>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Breadcrumbs