import React from 'react';
import './home.scss';
import NavBar from './navbar';
import LoginSection from './loginSection';
// import {Link} from 'react-router-dom';

function HomePage() {
  return (
    <div className='w-100'>
      <NavBar />
      <LoginSection />
    </div>
  );
}

export default HomePage;
