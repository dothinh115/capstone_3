import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'
import Item from './Item';
import useToken from '../Hooks/useToken';
import { addToCart } from '../redux/actions/dataActions';
import { useDispatch } from 'react-redux';

const Detail = () => {
  const [productInfo, setProductInfo] = useState({});
  const dispatch = useDispatch();
  const token = useToken();
  const { productId } = useParams();
  const [number, setNumber] = useState(1);
  const navigate = useNavigate();
  const [like, setLike] = useState(false);
  const [addResult, setAddResult] = useState(false);

  const fetchData = async () => {
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
    }
  }

  const sendLike = async (bool) => {
    try {
      const fetch = await axios({
        url: `https://shop.cyberlearn.vn/api/Users/${bool ? "like" : "unlike"}?productId=${productId}`,
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
      setLike(findIfLiked(Object.values(fetch.data.content.productsFavorite)));
    } catch (error) {
      console.log(error);
    }
  }

  const likeHandle = e => {
    token ? like ? sendLike(false) : sendLike(true) : navigate("/login");
  }

  const findIfLiked = arr => {
    const find = arr.find(item => item.id == productId);
    if (find) return true;
    return false;
  }

  const addToCartHandle = () => {
    const payload = {
      ...productInfo,
      quantity: number,
      checked: false
    }
    const action = addToCart(payload);
    if(token) {
      dispatch(action);
      setAddResult(true);
    }
    else {
      navigate("/login");
    }
  }

  useEffect(() => {
    fetchData();
    getProductFavorite();
  }, [productId]);

  return (
    <>
      {addResult && <div className="main-container" style={{marginBottom: "20px"}}>
        <div className="page-header">
          Thêm giỏ hàng thành công, <Link to="/cart" className="alert-link">xem giỏ hàng</Link>.
        </div>
      </div>}
      <div className="detail-container main-container">
        <div className="page-header">
          <h1>
            {productInfo.name}
          </h1>
        </div>
        <div className="detail-body main-body">
          <div className="detail-body-left">
            <img src={productInfo.image} alt="" />
          </div>
          <div className="detail-body-right">
            <p>
              {productInfo.description}
            </p>
            <p className="price-layout">
              <span className="price">
                <i className="fa-solid fa-tag"></i>
                ${productInfo.price}
              </span>
              <span className="detail-like" onClick={e => likeHandle(e)}>
                <i className="fa-regular fa-heart" style={{ fontWeight: like && "bold" }}></i>
                Like
              </span>
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
              <button disabled={number > 1 ? false : true} className="btn" onClick={e => {
                if (number > 1) {
                  setNumber(number - 1);
                }
              }}>
                <i className="fa-solid fa-minus"></i>
              </button>
              <span>
                {number}
              </span>
              <button className="btn" onClick={e => {
                setNumber(number + 1);
              }}>
                <i className="fa-solid fa-plus"></i>
              </button>
            </div>
            <button className="btn btn-brown" onClick={e => addToCartHandle()}>
              <i className="fa-solid fa-cart-plus"></i>
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

export default Detail