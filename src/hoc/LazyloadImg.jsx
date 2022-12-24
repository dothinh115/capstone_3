import React from 'react'
import LazyLoad from 'react-lazyload'

const LazyloadImg = ({url}) => {
  return (
    <LazyLoad throttle={200} offset={100} placeholder={<div style={{height: "300px", display: "flex", alignItems: "center"}}><div className="loader"></div></div>}>
        <img src={url} alt="" />
    </LazyLoad>
  )
}

export default LazyloadImg