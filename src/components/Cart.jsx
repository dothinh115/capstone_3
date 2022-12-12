import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import useCurrentUserEmail from '../Hooks/useCurrentUserEmail';
import useToken from '../Hooks/useToken'
import { deleteCartItem, loadCartData, quantityUpdate } from '../redux/actions/dataActions';

const Cart = () => {
  const token = useToken();
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const cartData = useSelector(store => store.cart);
  const currentEmail = useCurrentUserEmail();
  const [total, setTotal] = useState(0);
  
  const quantityUpdateHandle = (id, value) => {
    const payload = {
      id,
      value
    }
    const action = quantityUpdate(payload);
    dispatch(action);
  }

  const getCartData = () => {
    let data = localStorage.getItem(`cartData.${currentEmail}`);
    if(data) {
      data = JSON.parse(data);
      const action = loadCartData(data);
      dispatch(action);
    }
  }

  const deleteHandle = id => {
    const action = deleteCartItem(id);
    dispatch(action);
  }

  const checkboxHandle = (e, value) => {
    const {checked} = e.target;
    if(checked) {
      setTotal(total + value);
    }
    else {
      setTotal(total - value);
    }
  }

  useEffect(() => {
    !token && navigate("/login");
    getCartData();
  }, []);
  return (
    <>
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
                <div className="th"></div>
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
                    <input type="checkbox" onChange={e => checkboxHandle(e, item.price * item.quantity)} />
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
                    ${item.price * item.quantity}
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
                <div className="td" style={{margin: "5px"}}>
                    <h3>Tổng cộng:</h3>
                </div>
                <div className="td"></div>
                <div className="td" style={{margin: "5px"}}>
                    <h3>${total}</h3>
                </div>
                <div className="td"></div>
              </div>
            </div>
          </div>
          <div className="cart-button">
            <button className="btn">
              <i className="fa-solid fa-cart-shopping" style={{marginRight: "10px"}}></i>
              Thanh toán
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