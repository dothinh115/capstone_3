import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Profile = () => {
  const currentUser = useSelector(store => store.user);

  const userData = useSelector(store => store.userData);

  const navigate = useNavigate();

  const [productFavorite, setProductFavorite] = useState([]);

  const [loading, setLoading] = useState(false);

  const getProductFavorite = async () => {
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  }

  const sendUnLike = async (productId) => {
    setLoading(true);
    try {
      const fetch = await axios({
        url: `https://shop.cyberlearn.vn/api/Users/unlike?productId=${productId}`,
        method: "GET",
        dataType: "application/json",
        headers: {
          "Authorization": `Bearer ${currentUser.accessToken}`
        }
      });
      getProductFavorite();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  } 
  const getLocalStorage = () => {
    let data = localStorage.getItem("loginInfo");
    if(data) {
      data = JSON.parse(data);
      return data;
    }
  }

  useEffect(() => {
    !getLocalStorage()?.email && navigate("/login");
    currentUser.accessToken && getProductFavorite();
  }, [currentUser, userData]);
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
            SẢN PHẨM YÊU THÍCH {loading && <div className="loader"></div>}
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
                        <button className="btn" onClick={e => sendUnLike(item.id)}>
                          Xóa
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