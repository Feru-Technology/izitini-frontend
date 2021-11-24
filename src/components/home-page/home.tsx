import React from 'react';
import './home.scss';
import NavBar from './navbar';
import AdSection from './adSection';
import CategorySection from './categorySection';
import ProductSection from './productSection';
import GetIdeaSection from './getIdea';
import Footer from './footer';
// import {Link} from 'react-router-dom';

function HomePage() {
  return (
    <div>
      <NavBar />
      <AdSection />
      <CategorySection />
      <ProductSection />
      <GetIdeaSection />
      <Footer />
    </div>
  );
}

export default HomePage;
