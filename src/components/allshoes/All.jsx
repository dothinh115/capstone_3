import React from "react";
import { useSelector } from "react-redux";
import MainBlock from "../others/MainBlock";
import AllShoes from "./AllShoes";

const All = () => {
  const { productData } = useSelector((store) => store.product);

  return (
    <MainBlock
      headerValue="SẢN PHẨM"
      otherClass="index-container"
      value={<AllShoes productData={productData} />}
    />
  );
};

export default All;
