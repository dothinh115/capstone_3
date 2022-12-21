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

//npm i history => chuyển hướng trang ở file ko phải component
export const history = createBrowserHistory();

function App() {
  let LoggedIn = false;
  if (getToken()) {
    const isTokenExpired = isExpired(getToken());
    if (!isTokenExpired) LoggedIn = true;
  }

  return (
    <HistoryRouter history={history}>
      <Routes>
        <Route path='/' element={<Homtemplate />} >
          <Route index element={<Index />} />
          <Route path='/register' element={!LoggedIn ? <Register /> : <Navigate to="/" />} />
          <Route path='/login' element={!LoggedIn ? <Login /> : <Navigate to="/" />} />
          <Route path='/search' element={<Search />} />
          <Route path='/detail/:productId' element={<Detail />} />
          <Route path='/cart' element={LoggedIn ? <Cart /> : <Navigate to="/login" />} />
          <Route path='/profile' element={LoggedIn ? <Profile /> : <Navigate to="/login" />}>
            <Route path='/profile/edit' element={<Edit />} />
          </Route>
          <Route path='*' element={<Navigate to='/' />} />
        </Route>
      </Routes>
    </HistoryRouter>
  );
}

export default App;
