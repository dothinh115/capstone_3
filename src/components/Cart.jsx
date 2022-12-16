import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import useToken from '../Hooks/useToken'
import useUpdateUser from '../Hooks/useUpdateUser';
import { deleteCartItem, quantityUpdate, setAll, setChecked, updateOrderHistory } from '../redux/actions/dataActions';

const Cart = () => {
  const token = useToken();
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const cartData = useSelector(store => store.cart);
  const [checkoutRes, setCheckoutRes] = useState(false);
  const [error, setError] = useState("");
  const updateUser = useUpdateUser();

  const quantityUpdateHandle = (id, value) => {
    const payload = {
      id,
      value
    }
    const action = quantityUpdate(payload);
    dispatch(action);
  }

  const deleteHandle = id => {
    const action = deleteCartItem(id);
    dispatch(action);
  }

  const checkboxHandle = id => {
    const action = setChecked(id);
    dispatch(action);
  }

  const totalCounting = () => {
    let total = 0;
    for (let key in cartData) {
      if (cartData[key].checked === true) total += cartData[key].price * cartData[key].quantity;
    }
    return total;
  }

  const cartItemsCounting = () => {
    let total = 0;
    for (let key in cartData) {
      if (cartData[key].checked === true) total += cartData[key].quantity;
    }
    return total;
  }

  const checkAllHandle = e => {
    const {checked} = e.target;
    const action = setAll(checked);
    dispatch(action);
  }

  const findIfCheckAll = () => {
    let result = true;
    for (let value of cartData) {
      if(!value.checked) result &= false;
    }
    return result;
  }

  const checkOutHandle = e => {
    e.preventDefault();
    let checkedItem = [];
    for(let key in cartData) {
      if(cartData[key].checked) checkedItem = [...checkedItem, cartData[key]];
    }
    if(checkedItem.length !== 0) {
      const action = updateOrderHistory(checkedItem);
      dispatch(action);
      for (let value of checkedItem) {
        const action = deleteCartItem(value.id);
        dispatch(action);
      }
      setCheckoutRes(true);
      setError("");
    } 
    else {
      setCheckoutRes(true);
      setError("Chọn sản phẩm trước khi đặt hàng");
    }
  }

  useEffect(() => {
    !token && navigate("/login");
    updateUser();
  }, []);
  return (
    <>
      {checkoutRes && <div className="main-container" style={{marginBottom: "20px"}}>
        <div className="page-header">
          {error ? error : 
          <>
            Đặt hàng thành công, <Link className="alert-link" to="/profile">xem lịch sử đặt hàng</Link>.
          </>}
        </div>
      </div>}
      
      <div className="main-container">
        <div className="page-header">
          <h1>
            GIỎ HÀNG
          </h1>
        </div>
        <div className="main-body cart">
          {cartData.length !== 0 ?
            <>
              <div className="table">
                <div className="thead">
                  <div className="tr">
                    <div className="th"><input type="checkbox" onChange={e => checkAllHandle(e)} checked={findIfCheckAll()} /></div>
                    <div className="th">Tên sản phẩm</div>
                    <div className="th">Số lượng</div>
                    <div className="th">Giá</div>
                    <div className="th">Thao tác</div>
                  </div>
                </div>
                <div className="tbody">
                  {Object.values(cartData)?.map((item, index) => {
                    return (<div key={index} className="tr">
                      <div className="td">
                        <input type="checkbox" onChange={e => checkboxHandle(item.id)} checked={item.checked ? true : false} />
                      </div>
                      <div className="td">
                        <Link to={`/detail/${item.id}`}>
                          {item.name}
                        </Link>
                      </div>
                      <div className="td">
                        <button className="btn" onClick={e => quantityUpdateHandle(item.id, -1)} disabled={item.quantity <= 1 ? true : false}>
                          <i className="fa-solid fa-minus"></i>
                        </button>
                        {item.quantity}
                        <button className="btn" onClick={e => quantityUpdateHandle(item.id, 1)}>
                          <i className="fa-solid fa-plus"></i>
                        </button>
                      </div>
                      <div className="td">
                        <i className="fa-solid fa-tag"></i>
                        {item.price * item.quantity}
                      </div>
                      <div className="td">
                        <button className="btn btn-red" onClick={e => deleteHandle(item.id)}>
                          <i className="fa-solid fa-trash"></i>
                        </button>
                      </div>
                    </div>
                    )
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
                    <div className="td"></div>
                  </div>
                </div>
              </div>
              <div className="cart-button">
                <button className="btn" onClick={e => checkOutHandle(e)}>
                  <i className="fa-solid fa-cart-shopping" style={{ marginRight: "10px" }}></i>
                  Đặt hàng
                </button>
              </div>
            </> :
            <>
              Chưa có sản phẩm trong giỏ hàng
            </>}

        </div>
      </div>
    </>
  )
}

export default Cart