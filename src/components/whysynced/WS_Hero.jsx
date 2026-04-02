import React from 'react';
import { useGlobal } from '../../context/GlobalContext';

const WS_Hero = () => {
    const { isAr } = useGlobal();
    return (
        <section className="ws-hero">
            <div className="ws-hero-overlay"></div>
            <div className="ws-hero-content">
                <span className="ws-badge">{isAr ? "رفيق صحة عائلتك" : "Your Family's Health Companion"}</span>
                <h1>{isAr ? "لماذا سيصبح سينكد " : "Why synced will "} <br /> <i>{isAr ? "أفضل صديق لك؟" : "become your best friend?"}</i></h1>
                <p>{isAr ? "منصة تتبع صحية شاملة مصممة لمساعدة العائلات على مراقبة وإدارة وسجلاتهم الصحية في تطبيق واحد آمن وسهل الاستخدام." : "A comprehensive health tracking platform designed to help families monitor, manage, and maintain their health records in one secure, easy-to-use application."}</p>
                <div className="ws-hero-btns">
                    <button className="ws-btn-blue">{isAr ? "تحميل الآن" : "Download Now"}</button>
                    <button className="ws-btn-outline">{isAr ? "تعرف على المزيد" : "Learn More"} →</button>
                </div>
            </div>
        </section>
    );
};
export default WS_Hero;