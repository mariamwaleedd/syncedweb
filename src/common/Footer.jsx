import React from 'react';
import './Footer.css';
import whitelogo from '../imgs/logowhite.png';
import fulllogo from '../imgs/fulllogo.png';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-overlay">
                <div className="footer-top">
                    <div className="footer-brand">
                        <img src={whitelogo} alt="Synced" className="footer-top-logo" />
                        <p>
                            Your all-in-one health platform for individuals and families. 
                            Tracking everything that matters, for everyone you love.
                        </p>
                    </div>

                    <div className="footer-links-container">
                        <div className="footer-col">
                            <h4>PRODUCT</h4>
                            <ul>
                                <li>Services</li>
                                <li>Family Portal</li>
                                <li>Dashboard</li>
                                <li>Health Tracking</li>
                            </ul>
                        </div>
                        <div className="footer-col">
                            <h4>COMPANY</h4>
                            <ul>
                                <li>About Us</li>
                                <li>Contact Us</li>
                                <li>Frequently Asked</li>
                                <li>How To Connect</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <div className="footer-branding-full">
                        <img src={fulllogo} alt="Synced Connected by Care" />
                    </div>
                    <p className="footer-copyright">
                        © 2026 Synced Health Technologies. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;