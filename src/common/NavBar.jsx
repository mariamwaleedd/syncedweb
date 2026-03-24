import React from 'react';
import './NavBar.css';
import logoWhite from '../imgs/logowhite.png';

const NavBar = () => {
    return (
        <nav className="navbar">
            <div className="nav-burger-container">
                <div className="burger-icon">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <ul className="burger-menu">
                    <li>Home</li>
                    <li>Services</li>
                    <li>Doctors</li>
                    <li>About</li>
                    <li>Contact</li>
                </ul>
            </div>

            {/* <div className="nav-logo">
                <img src={logoWhite} alt="Logo" className="logo-img" />
            </div> */}

            <div className="nav-search-container">
                <div className="search-wrapper">
                    <input type="text" placeholder="Search..." className="search-input" />
                    <button className="search-btn">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;