import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Error.css';
import NavBar from '../common/NavBar';
import Footer from '../common/Footer';
import { useGlobal } from '../context/GlobalContext';
import { FaHome, FaExclamationTriangle, FaHeartbeat } from 'react-icons/fa';

const Error = () => {
    const { isAr } = useGlobal();

    useEffect(() => {
        document.title = isAr ? "٤٠٤ | الصفحة غير موجودة" : "404 | Page Not Found";
    }, [isAr]);

    return (
        <div className="error-page-root">
            <NavBar />
            <main className="error-content-container">
                <div className="error-visuals">
                    <div className="error-code-bg">404</div>
                    <div className="heart-monitor-line">
                        <svg viewBox="0 0 1000 100" className="ecg-line">
                            <path d="M0,50 L200,50 L210,40 L220,60 L230,20 L245,80 L260,50 L400,50 L410,10 L430,90 L450,50 L600,50 L610,40 L620,60 L630,20 L645,80 L660,50 L800,50 L810,10 L830,90 L850,50 L1000,50" />
                        </svg>
                        <div className="heart-pulse-lead">
                            <FaHeartbeat className="pulsing-heart" />
                        </div>
                    </div>
                </div>

                <div className="error-text-box">
                    <div className="error-tag">
                        <FaExclamationTriangle /> {isAr ? "خطأ في الاتصال" : "CONNECTION ERROR"}
                    </div>
                    <h1>{isAr ? "الصفحة خارج " : "Page is "}<i>{isAr ? "النطاق" : "Out of Range"}</i></h1>
                    <p>
                        {isAr 
                            ? "عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها. دعنا نعيدك إلى المسار الصحيح." 
                            : "Sorry, the page you're looking for doesn't exist or has been moved. Let's get you back on track."}
                    </p>
                    <Link to="/" className="error-home-btn">
                        <FaHome /> {isAr ? "العودة للرئيسية" : "Back to Home"}
                    </Link>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Error;