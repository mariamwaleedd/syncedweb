import React from 'react';
import Spline from '@splinetool/react-spline';
import './iPhoneSpline.css';

const iPhoneSpline = () => {
    return (
        <section className="spline-section">
            <div className="spline-container">
                <Spline 
                    scene="https://prod.spline.design/zyaUYgxl41KEAj8O/scene.splinecode" 
                />
            </div>
            <div className="spline-content">
                <div className="spline-label">
                    <span className="line"></span> 3D EXPERIENCE
                </div>
                <h2>Download <br /> <i>Synced</i> Now</h2>
                <p>Get the full experience now! Available on Google Play & Apple Store</p>
            </div>
        </section>
    );
};

export default iPhoneSpline;