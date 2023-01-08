import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLikeByIdApi } from "../../redux/reducers/productReducer";
import { findIfExistedId } from "../../util/function";

const LikeButton = ({ productId }) => {
  const dispatch = useDispatch();
  const { productFavorite } = useSelector((store) => store.product);

  const likeHandle = () =>
    dispatch(
      setLikeByIdApi(!findIfExistedId(productFavorite, productId), productId)
    );

  return (
    <span className="like" onClick={likeHandle}>
      <i
        className="fa-regular fa-heart"
        style={{
          fontWeight: findIfExistedId(productFavorite, productId) && "bold",
        }}
      ></i>
      Like
    </span>
  );
};

export default LikeButton;
