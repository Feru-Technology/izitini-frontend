import React from 'react';
import './register.css'
import Submit from './submitButton';

function Register() {
  return (
    <div className='container'>
      <div className='row justify-content-center align-item-center'>
        <div className='card col-sm-6 login'>
          <form id='login-form' className='form' action='' method='post'>
            <h3 className='text-center text-info'>Login</h3>
            <div className='form-group'>
              <label className='text-info'>Username:</label> <br />
              <input
                type='text'
                name='username'
                id='username'
                className='form-control'
              />
            </div>
            <div className='form-group'>
              <label className='text-info'>Password:</label>
              <br />
              <input
                type='text'
                name='password'
                id='password'
                className='form-control'
              />
            </div>
            <div className='form-group'>
              <label className='text-info'>
                <span>Remember me</span>
                <span>
                  <input id='remember-me' name='remember-me' type='checkbox' />
                </span>
              </label>{' '}
              <br />
              <Submit/>
            </div>
            <div id='register-link' className='text-right'>
              <a href='#' className='text-info'>
                Register here
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
