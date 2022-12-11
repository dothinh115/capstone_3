import React from 'react'
import { Link } from 'react-router-dom'
import { memo } from 'react'

const Item = ({item}) => {
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
            <div className="footer-left">
            Buy Now
            </div>
            <div className="footer-right">
            ${item.price}
            </div>
        </div>
        </div>
    </div>
  )
}

export default memo(Item)