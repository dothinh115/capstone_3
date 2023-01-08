import React from "react";
import Item from "../item/Item";

const AllShoes = ({ productData }) => {
  return (
    <div className="card">
      {productData?.map((item, index) => {
        return <Item item={item} key={index} />;
      })}
    </div>
  );
};

export default AllShoes;
