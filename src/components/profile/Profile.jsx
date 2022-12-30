import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useLocation, useOutlet } from "react-router-dom";
import {
  getProductFavoriteApi,
  setLikeByIdApi,
} from "../../redux/reducers/productReducer";
import OrderHistory from "../profile/OrderHistory";
import { getProfileApi } from "../../redux/reducers/userReducer";

const Profile = () => {
  const dispatch = useDispatch();
  const { state } = useLocation();
  const { userData } = useSelector((store) => store.userData);
  const { productFavorite } = useSelector((store) => store.product);
  const [deleting, setDeleting] = useState(null);
  const outlet = useOutlet();

  const getProductFavorite = () => dispatch(getProductFavoriteApi);

  const sendUnLike = async (productId) => {
    setDeleting(productId);
    try {
      await dispatch(setLikeByIdApi(false, productId));
    } catch (error) {
      console.log(error);
    } finally {
      getProductFavorite();
    }
  };

  useEffect(() => {
    getProductFavorite();
    dispatch(getProfileApi);
  }, []);
  return (
    <>
      {state?.resMess && (
        <>
          <div className="main-container" style={{ marginBottom: "20px" }}>
            <div className="page-header">
              <i className="fa-solid fa-check" style={{ color: "green" }}></i>
              {state?.resMess}
            </div>
          </div>
        </>
      )}
      {outlet ? (
        <Outlet />
      ) : (
        <>
          <div className="main-container">
            <div className="page-header">
              <h1>THÔNG TIN CÁ NHÂN</h1>
            </div>
            <div className="main-body profile-body">
              <div className="main-body-inner">
                <div className="main-body-inner-left">
                  <img src={userData?.avatar} alt="" />
                </div>
                <div className="main-body-inner-right">
                  <div className="item">
                    <div className="inner-left">
                      Email:{" "}
                      {userData?.email?.split("@")[0].length > 12
                        ? userData?.email?.split("@")[0].slice(0, 6) +
                          "..." +
                          userData?.email?.split("@")[0].slice(9, 12) +
                          "@" +
                          userData?.email?.split("@")[1]
                        : userData?.email}
                    </div>
                    <div className="inner-right">Họ tên: {userData?.name}</div>
                  </div>
                  <div className="item">
                    <div className="inner-left">
                      Giới tính:{" "}
                      <i
                        className={`fa-solid fa-${
                          userData?.gender ? "mars" : "venus"
                        }`}
                      ></i>
                    </div>
                    <div className="inner-right">
                      Điện thoại: {userData?.phone}
                    </div>
                  </div>
                  <div className="item">
                    <Link to="/profile/profile-edit" className="edit-button">
                      <i className="fa-solid fa-pen-to-square"></i>
                      Chỉnh sửa
                    </Link>

                    <Link to="/profile/password-edit" className="edit-button">
                      <i className="fa-solid fa-key"></i>
                      Đổi mật khẩu
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className="main-container order-history"
            style={{ marginTop: "20px" }}
          >
            <div className="page-header">
              <h1>LỊCH SỬ MUA HÀNG</h1>
            </div>
            <div className="main-body">
              <OrderHistory />
            </div>
          </div>

          <div className="main-container" style={{ marginTop: "20px" }}>
            <div className="page-header">
              <h1>SẢN PHẨM YÊU THÍCH</h1>
            </div>
            <div className="main-body liked-product">
              {productFavorite.length === 0 ? (
                "Chưa có sản phẩm yêu thích!"
              ) : (
                <>
                  <div className="table">
                    <div className="thead">
                      <div className="tr">
                        <div className="th"></div>
                        <div className="th">Tên sản phẩm</div>
                        <div className="th">Thao tác</div>
                      </div>
                    </div>
                    <div className="tbody">
                      {productFavorite?.map((item, index) => {
                        return (
                          <div
                            key={index}
                            className="tr"
                            style={{ opacity: deleting === item.id && ".3" }}
                          >
                            <div className="td">
                              <img src={item.image} alt="" />
                            </div>
                            <div className="td">
                              <Link to={`/detail/${item.id}`}>{item.name}</Link>
                            </div>
                            <div className="td">
                              <button
                                className="btn btn-red"
                                onClick={(e) => sendUnLike(item.id)}
                              >
                                <i className="fa-solid fa-trash"></i>
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Profile;
