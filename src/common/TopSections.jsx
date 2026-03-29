import React from 'react';
import './TopSections.css';

const TopSections = ({ titleMain, titleItalic, description }) => {
    return (
        <section className="top-section-container">
            <div className="gradient-layer"></div>
            <div className="grid-overlay"></div>
            <div className="top-content">
                <h1>{titleMain} <i>{titleItalic}</i></h1>
                <p>{description}</p>
            </div>
        </section>
    );
};

export default TopSections;