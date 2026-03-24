import React from 'react';
import HeroSection from '../components/HeroSection';
import './Home.css';
import WhatWeOffer from '../components/WhatWeOffer';
import NavBar from './../common/NavBar';
import Process from '../components/Process';
import ClickAway from './../components/ClickAway';
import FeaturesHome from '../components/FeaturesHome';
import PatientStories from '../components/PatientStories';
import TakeControl from '../components/TakeControl';
import FrequentlyAsked from '../components/FrequentlyAsked';
import Footer from './../common/Footer';

const Home = () => {
  return (
    <>

    <NavBar />
    <main>
    <HeroSection />
    <WhatWeOffer/>
    <Process/>

    <ClickAway/>
    <FeaturesHome/>
    <PatientStories/>
    <TakeControl/>
    <FrequentlyAsked/>
    <Footer/>
    </main>

     </>
  );
};

export default Home;