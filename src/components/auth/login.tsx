import React from 'react';
// import './register.scss'
import Submit from './submitButton';
import Input from './inputs';
import { Link } from 'react-router-dom';

function Login() {
  return (
    <div className='container login-main'>
      <div className='row justify-content-center align-item-center'>
        <div className='card col-sm-6 p-5 login'>
          <form id='login-form' className='form' action='' method='post'>
            <h3 className='text-center text-info'>Login</h3>
            <Input
              type='email'
              title='email'
            />
            <Input
              type='password'
              title='password'
            />
            <div className='form-group'>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                <label className="form-check-label" >Remember me </label>
              </div>
              <Submit title='login' />
            </div>
            <div id='register-link' className='text-right'>

              Dont have a account? <Link to="/register">Register</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
