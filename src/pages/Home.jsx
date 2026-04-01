import React from 'react';
import HeroSection from '../components/HeroSection';
import './Home.css';
import WhatWeOffer from '../components/WhatWeOffer';
import Process from '../components/Process';
import ClickAway from './../components/ClickAway';
import FeaturesHome from '../components/FeaturesHome';
import PatientStories from '../components/PatientStories';
import TakeControl from '../components/TakeControl';
import FrequentlyAsked from '../components/FrequentlyAsked';
import IphoneSpline from '../components/IPhoneSpline';
import CommandCenter from '../components/CommandCenter';

const Home = () => {
  return (
    <>
    
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
    </main>

     </>
  );
};

export default Home;