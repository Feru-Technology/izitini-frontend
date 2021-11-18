import React from 'react';
import './home.scss';
import NavBar from './navbar';
import LoginSection from './loginSection';
import CategorySection from './categorySection';
import ProductSection from './productSection';
import GetIdeaSection from './getIdea';
import Footer from './footer';
// import {Link} from 'react-router-dom';

function HomePage() {
  return (
    <div>
      <NavBar />
      <LoginSection />
      <CategorySection />
      <ProductSection />
      <GetIdeaSection />
      <Footer />
    </div>
  );
}

export default HomePage;
