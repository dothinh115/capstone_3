import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, Outlet, useNavigate, useOutlet } from 'react-router-dom';
import axios from 'axios';
import useToken from '../Hooks/useToken';
import OrderHistory from './OrderHistory';
import useCheckToken from '../Hooks/useCheckToken';

const Profile = () => {
  const token = useToken();
  const userData = useSelector(store => store.userData);
  const navigate = useNavigate();
  const [productFavorite, setProductFavorite] = useState([]);
  const outlet = useOutlet();
  const checkToken = useCheckToken();

  const getProductFavorite = async () => {
    try {
      const fetch = await axios({
        url: "https://shop.cyberlearn.vn/api/Users/getproductfavorite",
        method: "GET",
        dataType: "application/json",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      setProductFavorite(fetch.data.content.productsFavorite);
    } catch (error) {
      console.log(error);
    } 
  }

  const sendUnLike = async (productId) => {
    try {
      await axios({
        url: `https://shop.cyberlearn.vn/api/Users/unlike?productId=${productId}`,
        method: "GET",
        dataType: "application/json",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      getProductFavorite();
    } catch (error) {
      console.log(error);
    }
  } 

  useEffect(() => {
    token ? getProductFavorite() : navigate("/login");
    checkToken();
  }, []);
  return (
    <>
      {outlet ? <Outlet/> : 
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
                    Email: {userData.email}
                  </div>
                  <div className="inner-right">
                    Họ tên: {userData.name}
                  </div>
                </div>
                <div className="item">
                  <div className="inner-left">
                    Giới tính: <i className={`fa-solid fa-${userData.gender ? "mars" : "venus"}`}></i>
                  </div>
                  <div className="inner-right">
                    Điện thoại: {userData.phone}
                  </div>
                </div>
                <div className="item">
                  <Link to="/profile/edit" className="edit-button">
                    <i className="fa-solid fa-pen-to-square"></i>
                    Chỉnh sửa
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </> }
    
      <div className="main-container order-history" style={{marginTop: "20px"}}>
        <div className="page-header">
          <h1>
            LỊCH SỬ MUA HÀNG
          </h1>
        </div>
        <div className="main-body">
          <OrderHistory />
        </div>
      </div>

      <div className="main-container" style={{marginTop: "20px"}}>
        <div className="page-header">
          <h1>
            SẢN PHẨM YÊU THÍCH
          </h1>
        </div>
        <div className="main-body liked-product">
          {productFavorite.length === 0 ? "Chưa có sản phẩm yêu thích!" : 
          <>
            <div className="table">
              <div className="thead">
                <div className="tr">
                  <div className="th">Hình ảnh</div>
                  <div className="th">Tên sản phẩm</div>
                  <div className="th">Thao tác</div>
                </div>
              </div>
              <div className="tbody">
                {productFavorite?.map((item, index) => {
                  return (<div key={index} className="tr">
                      <div className="td">
                        <img src={item.image} alt="" />
                      </div>
                      <div className="td">
                        <Link to={`/detail/${item.id}`}>
                          {item.name}
                        </Link>
                      </div>
                      <div className="td">
                        <button className="btn btn-red" onClick={e => sendUnLike(item.id)}>
                          <i className="fa-solid fa-trash"></i>
                        </button>
                      </div>
                    </div>
                )
                })}
              </div>
            </div>
          </>}
        </div>
      </div>
    </>
  )
}

export default Profile