import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Error from './pages/Error';
import ContactUs from './pages/ContactUs';
import FAQPage from './pages/FAQPage';

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/ContactUs" element={<ContactUs />} />
      <Route path="/FAQPage" element={<FAQPage />} />
      <Route path="*" element={<Error />} />
    </Routes>
  );
};

export default Routing;