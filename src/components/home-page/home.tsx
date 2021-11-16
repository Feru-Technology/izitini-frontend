import React from 'react';
import './home.scss';
import NavBar from './navbar';
import LoginSection from './loginSection';
import CategorySection from './categorySection';
import ProductSection from './productSection';
// import {Link} from 'react-router-dom';

function HomePage() {
  return (
    <div className='m-1'>
      <NavBar />
      <LoginSection />
      <CategorySection />
      <ProductSection />
    </div>
  );
}

export default HomePage;
