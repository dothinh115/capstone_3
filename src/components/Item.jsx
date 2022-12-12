import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { memo } from 'react'
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/actions/dataActions';

const Item = ({ item }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const addToCartHandle = () => {
        const payload = {
            ...item,
            quantity: 1,
            checked: false
        }
        const action = addToCart(payload);
        dispatch(action);
    }
    return (
        <div className="card-item">
            <div className="card-item-inner">
                <div className="card-img">
                    <Link to={`/detail/${item.id}`}>
                        <img src={item.image} alt="" />
                    </Link>
                </div>
                <div className="card-body">
                    <h3 className="">
                        <Link to={`/detail/${item.id}`}>
                            {item.name.length > 20 ? item.name.substr(0, 20) + "..." : item.name}
                        </Link>
                    </h3>
                    <p>
                        {item.description.length > 90 ? item.description.substr(0, 89) + "..." : item.description}
                    </p>
                </div>
                <div className="card-footer">
                    <div className="footer-left" onClick={async e => {
                        await addToCartHandle();
                        navigate("/cart");
                    }}>
                        <i className="fa-solid fa-cart-shopping"></i>
                        Buy Now
                    </div>
                    <div className="footer-right">
                        <i className="fa-sharp fa-solid fa-tag"></i>
                        ${item.price}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default memo(Item)