import React from 'react';
import './register.scss'

const Input: React.FC <{type: string, title: string}> = ({type, title, }) => {
  return (
    <div className="input-group mb-3">
      <input type={type} className="form-control" placeholder={title} aria-label={title} aria-describedby="basic-addon2" />
    </div>
  );
}

export default Input;
