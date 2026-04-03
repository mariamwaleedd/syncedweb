
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
import Preloader from './common/Preloader';
import RepeatedPage from './pages/RepeatedPage';
import HealthCursor from './common/HealthCursor';
import WhySynced from './pages/WhySynced';
import Blogs from './pages/Blogs';

const Routing = () => {
  return (
    <>
      <NavBar />
      <Preloader/>
      <HealthCursor/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ContactUs" element={<ContactUs />} />
        <Route path="/features" element={<Features />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/FAQPage" element={<FAQPage />} />
        <Route path="/plans" element={<PlansPage />} />
        <Route path="/privacypolicy" element={<PrivacyPolicy />} />
        <Route path="/whysynced" element={<WhySynced />} />
        <Route path="/blog" element={<Blogs />} />
        <Route path="/features/:slug" element={<RepeatedPage />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </>
  );
};

export default Routing;