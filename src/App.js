import "./assets/css/style.css";
import {
  Navigate,
  Route,
  Routes,
  unstable_HistoryRouter as HistoryRouter,
} from "react-router-dom";
import Homtemplate from "./templates/homeTemplate/Homtemplate";
import Index from "./components/index/Index";
import { createBrowserHistory } from "history";
import LoggedInRoute from "./hoc/NotLoggedInRoute";
import NotLoggedInRoute from "./hoc/LoggedInRoute";
import React, { Suspense, lazy, useEffect } from "react";
import useToken from "./hooks/useToken";

//npm i history => chuyển hướng trang ở file ko phải component
export const history = createBrowserHistory();

function App() {
  const { token } = useToken();

  const Search = lazy(() => import("./components/search/Search"));
  const Detail = lazy(() => import("./components/detail/Detail"));
  const Register = lazy(() => import("./components/register/Register"));
  const Login = lazy(() => import("./components/login/Login"));
  const Cart = lazy(() => import("./components/cart/Cart"));
  const Profile = lazy(() => import("./components/profile/Profile"));
  const ProfileEdit = lazy(() => import("./components/profile/ProfileEdit"));
  const PasswordEdit = lazy(() => import("./components/profile/PasswordEdit"));

  return (
    <HistoryRouter history={history}>
      <Routes>
        <Route path="/" element={<Homtemplate loggedIn={token} />}>
          <Route
            index
            element={
              <Suspense fallback={<div className="loader"></div>}>
                <Index />
              </Suspense>
            }
          />
          <Route
            path="/search"
            element={
              <Suspense fallback={<div className="loader"></div>}>
                <Search />
              </Suspense>
            }
          />
          <Route
            path="/detail/:productId"
            element={
              <Suspense fallback={<div className="loader"></div>}>
                <Detail />
              </Suspense>
            }
          />
          <Route element={<NotLoggedInRoute loggedIn={token} />}>
            <Route
              path="/register"
              element={
                <Suspense fallback={<div className="loader"></div>}>
                  <Register />
                </Suspense>
              }
            />
            <Route
              path="/login"
              element={
                <Suspense fallback={<div className="loader"></div>}>
                  <Login />
                </Suspense>
              }
            />
          </Route>
          <Route element={<LoggedInRoute loggedIn={token} />}>
            <Route
              path="/cart"
              element={
                <Suspense fallback={<div className="loader"></div>}>
                  <Cart />
                </Suspense>
              }
            />
            <Route
              path="/profile"
              element={
                <Suspense fallback={<div className="loader"></div>}>
                  <Profile />
                </Suspense>
              }
            >
              <Route
                path="/profile/profile-edit"
                element={
                  <Suspense fallback={<div className="loader"></div>}>
                    <ProfileEdit />
                  </Suspense>
                }
              />
              <Route
                path="/profile/password-edit"
                element={
                  <Suspense fallback={<div className="loader"></div>}>
                    <PasswordEdit />
                  </Suspense>
                }
              />
            </Route>
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </HistoryRouter>
  );
}

export default App;
