import React from 'react';
import { useGlobal } from '../../context/GlobalContext';
import { FaMobileAlt, FaAndroid, FaGooglePlay } from 'react-icons/fa';

const WS_Ready = () => {
    const { isAr } = useGlobal();
    return (
        <section className="ws-section">
            <div className="ws-ready-card">
                <div className="ws-ready-icon"><FaMobileAlt /></div>
                <h2>{isAr ? "جاهز للبدء؟" : "Ready to Start?"}</h2>
                <p>{isAr ? "حمل التطبيق الآن وخذ الخطوة الأولى نحو إدارة أفضل لصحة العائلة." : "Download now and take the first step towards better family health management"}</p>
                <div className="ws-ready-btns">
                    <a href="https://apkpure.com/synced-health-hub/com.synced.healthhub" target="_blank" rel="noreferrer" className="ws-btn-blue" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                        <FaAndroid /> APKPURE
                    </a>
                    <a href="https://play.google.com/apps/internaltest/4701006948578557043" target="_blank" rel="noreferrer" className="ws-btn-blue" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                        <FaGooglePlay /> Google Play
                    </a>
                </div>
            </div>
        </section>
    );
};
export default WS_Ready;