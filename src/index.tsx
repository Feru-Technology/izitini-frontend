import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import 'bootstrap/dist/css/bootstrap.css';
import { Link, BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './components/home-page/home';
import LoginPage from './components/auth/login';
import RegisterPage from './components/auth/register'

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>

  </BrowserRouter>,
  document.getElementById('root')
);
