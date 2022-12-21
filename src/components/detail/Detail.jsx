import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import Item from '../item/Item';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../redux/reducers/cartReducer';
import { findIfLikeApi, getProductByIdApi, setLikeByIdApi } from '../../redux/reducers/productReducer';
import { getProfileApi } from '../../redux/reducers/userReducer';

const Detail = () => {
  const { productDetail, ifProductLiked } = useSelector(store => store.product);
  const {userData} = useSelector(store => store.userData);
  const dispatch = useDispatch();
  const { productId } = useParams();
  const [number, setNumber] = useState(1);
  const [addResult, setAddResult] = useState(false);
  const navigate = useNavigate();

  const getProductById = async () => {
    const action = getProductByIdApi(productId);
    dispatch(action);
  }

  const findIfLike = () => {
    const action = findIfLikeApi(productId);
    dispatch(action);
  }

  const likeHandle = e => {
    if(userData) {
      const action = setLikeByIdApi(!ifProductLiked, productId);
      dispatch(action);
    }
    else {
      navigate("/login");
    }
  }

  const addToCartHandle = () => {
    const payload = {
      ...productDetail,
      quantity: number,
      checked: false
    }
    const addToCartAction = addToCart(payload);
    dispatch(addToCartAction);
    const getProfileAction = getProfileApi;
    dispatch(getProfileAction);
    setAddResult(true);
  }

  useEffect(() => {
    if (userData) findIfLike();
  }, [userData]);

  useEffect(() => {
    getProductById();
    setNumber(1);
    if (userData) findIfLike();
  }, [productId]);

  return (
    <>
      <div className="detail-container main-container">
        <div className="page-header">
          <h1>
            {productDetail?.name}
          </h1>
        </div>
        <div className="detail-body main-body">
          <div className="detail-body-left">
            <img src={productDetail?.image} alt="" />
          </div>
          <div className="detail-body-right">
            <p>
              {productDetail?.description}
            </p>
            <p className="price-layout">
              <span className="price">
                <i className="fa-solid fa-tag"></i>
                ${productDetail?.price}
              </span>
              <span className="detail-like" onClick={e => likeHandle(e)}>
                <i className="fa-regular fa-heart" style={{ fontWeight: ifProductLiked && "bold" }}></i>
                Like
              </span>
            </p>
            <h1>
              Size có sẵn
            </h1>
            <div className="detail-body-size">
              <ul>
                {productDetail?.size?.map((item, index) => {
                  return <li key={index}>{item}</li>
                })}
              </ul>
            </div>
            <div className="detail-body-number">
              <div className="detail-body-number-left">
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
              <div className="detail-body-number-right">
                <button className="btn btn-brown" onClick={e => addToCartHandle()}>
                  <i className="fa-solid fa-cart-plus"></i>
                  Thêm vào giỏ
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {addResult && <div className="main-container" style={{ margin: "20px 0" }}>
        <div className="page-header">
          Thêm giỏ hàng thành công, <Link to="/cart" className="alert-link">xem giỏ hàng</Link>.
        </div>
      </div>}

      <div className="related-product main-container">
        <div className="page-header">
          <h1>
            Sản phẩm tương tự
          </h1>
        </div>
        <div className="related-product-body">
          <div className="card">
            {productDetail?.relatedProducts?.map((item, index) => {
              return <Item item={item} key={index} />
            })}
          </div>
        </div>
      </div>
    </>
  )
}

export default Detail