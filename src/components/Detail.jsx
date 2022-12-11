import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'
import { useSelector } from 'react-redux';
import { memo } from 'react';
import Item from './Item';

const Detail = () => {

  const [productInfo, setProductInfo] = useState({});

  const { productId } = useParams();

  const [number, setNumber] = useState(1);

  const navigate = useNavigate();

  const [productFavorite, setProductFavorite] = useState([]);

  const [like, setLike] = useState(false);

  const currentUser = useSelector(store => store.user);

  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const fetch = await axios({
        url: `https://shop.cyberlearn.vn/api/Product/getbyid?id=${productId}`,
        method: "GET",
        dataType: "application/json"
      });
      setProductInfo(fetch.data.content);
    }
    catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  const sendLike = async (bool) => {
    setLoading(true);
    try {
      const fetch = await axios({
        url: `https://shop.cyberlearn.vn/api/Users/${bool ? "like" : "unlike"}?productId=${productId}`,
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

  const likeHandle = e => {
    if(currentUser.accessToken) {
      if(findIfLiked()) {
        sendLike(false);
      }
      else {
        sendLike(true);
      }
    }
    else {
      navigate("/login");
    }
    
  }

  const findIfLiked = () => {
    const find = productFavorite.find(item => item.id == productId);
    if(find) return true;
    return false;
  }

  useEffect(() => {
    fetchData();
  }, [productId]);

  useEffect(() => {
    setLike(findIfLiked());
  }, [productFavorite]);

  return (
    <>
      <div className="detail-container main-container">
        <div className="page-header">
          <h1>
            {productInfo.name} - <span>${productInfo.price}</span> {loading && <div className="loader"></div>}
          </h1>
        </div>
        <div className="detail-body main-body">
          <div className="detail-body-left">
            <img src={productInfo.image} alt="" />
            <div className="detail-like">
              <i className="fa-regular fa-heart" onClick={e => likeHandle(e)} style={{fontWeight: like && "bold"}}></i>
            </div>
          </div>
          <div className="detail-body-right">
            <p>
              {productInfo.description}
            </p>
            <h1>
              Size có sẵn
            </h1>
            <div className="detail-body-size">
              <ul>
                {productInfo.size?.map((item, index) => {
                  return <li key={index}>{item}</li>
                })}
              </ul>
            </div>
            <div className="detail-body-number">
              <button disabled={number > 1 ? false : true} className="btn" onClick={e=> {
                if(number > 1) {
                  setNumber(number - 1);
                }
              }}>
                -
              </button>
              <span>
                {number}
              </span>
              <button className="btn" onClick={e => {
                setNumber(number + 1);
              }}>
                +
              </button>
            </div>
            <button className="btn btn-brown">
              Thêm vào giỏ
            </button>
          </div>
        </div>
      </div>

      <div className="related-product main-container">
          <div className="page-header">
            <h1>
              Sản phẩm tương tự
            </h1>
          </div>
          <div className="related-product-body">
            <div className="card">
              {productInfo.relatedProducts?.map((item, index) => {
                return <Item item={item} key={index} />
              })}
            </div>
          </div>
      </div>
    </>
  )
}

export default memo(Detail)