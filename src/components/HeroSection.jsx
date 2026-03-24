import React from 'react';
import './HeroSection.css';
import heroVideo from '../vids/herovideo.mp4';

const HeroSection = () => {
    return (
        <section className="hero-container">
            
            <div className="video-background">
                <video autoPlay loop muted playsInline className="main-video">
                    <source src={heroVideo} type="video/mp4" />
                </video>
                <div className="overlay"></div>
            </div>

            <div className="hero-content">
                <h2 className="hero-subtitle">ALL IN ONE HEALTH</h2>
                <h1 className="hero-title">PLATFORM</h1>
                <p className="hero-description">
                    Track Every Vital, Connect With Doctors, Manage Medications, And 
                    Monitor Your Whole Family, All From One Intelligent Platform.
                </p>
            </div>
        </section>
    );
};

export default HeroSection;