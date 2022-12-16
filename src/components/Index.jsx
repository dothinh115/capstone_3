import React, { useEffect } from 'react'
import Carousel from './Carousel'
import Item from './Item';
import { useSelector } from 'react-redux';
import useCheckToken from '../Hooks/useCheckToken';

const Index = () => {
  const indexData = useSelector(store => store.data);
  const checkToken = useCheckToken();
  useEffect(() => {
    checkToken();
  }, []);
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
            {indexData?.map((item, index) => {
              return <Item item={item} key={index} />
            })}
          </div>
        </div>
      </div>
    </>
  )
}

export default Index