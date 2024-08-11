import { useState } from 'react'
import './App.css'
import 'antd/dist/reset.css'; 
import './index.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home/index.jsx'
import Login from './pages/Login/index.jsx'
import Register from './pages/Register/index.jsx'
import ProtectedRoute from './hoc/ProtectedRoute'
import ForgetPassword from './pages/ForgetPassword'
import ResetPasswordPage from './pages/Reset/index.jsx'
import SingleMovie from './pages/SingleMovie/index.jsx'
import BookShowPage from './pages/BookShow/index.jsx'
export const API_URL = import.meta.env.VITE_API_URL;

function App() {   
  return (
    <div className="App">
      <Navbar/>
        <BrowserRouter>
          <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/register" element={<Register/>}/>
              <Route path="/forget" element={<ForgetPassword/>}/>
              <Route path="/reset" element={<ResetPasswordPage/>}/>
              <Route path="/movie/:id" element={<ProtectedRoute> <SingleMovie/> </ProtectedRoute>}/>
              <Route path="/book-show/:id" element={<ProtectedRoute> <BookShowPage/> </ProtectedRoute>}/>
          </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App
