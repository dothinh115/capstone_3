import './assets/css/style.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Homtemplate from './templates/Homtemplate';
import Index from './components/Index';
import Register from './components/Register';
import Login from './components/Login';
import Detail from './components/Detail';
import Search from './components/Search';
import Profile from './components/Profile';
import Edit from './components/Edit';

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
          <Route path='/profile/:userId/edit' element={<Edit />} />
          <Route path='/profile/:userId' element={<Profile />} />
          <Route path='*' element={<Navigate to='/' /> } />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
