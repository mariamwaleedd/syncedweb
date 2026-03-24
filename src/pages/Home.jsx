import React from 'react';
import HeroSection from '../components/HeroSection';
import './Home.css';
import NavBar from './../common/NavBar';

const Home = () => {
  return (
    <>
   
    <NavBar />

    <main>

      <HeroSection />
    </main>

     </>
  );
};

export default Home;