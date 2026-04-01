import React from 'react';
import { FaStethoscope } from 'react-icons/fa';
const HeroSec = ({ img, title, sub, cap }) => (
    <section className="f-hero-v2">
        <img src={img} className="f-hero-img-v2" alt="" />
        <div className="f-hero-overlay-v2"></div>
        <div className="f-hero-text-v2 f-section">
            <div className="glass-icon-box"><FaStethoscope /></div>
            <h1>{title}</h1>
            <p>{sub}</p>
        </div>
    </section>
);
export default HeroSec;