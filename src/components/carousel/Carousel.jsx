import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../assets/css/carousel.css";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/reducers/cartReducer";
import LazyloadImg from "../../hoc/LazyloadImg";

const Carousel = () => {
  const { productRandomCarousel } = useSelector((store) => store.product);
  const dispatch = useDispatch();

  const addToCartHandle = (item) => {
    const payload = {
      ...item,
      quantity: 1,
    };
    dispatch(addToCart(payload));
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  useEffect(() => {
    console.log("carousel");
  });

  return (
    <Slider {...settings}>
      {productRandomCarousel?.map((item, index) => {
        return (
          <div key={index} className="slider-item">
            <div className="slider-item-left">
              <div className="slider-item-left-inner">
                <Link to={`/detail/${item.id}`}>
                  <LazyloadImg url={item.image} />
                </Link>
              </div>
            </div>
            <div className="slider-item-right">
              <ul>
                <li>
                  <Link to={`/detail/${item.id}`}>
                    <i className="fa-solid fa-star"></i>
                    {item.name}
                  </Link>
                </li>
                <li>
                  <i className="fa-solid fa-arrow-right"></i>
                  {item.shortDescription}
                </li>
                <li>
                  <i className="fa-solid fa-arrow-right"></i>${item.price}
                </li>
              </ul>
              <button
                className="btn btn-brown"
                onClick={() => addToCartHandle(item)}
              >
                <i className="fa-solid fa-cart-plus"></i>
                Thêm vào giỏ hàng
              </button>
            </div>
          </div>
        );
      })}
    </Slider>
  );
};

export default Carousel;
