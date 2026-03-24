import React from 'react';
import HeroSection from '../components/HeroSection';
import './Home.css';
import WhatWeOffer from '../components/WhatWeOffer';
import NavBar from './../common/NavBar';

const Home = () => {
  return (
    <>

    <NavBar />
    <main>
    <HeroSection />
    <WhatWeOffer/>
    </main>

     </>
  );
};

export default Home;