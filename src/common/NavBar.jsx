import React from 'react';
import './NavBar.css';
import whitelogo from '../imgs/logowhite.png';
import { useGlobal } from '../context/GlobalContext';
import { Link } from 'react-router-dom';

const NavBar = () => {
    const { isAr, toggleLang, isDark, toggleTheme } = useGlobal();

    return (
        <nav className="navbar">
            <div className="nav-left-group">
                <div className="nav-burger-container">
                    <div className="burger-icon">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <ul className="burger-menu">
                        <li><Link to="/">{isAr ? 'الرئيسية' : 'Home'}</Link></li>
                        <li><Link to="/features">{isAr ? 'الميزات' : 'Features'}</Link></li>
                        <li><Link to="/doctors">{isAr ? 'الأطباء' : 'Doctors'}</Link></li>
                        <li><Link to="/about">{isAr ? 'عنا' : 'About'}</Link></li>
                        <li><Link to="/ContactUs">{isAr ? 'اتصل بنا' : 'Contact'}</Link></li>
                    </ul>
                </div>

                <div className="controls-group">
                    <button className="control-btn" onClick={toggleTheme} title="Toggle Theme">
                        {isDark ? (
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
                        ) : (
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
                        )}
                    </button>
                    <button className="control-btn lang-toggle" onClick={toggleLang}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                        <span>{isAr ? 'EN' : 'AR'}</span>
                    </button>
                </div>
            </div>

            
            <div className="nav-search-container">
                <div className="search-wrapper">
                    <input type="text" placeholder={isAr ? "بحث..." : "Search..."} className="search-input" />
                    <button className="search-btn">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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