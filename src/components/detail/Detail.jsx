import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Item from "../item/Item";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/reducers/cartReducer";
import { getProductByIdApi } from "../../redux/reducers/productReducer";
import LazyloadImg from "../../hoc/LazyloadImg";
import MainBlock from "../others/MainBlock";
import LikeButton from "../like/LikeButton";

const Detail = () => {
  const { productDetail, productDetailLoading } = useSelector(
    (store) => store.product
  );
  const dispatch = useDispatch();
  const { productId } = useParams();
  const [number, setNumber] = useState(1);

  const getProductById = () => dispatch(getProductByIdApi(productId));

  const addToCartHandle = () => {
    const payload = {
      ...productDetail,
      quantity: number,
    };
    dispatch(addToCart(payload));
  };

  useEffect(() => {
    getProductById();
    setNumber(1);
  }, [productId]);

  return productDetailLoading ? (
    <div style={{ height: "300px", display: "flex", alignItems: "center" }}>
      <div className="loader"></div>
    </div>
  ) : (
    <>
      <MainBlock
        headerValue={productDetail?.name}
        otherClass="detail-container"
        value={
          <div className="detail-body">
            <div className="detail-body-left">
              <LazyloadImg url={productDetail?.image} />
            </div>
            <div className="detail-body-right">
              <p>{productDetail?.description}</p>
              <p className="price-layout">
                <span className="price">
                  <i className="fa-solid fa-tag"></i>${productDetail?.price}
                </span>
                <LikeButton productId={Number(productId)} />
              </p>
              <h1>Size có sẵn</h1>
              <div className="detail-body-size">
                <ul>
                  {productDetail?.size?.map((item, index) => {
                    return <li key={index}>{item}</li>;
                  })}
                </ul>
              </div>
              <div className="detail-body-number">
                <div className="detail-body-number-left">
                  <button
                    disabled={number > 1 ? false : true}
                    className="btn"
                    onClick={(e) => {
                      if (number > 1) {
                        setNumber(number - 1);
                      }
                    }}
                  >
                    <i className="fa-solid fa-minus"></i>
                  </button>
                  <span>{number}</span>
                  <button
                    className="btn"
                    onClick={(e) => {
                      setNumber(number + 1);
                    }}
                  >
                    <i className="fa-solid fa-plus"></i>
                  </button>
                </div>
                <div className="detail-body-number-right">
                  <button
                    className="btn btn-brown"
                    onClick={(e) => addToCartHandle()}
                  >
                    <i className="fa-solid fa-cart-plus"></i>
                    Thêm vào giỏ
                  </button>
                </div>
              </div>
              <div className="detail-body-sold">
                Đã bán: <b>{productDetail.quantity}</b>
              </div>
            </div>
          </div>
        }
      />

      <MainBlock
        headerValue="SẢN PHẨM TƯƠNG TỰ"
        otherClass="related-product"
        value={
          <>
            <div className="card">
              {productDetail?.relatedProducts?.map((item, index) => {
                return <Item item={item} key={index} />;
              })}
            </div>
          </>
        }
      />
    </>
  );
};

export default Detail;
