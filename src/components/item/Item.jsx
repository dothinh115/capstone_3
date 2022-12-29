import React from "react";
import { Link } from "react-router-dom";
import { memo } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/reducers/cartReducer";
import LazyloadImg from "../../hoc/LazyloadImg";

const Item = ({ item }) => {
  const dispatch = useDispatch();

  const addToCartHandle = (item) => {
    const payload = {
      ...item,
      quantity: 1,
    };
    dispatch(addToCart(payload));
  };
  return (
    <div className="card-item">
      <div className="card-item-inner">
        <div className="card-img">
          <Link to={`/detail/${item.id}`}>
            <LazyloadImg url={item.image} />
          </Link>
        </div>
        <div className="card-body">
          <h3 className="">
            <Link to={`/detail/${item.id}`}>
              {item.name.length > 20
                ? item.name.substr(0, 20) + "..."
                : item.name}
            </Link>
          </h3>
          <p>
            {item.description.length > 90
              ? item.description.substr(0, 89) + "..."
              : item.description}
          </p>
          {item.quantity && (
            <>
              <p
                style={{
                  fontSize: "13px",
                  textAlign: "right",
                  padding: "0 10px",
                  opacity: ".8",
                }}
              >
                Đã bán: {item.quantity}
              </p>
            </>
          )}
        </div>
        <div className="card-footer">
          <div className="footer-left" onClick={() => addToCartHandle(item)}>
            <i className="fa-solid fa-cart-shopping"></i>
            Mua ngay
          </div>
          <div className="footer-right">
            <i className="fa-sharp fa-solid fa-tag"></i>${item.price}
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Item);
