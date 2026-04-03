import React, { useEffect, Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './common/NavBar';
import Footer from './common/Footer';
import Preloader from './common/Preloader';
import HealthCursor from './common/HealthCursor';
import BackToTop from './common/BackToTop';
import ChatBot from './common/ChatBot';
import ScrollToTop from './common/ScrollToTop';

const Home = lazy(() => import('./pages/Home'));
const Error = lazy(() => import('./pages/Error'));
const ContactUs = lazy(() => import('./pages/ContactUs'));
const FAQPage = lazy(() => import('./pages/FAQPage'));
const PlansPage = lazy(() => import('./pages/PlansPage'));
const Features = lazy(() => import('./pages/Features'));
const AboutUs = lazy(() => import('./pages/AboutUs'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const RepeatedPage = lazy(() => import('./pages/RepeatedPage'));
const WhySynced = lazy(() => import('./pages/WhySynced'));
const Blogs = lazy(() => import('./pages/Blogs'));

const Routing = () => {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
    };

    const intersectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-visible');
        }
      });
    }, observerOptions);

    const observeElements = () => {
      const elements = document.querySelectorAll('section, div[class*="card"], li[class*="card"], div[class*="testimonial"], .news-card, .topic-card, .story-card, .step-icon');
      
      elements.forEach(el => {
        if (!el.classList.contains('reveal-scroll')) {
          el.classList.add('reveal-scroll');
          intersectionObserver.observe(el);
        }
        
        const cName = el.className || '';
        if (typeof cName === 'string' && (cName.includes('card') || cName.includes('testimonial') || el.classList.contains('step-icon'))) {
          el.classList.add('global-hover-effect');
        }
      });
    };

    observeElements();

    const mutationObserver = new MutationObserver((mutations) => {
      let shouldCheck = false;
      for (const m of mutations) {
        if (m.addedNodes.length > 0) {
          shouldCheck = true;
          break;
        }
      }
      if (shouldCheck) {
        setTimeout(observeElements, 50);
      }
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      intersectionObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return (
    <>
      <NavBar />
      <ScrollToTop />
      <Preloader/>
      <BackToTop/>
      <ChatBot/>
      <HealthCursor/>
      <Suspense fallback={<div className="loading-fallback"></div>}>
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
      </Suspense>
      <Footer />
    </>
  );
};

export default Routing;