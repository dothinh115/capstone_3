import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteOrder } from '../../redux/reducers/orderReducer';

const OrderHistory = () => {
  const {orderData} = useSelector(store => store.orderHistory);
  const dispatch = useDispatch();

  const deleteOrderHandle = (e, date) => {
    e.preventDefault();
    const action = deleteOrder(date);
    dispatch(action);
  }

  const totalQuantity = index => {
    let total = 0;
    for (let value of orderData[index].orderDetail) {
      total += value.quantity;
    }
    return total;
  }

  const totalPrice = index => {
    let total = 0;
    for (let value of orderData[index].orderDetail) {
      total += value.quantity * value.price;
    }
    return total;
  }

  return (
    <>
    {orderData.length === 0 ? "Chưa có lịch sử mua hàng!" :
      <ul>
        {orderData?.map((item, index) => {
          return (
            <li key={index}>
              <div>
                <span>
                  <i className="fa-solid fa-calendar-days"></i>
                  {item.date} :
                </span>
              </div>
              <div>
                <button className="btn btn-red" onClick={e => deleteOrderHandle(e, item.date)}>
                  <i className="fa-solid fa-trash"></i>
                </button>
              </div>
              <ul>
                <li>
                  <div>
                    Tên sản phẩm
                  </div>
                  <div>
                    Số lượng
                  </div>
                  <div>
                    Tổng cộng
                  </div>
                </li>
                {item.orderDetail?.map((value, key) => {
                  return (
                    <li key={key}>
                      <div>
                        <i className="fa-solid fa-arrow-right"></i>
                        <Link to={`/detail/${value.id}`}>
                          {value.name}
                        </Link>
                      </div>
                      <div>
                        {value.quantity}
                      </div>
                      <div>
                      <i className="fa-solid fa-tag"></i>
                        {value.quantity * value.price}
                      </div>
                    </li>
                  )
                })}
              </ul>
              <div>
                Tổng cộng ( {totalQuantity(index)} sản phẩm): 
              </div>
              <div>
                <i className="fa-solid fa-tags"></i>
                {totalPrice(index)}
              </div>
            </li>
          )
        })}
      </ul>}
    </>
  )
}

export default OrderHistory