import React from 'react';
import { FaChartLine } from 'react-icons/fa';
const FeatureRationale = ({ title, desc }) => (
    <section className="f-rationale">
        <div className="f-rat-icon"><FaChartLine /></div>
        <h2>{title}</h2>
        <p className="f-rat-desc">{desc}</p>
        <div className="f-rat-grid">
            {[1, 2, 3].map(n => (
                <div key={n} className="f-rat-card">
                    <span className="f-rat-num">0{n}</span>
                    <p>Optimizing health data integration for maximum accuracy and user ease.</p>
                </div>
            ))}
        </div>
    </section>
);
export default FeatureRationale;