import React from 'react'
import Carousel from '../carousel/Carousel'
import Item from '../item/Item';
import { useSelector } from 'react-redux';

const Index = () => {
  const { productData } = useSelector(store => store.product);
  
  return (
    <>
      <div className="index-carousel main-container">
        <div className="page-header">
          <h1> 
            CÓ THỂ BẠN THÍCH
          </h1>
        </div>
        <Carousel />
      </div>

      <div className="index-container main-container">
        <div className="page-header">
          <h1>
            SẢN PHẨM
          </h1>
        </div>
        <div className="index-body main-body">
          <div className="card">
            {productData?.map((item, index) => {
              return <Item item={item} key={index} />
            })}
          </div>
        </div>
      </div>
    </>
  )
}

export default Index