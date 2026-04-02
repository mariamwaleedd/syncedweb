import React from 'react';
import { useGlobal } from '../../context/GlobalContext';
import { FaPills, FaHeartbeat, FaShieldAlt } from 'react-icons/fa';

const WS_WhatFor = () => {
    const { isAr } = useGlobal();
    const cards = [
        { icon: <FaPills />, tEn: "Medication Management", tAr: "إدارة الأدوية", dEn: "Track prescriptions, dosages, and refills for every family member", dAr: "تتبع الوصفات الطبية والجرعات وإعادة التعبئة لكل فرد في العائلة" },
        { icon: <FaHeartbeat />, tEn: "Health Monitoring", tAr: "مراقبة الصحة", dEn: "Log and visualize vital signs and health metrics over time", dAr: "تسجيل وتمثيل العلامات الحيوية والمقاييس الصحية بمرور الوقت" },
        { icon: <FaShieldAlt />, tEn: "Secure Records", tAr: "سجلات آمنة", dEn: "Keep all medical documents and history safely encrypted", dAr: "احتفظ بجميع المستندات الطبية والتاريخ مشفراً بأمان" }
    ];
    return (
        <section className="ws-section">
            <h2 className="ws-title-center">{isAr ? "لماذا هذا التطبيق؟" : "What Is It App For?"}</h2>
            <p className="ws-desc-center">{isAr ? "تم تصميم تطبيقنا لتبسيط إدارة صحة الأسرة من خلال توفير منصة مركزية." : "Our application is designed to simplify family health management by providing a centralized platform."}</p>
            <div className="ws-what-grid">
                {cards.map((c, i) => (
                    <div className="ws-glass-card" key={i}>
                        <div className="ws-icon-box">{c.icon}</div>
                        <h3>{isAr ? c.tAr : c.tEn}</h3>
                        <p>{isAr ? c.dAr : c.dEn}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};
export default WS_WhatFor;