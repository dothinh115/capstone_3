import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { needLoginToViewSth } from "../util/config";

const NotLoggedInRoute = ({ loggedIn }) => {
  const location = useLocation();
  if (!loggedIn)
    return (
      <Navigate
        to="/login"
        state={{
          needLoginMessage: needLoginToViewSth,
          page: location.pathname,
        }}
      />
    );
  return <Outlet />;
};

export default NotLoggedInRoute;
