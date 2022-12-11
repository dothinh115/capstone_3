import './assets/css/style.css';
import 'animate.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Homtemplate from './templates/Homtemplate';
import Index from './components/Index';
import Register from './components/Register';
import Login from './components/Login';
import Detail from './components/Detail';
import Search from './components/Search';
import Profile from './components/Profile';
import Edit from './components/Edit';
import Cart from './components/Cart';

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
          <Route path='/profile/edit' element={<Edit />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='*' element={<Navigate to='/' /> } />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
