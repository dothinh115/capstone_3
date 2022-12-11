import React, { useEffect, useState } from 'react'
import { memo } from 'react';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import "../assets/css/carousel.css";
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Carousel = () => {
  const indexData = useSelector(store => store.data);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  return (
    <Slider {...settings}>
      {indexData.length !== 0 && indexData?.map((item, index) => {
        return (
          <div key={index} className="slider-item">
            <div className="slider-item-left">
              <div className="slider-item-left-inner">
                <Link to={`/detail/${item.id}`}>
                  <img src={item.image} alt="" />
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
                  <i className="fa-solid fa-arrow-right"></i>
                  ${item.price}
                </li>
              </ul>
            </div>
          </div>
        )
      })}
    </Slider>
  )
}

export default memo(Carousel)