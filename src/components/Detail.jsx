import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'

const Detail = () => {

  const [productInfo, setProductInfo] = useState({});

  const { productId } = useParams();

  const [number, setNumber] = useState(1);

  const navigate = useNavigate();

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

  useEffect(() => {
    fetchData();
  }, [productId]);

  return (
    <>
      <div className="detail-container">
        <div className="page-header">
          <button className="btn" onClick={e => navigate(-1)}>
            Quay lại
          </button>
          <h1>
            {productInfo.name} - <span>${productInfo.price}</span>
          </h1>
        </div>
        <div className="detail-body">
          <div className="detail-body-left">
            <img src={productInfo.image} alt="" />
          </div>
          <div className="detail-body-right">
            <p>
              {productInfo.description}
            </p>
            <h1>
              Available size
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
              ADD TO CART
            </button>
          </div>
        </div>
      </div>

      <div className="related-product">
          <div className="page-header">
            <h1>
              Related products
            </h1>
          </div>
          <div className="related-product-body">
            <div className="card">
              {productInfo.relatedProducts?.map((item, index) => {
                return (
                  <div key={index} className="card-item">
                    <div className="card-item-inner">
                      <div className="card-img">
                        <NavLink to={`/detail/${item.id}`}>
                          <img src={item.image} alt="" />
                        </NavLink>
                      </div>
                      <div className="card-body">
                        <h3 className="">
                          <NavLink to={`/detail/${item.id}`}>
                            {item.name.length > 20 ? item.name.substr(0, 20) + "..." : item.name}
                          </NavLink>
                        </h3>
                        <p>
                          {item.description.length > 90 ? item.description.substr(0, 89) + "..." : item.description}
                        </p>
                      </div>
                      <div className="card-footer">
                        <div className="footer-left">
                          Buy Now
                        </div>
                        <div className="footer-right">
                          ${item.price}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
      </div>
    </>
  )
}

export default Detail