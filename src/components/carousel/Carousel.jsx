import React from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../assets/css/carousel.css";
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../redux/reducers/cartReducer';
import LazyloadImg from '../../hoc/LazyloadImg';

const Carousel = () => {
  const { productData } = useSelector(store => store.product);
  const dispatch = useDispatch();

  const addToCartHandle = item => {
    const payload = {
      ...item,
      quantity: 1,
      checked: false
    }
    dispatch(addToCart(payload));
  }

  const suffleArray = (arr, number) => {
    //copy từ redux ra mảng mới
    arr = [...arr];
    let randomIndex;
    //currentIndex số phần tử trong mảng
    let currentIndex = arr.length;
    //trong khi vẫn còn phần tử trong mảng, chạy vòng lặp
    while (currentIndex !== 0) {
      //chọn random vị trí 1 phần tử trong mảng, ví dụ randomIndex = 1
      randomIndex = Math.floor(Math.random() * currentIndex);
      //trừ số phần tử đi 1
      currentIndex--;
      //tiến hành đảo phần tử cuối với phần tử random, ví dụ là arr[1]
      [arr[currentIndex], arr[randomIndex]] = [arr[randomIndex], arr[currentIndex]];
    }
    return arr.slice(0, number);
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
      {productData.length !== 0 && suffleArray(productData, 5)?.map((item, index) => {
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
                  <i className="fa-solid fa-arrow-right"></i>
                  ${item.price}
                </li>
              </ul>
              <button className="btn btn-brown" onClick={() => addToCartHandle(item)}>
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