import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const NotLoggedInRoute = ({ loggedIn }) => {
  if (!loggedIn) {
    return <Navigate to="/login" state={{needLoginMessage: "Bạn cần đăng nhập để truy cập trang này!", page: window.location.pathname}} />
  }

  return <Outlet />
}

export default NotLoggedInRoute