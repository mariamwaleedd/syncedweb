import React, { useEffect, useState } from 'react';
import './Preloader.css';
import logoblue from '../imgs/logoblue.png';

const Preloader = () => {
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsExiting(true);
        }, 2200);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className={`preloader-root ${isExiting ? 'preloader-exit' : ''}`}>
            <div className="preloader-content">
                <div className="medical-logo-anim">
                    <div className="outer-ring"></div>
                    <div className="inner-logo-wrapper">
                        <img src={logoblue} alt="Synced Logo" className="rotating-logo" />
                    </div>
                </div>
                
                <div className="brand-load">
                    <div className="load-line-container">
                        <div className="load-line"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Preloader;