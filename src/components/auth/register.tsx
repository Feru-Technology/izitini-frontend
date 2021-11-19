import React from 'react';
import './register.scss'
import Submit from './submitButton';
import Input from './inputs';
import {Link} from 'react-router-dom';

function Register() {
  return (
    <div className='container'>
      <div className='row justify-content-center align-item-center'>
        <div className='card col-sm-6 p-5 login mt-5'>
          <form id='login-form' className='form' action='' method='post'>
            <h3 className='text-center text-info'>Register</h3>
              <Input
              type= 'text'
              title='full name'
              />
              <Input
              type= 'email'
              title='email'
              />
              <Input
              type= 'number'
              title='contact'
              />
              <Input
              type= 'password'
              title='password'
              />
              <Input
              type= 'password'
              title='confirm password'
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
                have an account Login
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
