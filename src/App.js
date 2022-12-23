import './assets/css/style.css';
import 'animate.css';
import { BrowserRouter, Navigate, Route, Routes, unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
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
import { getToken } from './util/function';
import { isExpired } from 'react-jwt';
import LoggedInRoute from './hoc/NotLoggedInRoute';
import NotLoggedInRoute from './hoc/LoggedInRoute';

//npm i history => chuyển hướng trang ở file ko phải component
export const history = createBrowserHistory();

function App() {
  let loggedIn = false;
  if (getToken()) {
    const isTokenExpired = isExpired(getToken());
    if (!isTokenExpired) loggedIn = true;
  }

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
