import React, { useState, useEffect, useRef } from 'react';
import './NavBar.css';
import whitelogo from '../imgs/logowhite.png';
import { useGlobal } from '../context/GlobalContext';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../Supabase';

const NavBar = () => {
    const { isAr, toggleLang, isDark, toggleTheme } = useGlobal();
    const navigate = useNavigate();
    const location = useLocation();
    const currentPath = location.pathname;
    
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchData, setSearchData] = useState([]);
    const searchRef = useRef(null);

    useEffect(() => {
        const buildIndex = async () => {
            const staticRoutes = [
                { title_en: 'About Us', title_ar: 'معلومات عنا', type: 'Page', link: '/AboutUs' },
                { title_en: 'Contact Us', title_ar: 'اتصل بنا', type: 'Page', link: '/ContactUs' },
                { title_en: 'Plans & Pricing', title_ar: 'الخطط والأسعار', type: 'Page', link: '/plans' },
                { title_en: 'Why Synced', title_ar: 'لماذا سينكد', type: 'Page', link: '/whysynced' },
                { title_en: 'Features', title_ar: 'الميزات', type: 'Page', link: '/features' },
                { title_en: 'FAQs', title_ar: 'الأسئلة الشائعة', type: 'Page', link: '/faq' },
            ];
            
            let dynamicData = [];
            const { data: features } = await supabase.from('features').select('title_en, title_ar, desc_en, desc_ar');
            const { data: faqs } = await supabase.from('faq_page').select('title_en, title_ar').eq('type', 'faq');
            
            if (features) {
                dynamicData = [...dynamicData, ...features.map(f => ({
                    title_en: f.title_en,
                    title_ar: f.title_ar,
                    desc_en: f.desc_en,
                    desc_ar: f.desc_ar,
                    type: 'Feature',
                    link: `/features/${f.title_en?.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')}`
                }))];
            }

            if (faqs) {
                 dynamicData = [...dynamicData, ...faqs.map(f => ({
                    title_en: f.title_en,
                    title_ar: f.title_ar,
                    type: 'FAQ',
                    link: `/faq`
                 }))];
            }

            setSearchData([...staticRoutes, ...dynamicData]);
        };
        buildIndex();
        
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setIsSearchOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        if (e.target.value.trim() !== '') setIsSearchOpen(true);
        else setIsSearchOpen(false);
    };

    const handleResultClick = (link) => {
        navigate(link);
        setIsSearchOpen(false);
        setSearchQuery('');
    };

    const filteredResults = searchQuery.trim() === '' ? [] : searchData.filter(item => {
        const q = searchQuery.toLowerCase();
        const tEn = item.title_en?.toLowerCase() || '';
        const tAr = item.title_ar || '';
        const dEn = item.desc_en?.toLowerCase() || '';
        const dAr = item.desc_ar || '';
        return tEn.includes(q) || tAr.includes(q) || dEn.includes(q) || dAr.includes(q);
    });

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
                        <li><Link to="/" className={currentPath === "/" ? "active-link" : ""}>{isAr ? 'الرئيسية' : 'Home'}</Link></li>
                        <li><Link to="/features" className={currentPath === "/features" ? "active-link" : ""}>{isAr ? 'الميزات' : 'Features'}</Link></li>
                        <li><Link to="/AboutUs" className={currentPath === "/AboutUs" ? "active-link" : ""}>{isAr ? 'عنا' : 'About'}</Link></li>
                        <li><Link to="/ContactUs" className={currentPath === "/ContactUs" ? "active-link" : ""}>{isAr ? 'اتصل بنا' : 'Contact'}</Link></li>
                        <li><Link to="/plans" className={currentPath === "/plans" ? "active-link" : ""}>{isAr ? 'الأطباء' : 'Plans'}</Link></li>
                        <li><Link to="/whysynced" className={currentPath === "/whysynced" ? "active-link" : ""}>{isAr ? ' ليه Synced ' : 'Why Synced'}</Link></li>
                        <li><Link to="/blog" className={currentPath === "/blog" ? "active-link" : ""}>{isAr ? 'مدونة' : 'Blog'}</Link></li>
                    </ul>
                </div>

                <div className="controls-group">
                    <button className="control-btn" onClick={toggleTheme} title="Toggle Theme">
                        {isDark ? (
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5" /><path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" /></svg>
                        ) : (
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>
                        )}
                    </button>
                    <button className="control-btn lang-toggle" onClick={toggleLang}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>
                        <span>{isAr ? 'EN' : 'AR'}</span>
                    </button>
                </div>
            </div>

            <div className="nav-search-container" ref={searchRef}>
                <div className="search-wrapper">
                    <input 
                        type="text" 
                        placeholder={isAr ? "بحث..." : "Search..."} 
                        className="search-input" 
                        value={searchQuery}
                        onChange={handleSearchChange}
                        onFocus={() => { if(searchQuery.trim()) setIsSearchOpen(true) }}
                    />
                    <button className="search-btn">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                    </button>
                </div>
                
                {isSearchOpen && (
                    <div className="nav-search-dropdown">
                        {filteredResults.length > 0 ? (
                            filteredResults.slice(0, 8).map((res, idx) => (
                                <div className="search-result-item" key={idx} onClick={() => handleResultClick(res.link)}>
                                    <div className="res-type">{isAr && res.type==='Feature'?'ميزة':(isAr && res.type==='Page'?'صفحة':res.type)}</div>
                                    <div className="res-content">
                                        <h4>{isAr ? res.title_ar : res.title_en}</h4>
                                        { (res.desc_en && res.desc_ar) && <p>{isAr ? res.desc_ar.substring(0,50) : res.desc_en.substring(0,50)}...</p> }
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="no-results-item">
                                {isAr ? "لا توجد نتائج" : "No results found"}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </nav>
    );
};

export default NavBar;