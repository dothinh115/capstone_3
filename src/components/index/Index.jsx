import React from "react";
import Carousel from "../carousel/Carousel";
import Item from "../item/Item";
import { useSelector } from "react-redux";
import MainBlock from "../others/MainBlock";

const Index = () => {
  const { productData } = useSelector((store) => store.product);

  return (
    <>
      <MainBlock
        headerValue="CÓ THỂ BẠN THÍCH"
        otherClass="index-carousel"
        value={<Carousel />}
      />

      <MainBlock
        headerValue="SẢN PHẨM"
        otherClass="index-container"
        value={
          <div className="card">
            {productData?.map((item, index) => {
              return <Item item={item} key={index} />;
            })}
          </div>
        }
      />
    </>
  );
};

export default Index;
