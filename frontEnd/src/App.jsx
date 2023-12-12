import { HashRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
//Assets
import 'bootstrap/dist/css/bootstrap.min.css';

//Website
import Navbar from './components/navbar';
import Home from './components/Home';
import Login from './components/login'
import Register from './components/register';
import Logout from './components/logout';
import ProtectedRoutes from './protectedRoutes';


function App() {
  return (
    <>
    <HashRouter>
      <Navbar />
      <Routes>
          <Route path='/user/register' element={<Register />} />
          <Route path='/user/login' element={<Login />} />
          <Route element={<ProtectedRoutes />}>
            <Route path='/home' element={<Home />} />
            <Route path='/user/logout' element={<Logout />} />
          </Route>
      </Routes>
    </HashRouter>
    </>
  )
}
export default App