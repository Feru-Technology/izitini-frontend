import React from 'react';
import './register.css'
import Submit from './submitButton';
import Input from './inputs';

function Register() {
  return (
    <div className='container'>
      <div className='row justify-content-center align-item-center'>
        <div className='card col-sm-6 p-5 login'>
          <form id='login-form' className='form' action='' method='post'>
            <h3 className='text-center text-info'>Login</h3>
              <Input
              type= 'email'
              title='email'
              />
              <Input
              type= 'password'
              title='password'
              />
            <div className='form-group'>
            <div className="form-check">
              <input  className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
              <label  className="form-check-label" >Remember me </label>
            </div>
              <Submit title='login'/>
            </div>
            <div id='register-link' className='text-right'>
              <a href='#' className='text-info'>
                Register
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
