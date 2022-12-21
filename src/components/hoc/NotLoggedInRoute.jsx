import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const NotLoggedInRoute = ({ loggedIn }) => {
  if (!loggedIn) {
    return <Navigate to="/login" state={{needLoginMessage: true}} replace  />
  }

  return <Outlet />
}

export default NotLoggedInRoute