import React from 'react';
import { FaPills, FaHeartbeat, FaShieldAlt } from 'react-icons/fa';
const WS_WhatFor = ({ data, isAr }) => {
    const icons = { FaPills: <FaPills />, FaHeartbeat: <FaHeartbeat />, FaShieldAlt: <FaShieldAlt /> };
    return (
        <section className="ws-section">
            <h2 className="ws-title-center">{isAr ? "ما هو غرض التطبيق؟" : "What Is It App For?"}</h2>
            <div className="ws-what-grid">
                {data.map((c, i) => (
                    <div className="ws-glass-card" key={i}>
                        <div className="ws-icon-box">{icons[c.icon_type]}</div>
                        <h3>{isAr ? c.title_ar : c.title_en}</h3>
                        <p>{isAr ? c.desc_ar : c.desc_en}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};
export default WS_WhatFor;