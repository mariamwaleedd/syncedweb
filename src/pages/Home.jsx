import React from 'react';
import HeroSection from '../components/HeroSection';
import './Home.css';
import WhatWeOffer from '../components/WhatWeOffer';
import NavBar from './../common/NavBar';
import Process from '../components/Process';

const Home = () => {
  return (
    <>

    <NavBar />
    <main>
    <HeroSection />
    <WhatWeOffer/>
    <Process/>
    </main>

     </>
  );
};

export default Home;