import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import reportWebVitals from './reportWebVitals';
import Login from './components/auth/login';
import Register from './components/auth/register'

ReactDOM.render(
  <React.StrictMode>
    <Register />

    <Login />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
