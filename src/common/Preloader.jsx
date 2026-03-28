import React, { useEffect, useState } from 'react';
import './Preloader.css';

const Preloader = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 2000);
        return () => clearTimeout(timer);
    }, []);

    if (!loading) return null;

    return (
        <div className="preloader">
            <div className="loader-content">
                <div className="loader-circle"></div>
                <h2 className="loader-text">SYNCED</h2>
            </div>
        </div>
    );
};

export default Preloader;