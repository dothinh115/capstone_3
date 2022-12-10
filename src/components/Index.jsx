import React, { useEffect, useState } from 'react'
import Carousel from './Carousel'
import axios from 'axios'
import { Link } from 'react-router-dom';

const Index = () => {

  const [indexData, setIndexData] = useState([]);

  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const fetch = await axios({
        url: "https://shop.cyberlearn.vn/api/Product",
        method: "GET",
        dataType: "application/json"
      });
      setIndexData(fetch.data.content);
    } 
    catch (error) {
      console.log(error);
    }
    finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="index-carousel">
        <div className="page-header">
          <h1>
            SPECIALS PRODUCTS
          </h1>
        </div>
        <Carousel />
      </div>
      <div className="index-container">
        <div className="page-header">
          <h1>
            PRODUCT FEATURE {loading && "[loading]"}
          </h1>
        </div>
        <div className="index-body">
          <div className="card">
            {indexData.map((item, index) => {
              return (
                <div key={index} className="card-item">
                  <div className="card-item-inner">
                    <div className="card-img">
                      <Link to={`/detail/${item.id}`}>
                        <img src={item.image} alt="" />
                      </Link>
                    </div>
                    <div className="card-body">
                      <h3 className="">
                        <Link to={`/detail/${item.id}`}>
                          {item.name.length > 20 ? item.name.substr(0, 20) + "..." : item.name}
                        </Link>
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

export default Index