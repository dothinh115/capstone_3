import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendDeleteOrderApi } from "../../redux/reducers/productReducer";

const OrderHistory = () => {
  const { userData } = useSelector((store) => store.userData);
  const [seeAll, setSeeAll] = useState(4);
  const [deleting, setDeleting] = useState(null);
  const dispatch = useDispatch();

  const deleteOrderHandle = async (id) => {
    dispatch(sendDeleteOrderApi(id));
    setDeleting(id);
  };

  const seeAllHandle = () => setSeeAll(seeAll + 3);

  useEffect(() => {
    if (userData?.orderHistory) setDeleting(null);
  }, [userData?.ordersHistory]);

  return (
    <>
      {userData?.ordersHistory?.length === 0 ? (
        "Chưa có lịch sử mua hàng!"
      ) : (
        <ul>
          {userData?.ordersHistory?.slice(0, seeAll).map((item, index) => {
            return (
              <li key={index} style={{ opacity: deleting === item.id && ".3" }}>
                <div>
                  <span>
                    <i className="fa-solid fa-turn-down-right"></i>#{item.id}
                  </span>
                </div>
                <div>
                  <button
                    className="btn btn-red"
                    onClick={() => deleteOrderHandle(item.id)}
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </div>
                <ul>
                  <li>
                    <div></div>
                    <div>Tên sản phẩm</div>
                    <div>Đơn giá</div>
                  </li>
                  {item.orderDetail?.map((value, key) => {
                    return (
                      <li key={key}>
                        <div>
                          <img src={value.image} alt="" />
                        </div>
                        <div>{value.name}</div>
                        <div>
                          <i className="fa-solid fa-tag"></i>
                          {value.price}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </li>
            );
          })}
        </ul>
      )}
      {userData?.ordersHistory?.length - seeAll > 0 && (
        <>
          <div className="footer-hr-span">
            <span>
              Còn lại <b>{userData?.ordersHistory?.length - seeAll}</b> đơn hàng
            </span>
            <div>
              <i
                className="fa-solid fa-arrow-down"
                onClick={() => seeAllHandle()}
              ></i>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default OrderHistory;
