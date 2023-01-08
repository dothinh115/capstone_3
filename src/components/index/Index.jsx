import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AllShoes from "../allshoes/AllShoes";
import Carousel from "../carousel/Carousel";
import MainBlock from "../others/MainBlock";

const Index = () => {
  const { productData } = useSelector((store) => store.product);
  const navigate = useNavigate();
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
        value={<AllShoes productData={productData.slice(0, 6)} />}
        hrFooterTitle={`Còn lại ${productData?.length - 6} sản phẩm`}
        hrFooterValue={
          <button className="btn" onClick={() => navigate("/all")}>
            Xem tất cả
          </button>
        }
      />
    </>
  );
};

export default Index;
