import React from 'react';
import { useGlobal } from '../../context/GlobalContext';
import { FaMobileAlt, FaApple, FaGooglePlay } from 'react-icons/fa';

const WS_Ready = () => {
    const { isAr } = useGlobal();
    return (
        <section className="ws-section">
            <div className="ws-ready-card">
                <div className="ws-ready-icon"><FaMobileAlt /></div>
                <h2>{isAr ? "جاهز للبدء؟" : "Ready to Start?"}</h2>
                <p>{isAr ? "حمل التطبيق الآن وخذ الخطوة الأولى نحو إدارة أفضل لصحة العائلة." : "Download now and take the first step towards better family health management"}</p>
                <div className="ws-ready-btns">
                    <button className="ws-btn-blue"><FaApple /> App Store</button>
                    <button className="ws-btn-blue"><FaGooglePlay /> Google Play</button>
                </div>
            </div>
        </section>
    );
};
export default WS_Ready;