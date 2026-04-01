import React from 'react';
import { FaShieldAlt, FaCheckCircle } from 'react-icons/fa';
const FeatureAbout = ({ title, desc, points }) => (
    <section className="f-panel f-about">
        <div className="f-panel-header">
            <FaShieldAlt />
            <h3>{title}</h3>
        </div>
        <p className="f-panel-desc">{desc}</p>
        <div className="f-bullets">
            {points.map((p, i) => (
                <div key={i} className="f-bullet"><FaCheckCircle /> <span>{p}</span></div>
            ))}
        </div>
    </section>
);
export default FeatureAbout;