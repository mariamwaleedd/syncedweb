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
import IphoneSpline from '../components/iPhoneSpline';
import CommandCenter from '../components/CommandCenter';
import Preloader from './../common/Preloader';

const Home = () => {
  return (
    <>
<Preloader/>
    <NavBar />
    <main>
    <HeroSection />
    <WhatWeOffer/>
    <Process/>
    <CommandCenter/>
    <ClickAway/>
    <FeaturesHome/>
    <PatientStories/>
    <IphoneSpline/>
    <TakeControl/>
    <FrequentlyAsked/>
    <Footer/>
    </main>

     </>
  );
};

export default Home;