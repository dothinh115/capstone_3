import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

const NotLoggedInRoute = ({ loggedIn }) => {
  const location = useLocation();
  if (!loggedIn) return <Navigate to="/login" state={{needLoginMessage: "Bạn cần đăng nhập để truy cập trang này!", page: location.pathname}} />
  return <Outlet />
}

export default NotLoggedInRoute