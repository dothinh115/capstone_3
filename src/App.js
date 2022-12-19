import './assets/css/style.css';
import 'animate.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Homtemplate from './templates/homeTemplate/Homtemplate';
import Index from './components/index/Index';
import Register from './components/register/Register';
import Login from './components/login/Login';
import Detail from './components/detail/Detail';
import Search from './components/search/Search';
import Cart from './components/cart/Cart';
import Profile from './components/profile/Profile';
import Edit from './components/profile/Edit';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Homtemplate />} >
          <Route index element={<Index />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/detail/:productId' element={<Detail />} />
          <Route path='/search' element={<Search />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/profile' element={<Profile />}>
            <Route path='/profile/edit' element={<Edit />} />
          </Route>
          <Route path='*' element={<Navigate to='/' /> } />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
