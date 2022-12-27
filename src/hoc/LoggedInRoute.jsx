import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const LoggedInRoute = ({ loggedIn }) => {
  if (loggedIn) return <Navigate to="/" replace />;

  return <Outlet />;
};

export default LoggedInRoute;
