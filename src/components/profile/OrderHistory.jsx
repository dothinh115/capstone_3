import axios from 'axios';
import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import useToken from '../../hooks/useToken';
import { getProfileApi } from '../../redux/reducers/userReducer';

const OrderHistory = () => {
  const {userData : {ordersHistory}} = useSelector(store => store.userData);
  const token = useToken();
  const dispatch = useDispatch();

  const deleteOrderHandle = async (e, id) => {
    try {
      await axios({
        url: "https://shop.cyberlearn.vn/api/Users/deleteOrder",
        method: "POST",
        dataType: "application/json",
        data: {
          "orderId": id
        },
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      const action = await getProfileApi(token);
      await dispatch(action);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
    {ordersHistory?.length === 0 ? "Chưa có lịch sử mua hàng!" :
      <ul>
        {ordersHistory?.map((item, index) => {
          return (
            <li key={index}>
              <div>
                <span>
                <i className="fa-solid fa-turn-down-right"></i>
                  #{item.id}
                </span>
              </div>
              <div>
                <button className="btn btn-red" onClick={e => deleteOrderHandle(e, item.id)}>
                  <i className="fa-solid fa-trash"></i>
                </button>
              </div>
              <ul>
                <li>
                  <div>
                    
                  </div>
                  <div>
                    Tên sản phẩm
                  </div>
                  <div>
                    Đơn giá
                  </div>
                </li>
                {item.orderDetail?.map((value, key) => {
                  return (
                    <li key={key}>
                      <div>
                        <img src={value.image} alt="" />
                      </div>
                      <div>
                        {value.name}
                      </div>
                      <div>
                      <i className="fa-solid fa-tag"></i>
                        {value.price}
                      </div>
                    </li>
                  )
                })}
              </ul>
            </li>
          )
        })}
      </ul>}
    </>
  )
}

export default OrderHistory