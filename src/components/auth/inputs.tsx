import React from 'react';
import './register.css'
import Submit from './submitButton';

const inputs = () => {
  return (
            <div className='form-group'>
              <label className='text-info'>Username:</label> <br />
              <input
                type='text'
                name='username'
                id='username'
                className='form-control'
              />
            </div>
  );
}

export default inputs;
