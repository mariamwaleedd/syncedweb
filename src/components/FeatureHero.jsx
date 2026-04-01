import React from 'react';
const FeatureHero = ({ title, sub, cap, img }) => (
    <section className="f-hero">
        <div className="f-hero-bg-overlay"></div>
        <img src={img} alt="" className="f-hero-img" />
        <div className="f-hero-content">
            <span className="f-hero-cap">{cap}</span>
            <h1>{title}</h1>
            <p className="f-hero-sub">{sub}</p>
        </div>
    </section>
);
export default FeatureHero;