import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Profile = () => {
  const currentUser = useSelector(store => store.user);

  const userData = useSelector(store => store.userData);

  const navigate = useNavigate();

  const [productFavorite, setProductFavorite] = useState([]);

  const getProductFavorite = async () => {
    try {
      const fetch = await axios({
        url: "https://shop.cyberlearn.vn/api/Users/getproductfavorite",
        method: "GET",
        dataType: "application/json",
        headers: {
          "Authorization": `Bearer ${currentUser.accessToken}`
        }
      });
      setProductFavorite(fetch.data.content.productsFavorite);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    !currentUser.accessToken && navigate("/login");
    getProductFavorite();
  }, [currentUser]);
  return (
    <>
      <div className="main-container">
        <div className="page-header">
          <h1>
            THÔNG TIN CÁ NHÂN
          </h1>
        </div>
        <div className="main-body profile-body">
          <div className="main-body-inner">
            <div className="main-body-inner-left">
              <img src={userData.avatar} alt="" />
            </div>
            <div className="main-body-inner-right">
              <div className="item">
                <div className="inner-left">
                  Email: <span>{userData.email}</span>
                </div>
                <div className="inner-right">
                  Họ tên: <span>{userData.name}</span>
                </div>
              </div>
              <div className="item">
                <div className="inner-left">
                  Giới tính: <span><i className={`fa-solid fa-${userData.gender ? "mars" : "venus"}`}></i></span>
                </div>
                <div className="inner-right">
                  Điện thoại: <span>{userData.phone}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="main-container" style={{marginTop: "20px"}}>
        <div className="page-header">
          <h1>
            LỊCH SỬ MUA HÀNG
          </h1>
        </div>
        <div className="main-body">
          {!userData.orderHistory && "Chưa có lịch sử mua hàng!"}
        </div>
      </div>

      <div className="main-container" style={{marginTop: "20px"}}>
        <div className="page-header">
          <h1>
            SẢN PHẨM YÊU THÍCH
          </h1>
        </div>
        <div className="main-body">
          {productFavorite.length === 0 && "Chưa có sản phẩm yêu thích!"}
        </div>
      </div>
    </>
  )
}

export default Profile