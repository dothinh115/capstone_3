import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getProfileApi } from '../../redux/reducers/userReducer';
import { http } from '../../util/config';

const OrderHistory = () => {
  const { userData } = useSelector(store => store.userData);
  const dispatch = useDispatch();

  const deleteOrderHandle = async (e, id) => {
    await http.post("https://shop.cyberlearn.vn/api/Users/deleteOrder", {"orderId": id});
    const action = await getProfileApi;
    await dispatch(action);
  }

  return (
    <>
      {userData?.ordersHistory.length === 0 ? "Chưa có lịch sử mua hàng!" :
        <ul>
          {userData?.ordersHistory.map((item, index) => {
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