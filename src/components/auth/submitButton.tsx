import React from 'react';
import './register.css';

const  Submit: React.FC<{title: string, action?: () => void}> = ({title, action}) => (
  <div className='button'>
    <button type="button" className="btn btn-submit mb-2">{title}</button>
  </div>
)

export default Submit;
