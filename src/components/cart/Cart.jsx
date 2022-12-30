import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import {
  addToCart,
  checkAll,
  checkItem,
  deleteCartItem,
  sendOrderApi,
} from "../../redux/reducers/cartReducer";
import { getEmail } from "../../util/function";
import OrderHistory from "../profile/OrderHistory";

const Cart = () => {
  const dispatch = useDispatch();
  const { cartData } = useSelector((store) => store.cart);
  const [checkoutRes, setCheckoutRes] = useState(false);
  const [error, setError] = useState("");
  const { state } = useLocation();
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    try {
      await dispatch(sendOrderApi(data));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
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

  useEffect(() => {
    if (state?.justAddId) window.scrollTo({ top: 0, behavior: "smooth" });
  }, [state]);

  return (
    <>
      <div className="main-container cart">
        <div className="page-header">
          <h1>GIỎ HÀNG</h1>
          <button
            className="btn btn-red"
            disabled={checkIfAnyChecked() ? false : true}
            onClick={(e) => deleteCheckedItem(e)}
          >
            <i className="fa-solid fa-trash"></i>
          </button>
        </div>
        <div className="main-body">
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
                      <div
                        key={index}
                        className={`tr ${
                          state?.justAddId === item.id ? "active" : ""
                        }`}
                      >
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
        </div>
      </div>

      {checkoutRes && !loading && (
        <div className="main-container" style={{ margin: "20px 0" }}>
          <div className="page-header">
            {error ? (
              <>
                <i
                  className="fa-solid fa-circle-exclamation"
                  style={{ color: "red" }}
                ></i>{" "}
                {error}
              </>
            ) : (
              <>
                <i className="fa-solid fa-check" style={{ color: "green" }}></i>
                Đặt hàng thành công.
              </>
            )}
          </div>
        </div>
      )}

      {loading && <div className="loader"></div>}
      <div
        className="main-container order-history"
        style={{ marginTop: "20px" }}
      >
        <div className="page-header">
          <h1>LỊCH SỬ MUA HÀNG</h1>
        </div>
        <div className="main-body">
          <OrderHistory />
        </div>
      </div>
    </>
  );
};

export default Cart;
