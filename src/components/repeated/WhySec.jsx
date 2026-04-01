import React from 'react';
import { FaLightbulb } from 'react-icons/fa';
const WhySec = ({ desc, cards }) => (
    <section className="f-section">
        <div className="why-header-v2"><FaLightbulb /> <h2 className="f-heading-v2">Why We <i>Chose</i> This Feature</h2></div>
        <p>{desc}</p>
        <div className="why-v2-grid">
            {cards.map((c, i) => (
                <div className="why-v2-card" key={i}>
                    <span>0{i+1}</span>
                    <p>{c}</p>
                </div>
            ))}
        </div>
    </section>
);
export default WhySec;