import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const NotLoggedInRoute = ({ loggedIn }) => {
  if (!loggedIn) {
    return <Navigate to="/login" />
  }

  return <Outlet />
}

export default NotLoggedInRoute