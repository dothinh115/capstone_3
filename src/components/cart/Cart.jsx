import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  addToCart,
  checkAll,
  checkItem,
  deleteCartItem,
  sendOrderApi,
} from "../../redux/reducers/cartReducer";
import { getEmail } from "../../util/function";
import MainBlock from "../others/MainBlock";
import OrderHistory from "../profile/OrderHistory";

const Cart = () => {
  const dispatch = useDispatch();
  const { cartData, loading } = useSelector((store) => store.cart);
  const [checkoutRes, setCheckoutRes] = useState(false);
  const [error, setError] = useState("");

  const quantityUpdateHandle = (id, quantity) => {
    const payload = {
      id,
      quantity,
    };
    dispatch(addToCart(payload));
  };

  const deleteHandle = (id) => dispatch(deleteCartItem(id));

  const checkboxHandle = (id) => dispatch(checkItem(id));

  const totalCounting = () => {
    let total = 0;
    for (let key in cartData) {
      if (cartData[key].checked === true)
        total += cartData[key].price * cartData[key].quantity;
    }
    return total;
  };

  const cartItemsCounting = () => {
    let total = 0;
    for (let key in cartData) {
      if (cartData[key].checked === true) total += cartData[key].quantity;
    }
    return total;
  };

  const checkAllHandle = ({ target: { checked } }) =>
    dispatch(checkAll(checked));

  const findIfCheckAll = () => {
    let result = true;
    for (let value of cartData) {
      if (!value.checked) result &= false;
    }
    return result;
  };

  const sendCheckoutHandle = async (data) => {
    try {
      dispatch(sendOrderApi(data));
    } catch (error) {
      console.log(error);
    }
  };

  const checkOutHandle = (e) => {
    e.preventDefault();
    let checkedItem = {
      orderDetail: [],
      email: getEmail(),
    };
    let deleteItems = [];
    for (let value of cartData) {
      if (value.checked) {
        let item = {
          productId: value.id,
          quantity: value.quantity,
        };
        checkedItem.orderDetail = [...checkedItem.orderDetail, item];
        deleteItems = [...deleteItems, value.id];
      }
    }
    if (checkedItem.orderDetail.length !== 0) {
      sendCheckoutHandle(checkedItem);
      for (let value of deleteItems) {
        deleteHandle(value);
      }
      setCheckoutRes(true);
      setError("");
    } else {
      setCheckoutRes(true);
      setError("Chọn sản phẩm trước khi đặt hàng!");
    }
  };

  const checkIfAnyChecked = () => {
    let res = false;
    for (let value of cartData) {
      if (value.checked) res = true;
    }
    return res;
  };

  const deleteCheckedItem = (e) => {
    e.preventDefault();
    const filter = cartData.filter((item) => item.checked === true);
    for (let value of filter) {
      deleteHandle(value.id);
    }
  };

  return (
    <>
      <MainBlock
        headerValue="GIỎ HÀNG"
        headerRight={
          <button
            className="btn btn-red"
            disabled={checkIfAnyChecked() ? false : true}
            onClick={(e) => deleteCheckedItem(e)}
          >
            <i className="fa-solid fa-trash"></i>
          </button>
        }
        otherClass="cart"
        value={
          <>
            {cartData.length !== 0 ? (
              <>
                <div className="table">
                  <div className="thead">
                    <div className="tr">
                      <div className="th">
                        <input
                          type="checkbox"
                          onChange={(e) => checkAllHandle(e)}
                          checked={findIfCheckAll()}
                        />
                      </div>
                      <div className="th">Tên sản phẩm</div>
                      <div className="th">Số lượng</div>
                      <div className="th">Giá</div>
                    </div>
                  </div>
                  <div className="tbody">
                    {Object.values(cartData)?.map((item, index) => {
                      return (
                        <div key={index} className="tr">
                          <div className="td">
                            <input
                              type="checkbox"
                              onChange={(e) => checkboxHandle(item.id)}
                              checked={item.checked ? true : false}
                            />
                          </div>
                          <div className="td">
                            <Link to={`/detail/${item.id}`}>{item.name}</Link>
                          </div>
                          <div className="td">
                            <button
                              className="btn"
                              onClick={(e) => quantityUpdateHandle(item.id, -1)}
                              disabled={item.quantity <= 1 ? true : false}
                            >
                              <i className="fa-solid fa-minus"></i>
                            </button>
                            {item.quantity}
                            <button
                              className="btn"
                              onClick={(e) => quantityUpdateHandle(item.id, 1)}
                            >
                              <i className="fa-solid fa-plus"></i>
                            </button>
                          </div>
                          <div className="td">
                            <i className="fa-solid fa-tag"></i>
                            {item.price * item.quantity}
                          </div>
                        </div>
                      );
                    })}
                    <div className="tr">
                      <div className="td"></div>
                      <div className="td" style={{ margin: "5px" }}>
                        <h3>Tổng cộng ({cartItemsCounting()} sản phẩm):</h3>
                      </div>
                      <div className="td"></div>
                      <div className="td" style={{ margin: "5px" }}>
                        <h3>
                          <i className="fa-solid fa-tags"></i>
                          {totalCounting()}
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="cart-button">
                  <button className="btn" onClick={(e) => checkOutHandle(e)}>
                    <i
                      className="fa-solid fa-cart-shopping"
                      style={{ marginRight: "10px" }}
                    ></i>
                    Đặt hàng
                  </button>
                </div>
              </>
            ) : (
              <>Chưa có sản phẩm trong giỏ hàng</>
            )}
          </>
        }
      />

      {checkoutRes && !loading && (
        <MainBlock
          value={error ? error : "Đặt hàng thành công"}
          icon={true}
          iconStyle={error ? "circle-exclamation" : "check"}
          iconColor={error ? "red" : "green"}
          style={{ marginTop: "20px" }}
        />
      )}

      {loading ? <div className="loader"></div> : <OrderHistory />}
    </>
  );
};

export default Cart;
