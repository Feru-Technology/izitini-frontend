import React from 'react';
import './home.scss';
import NavBar from './navbar';
import LoginSection from './loginSection';
import CategorySection from './categorySection';
// import {Link} from 'react-router-dom';

function HomePage() {
  return (
    <div className='w-100'>
      <NavBar />
      <LoginSection />
      <CategorySection />
    </div>
  );
}

export default HomePage;
