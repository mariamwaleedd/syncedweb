import React from 'react';
import HeroSection from '../components/HeroSection';
import './Home.css';
import NavBar from './../common/NavBar';
import WhatWeOffer from '../components/WhatWeOffer';

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