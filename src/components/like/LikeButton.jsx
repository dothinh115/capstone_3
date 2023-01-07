import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLikeByIdApi } from "../../redux/reducers/productReducer";

const LikeButton = ({ productId }) => {
  const dispatch = useDispatch();
  const { productFavorite } = useSelector((store) => store.product);

  const findIfLiked = () => {
    const find = productFavorite.find((item) => item.id === productId);
    if (find) return true;
    return false;
  };

  const likeHandle = () => {
    dispatch(setLikeByIdApi(!findIfLiked(), productId));
  };

  return (
    <span className="like" onClick={() => likeHandle()}>
      <i
        className="fa-regular fa-heart"
        style={{ fontWeight: findIfLiked() && "bold" }}
      ></i>
      Like
    </span>
  );
};

export default LikeButton;
