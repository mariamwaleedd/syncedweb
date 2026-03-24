import React, { useState, useEffect } from 'react';
import './WhatWeOffer.css';
import img25 from '../imgs/image 25.png';
import img27 from '../imgs/image 27.png';
import img26 from '../imgs/image 26.png';
import img24 from '../imgs/image 24.png';
import img23 from '../imgs/image 23.png';
import img22 from '../imgs/image 22.png';
import img28 from '../imgs/image 28.png';

const Counter = ({ end, suffix, duration = 2000 }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let startTimestamp = null;
        const endVal = parseFloat(end);
        
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const currentCount = progress * endVal;
            setCount(endVal > 10 ? Math.floor(currentCount) : currentCount.toFixed(1));

            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                setTimeout(() => {
                    startTimestamp = null;
                    window.requestAnimationFrame(step);
                }, 3000);
            }
        };
        window.requestAnimationFrame(step);
    }, [end, duration]);

    return <span>{count}{suffix}</span>;
};

const WhatWeOffer = () => {
    return (
        <section className="offer-section">
            <div className="stats-container">
                <div className="stat-item">
                    <h3><Counter end="50" suffix="+" /></h3>
                    <p>Active Users</p>
                </div>
                <div className="stat-item">
                    <h3><Counter end="1.2" suffix=" Million" /></h3>
                    <p>Records Tracked</p>
                </div>
                <div className="stat-item">
                    <h3><Counter end="98" suffix="%" /></h3>
                    <p>Satisfaction Rate</p>
                </div>
                <div className="stat-item">
                    <h3><Counter end="340" suffix="+" /></h3>
                    <p>Partner Physicians</p>
                </div>
            </div>

            <div className="offer-header">
                <div className="label">
                    <span className="line"></span> WHAT WE OFFER
                </div>
                <h2>Every tool you need for <i>complete</i> health care</h2>
                <p>From real-time vitals to family management, every feature is built around what actually matters to your wellbeing.</p>
            </div>

            <div className="offer-grid">
                <div className="card medicine-card">
                    <div className="card-info">
                        <h4>Medicine</h4>
                        <p>Personalize your own profile</p>
                    </div>
                    <div className="img-wrapper">
                        <img src={img25} alt="Medicine" className="img-med" />
                    </div>
                </div>

                <div className="card doctor-card">
                    <div className="card-info">
                        <h4>Doctor Connectivity</h4>
                        <p>Personalize your own profile</p>
                    </div>
                    <div className="img-wrapper">
                        <img src={img27} alt="Doctor" className="img-doc" />
                    </div>
                </div>

                <div className="card syncing-card">
                    <div className="card-info">
                        <h4>Smart Syncing</h4>
                        <p>All your data safe in one place.</p>
                    </div>
                    <div className="img-wrapper">
                        <img src={img26} alt="Smart Syncing" className="img-sync" />
                    </div>
                </div>

                <div className="card family-card">
                    <div className="card-info">
                        <h4>Family Portal</h4>
                        <p>Never forget your medicine.</p>
                    </div>
                    <div className="img-wrapper">
                        <img src={img24} alt="Family Portal" className="img-fam" />
                    </div>
                </div>

                <div className="card tracking-card">
                    <div className="card-info">
                        <h4>Health Tracking</h4>
                        <p>All your data safe in one place.</p>
                    </div>
                    <div className="img-wrapper">
                        <img src={img23} alt="Health Tracking" className="img-track" />
                    </div>
                </div>

                <div className="card reports-card">
                    <div className="card-info">
                        <h4>Medical Reports</h4>
                        <p>All your data safe in one place.</p>
                    </div>
                    <div className="img-wrapper">
                        <img src={img22} alt="Medical Reports" className="img-rep" />
                    </div>
                </div>

                <div className="card reminders-card">
                    <div className="card-info">
                        <h4>Reminders</h4>
                        <p>Personalize your own profile</p>
                    </div>
                    <div className="img-wrapper">
                        <img src={img28} alt="Reminders" className="img-rem" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhatWeOffer;