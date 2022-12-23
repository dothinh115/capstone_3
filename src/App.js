import './assets/css/style.css';
import { Navigate, Route, Routes, unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import Homtemplate from './templates/homeTemplate/Homtemplate';
import Index from './components/index/Index';
import Register from './components/register/Register';
import Login from './components/login/Login';
import Detail from './components/detail/Detail';
import Search from './components/search/Search';
import Cart from './components/cart/Cart';
import Profile from './components/profile/Profile';
import Edit from './components/profile/Edit';
import { createBrowserHistory } from 'history';
import { getEmail, getToken } from './util/function';
import { isExpired } from 'react-jwt';
import LoggedInRoute from './hoc/NotLoggedInRoute';
import NotLoggedInRoute from './hoc/LoggedInRoute';
import useGetProfile from './hooks/useGetProfile';
import useGetCartData from './hooks/useGetCartData';
import useGetAllProduct from './hooks/useGetAllProduct';
import { useEffect, useState } from 'react';

//npm i history => chuyển hướng trang ở file ko phải component
export const history = createBrowserHistory();

function App() {
  const getProfile = useGetProfile();
  const getCartData = useGetCartData();
  const getAllProduct = useGetAllProduct();
  const token = getToken();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (token) {
      const isTokenExpired = isExpired(token);
      if (!isTokenExpired) setLoggedIn(true);
    }
  }, [token]);

  useEffect(() => {
    getAllProduct();
    getCartData(getEmail());
    if (loggedIn) getProfile();
  }, [loggedIn]);

  return (
    <HistoryRouter history={history}>
      <Routes>
        <Route path='/' element={<Homtemplate loggedIn={loggedIn} />} >
          <Route index element={<Index />} />
          <Route path='/search' element={<Search />} />
          <Route path='/detail/:productId' element={<Detail />} />
          <Route element={<NotLoggedInRoute loggedIn={loggedIn} />} >
            <Route path="/register" element={<Register />} />
            <Route path='/login' element={<Login />} />
          </Route>
          <Route element={<LoggedInRoute loggedIn={loggedIn} />}>
            <Route path='/cart' element={<Cart />} />
            <Route path='/profile' element={<Profile />}>
              <Route path='/profile/edit' element={<Edit />} />
            </Route>
          </Route>
          <Route path='*' element={<Navigate to='/' />} />
        </Route>
      </Routes>
    </HistoryRouter>
  );
}

export default App;
