import React from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../assets/css/carousel.css";
import Slider from 'react-slick';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import useToken from '../../hooks/useToken';
import { addToCart } from '../../redux/reducers/cartReducer';

const Carousel = () => {
  const {productData} = useSelector(store => store.product);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useToken();

  const addToCartHandle = item => {
    const payload = {
      ...item,
      quantity: 1,
      checked: false
    }
    const action = addToCart(payload);
    if(token) dispatch(action);
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  return (
    <Slider {...settings}>
      {productData.length !== 0 && productData?.map((item, index) => {
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
              <button className="btn btn-brown" onClick={async e => {
                await addToCartHandle(item);
                navigate("/cart");
              }}>
                <i className="fa-solid fa-cart-plus"></i>
                Thêm vào giỏ hàng
              </button>
            </div>
          </div>
        )
      })}
    </Slider>
  )
}

export default Carousel