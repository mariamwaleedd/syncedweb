//
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Error from './pages/Error';
import ContactUs from './pages/ContactUs';
import FAQPage from './pages/FAQPage';
import PlansPage from './pages/PlansPage';
import Features from './pages/Features';
import NavBar from './common/NavBar';
import Footer from './common/Footer';
import AboutUs from './pages/AboutUs';
import PrivacyPolicy from './pages/PrivacyPolicy';

const Routing = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ContactUs" element={<ContactUs />} />
        <Route path="/features" element={<Features />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/FAQPage" element={<FAQPage />} />
        <Route path="/plans" element={<PlansPage />} />
        <Route path="/privacypolicy" element={<PrivacyPolicy />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </>
  );
};

export default Routing;