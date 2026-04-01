import React from 'react';
import { FaInfoCircle, FaCheck } from 'react-icons/fa';
const WhatIsSec = ({ title, desc, points }) => (
    <section className="f-section">
        <div className="f-panel-v2">
            <div className="panel-header"><FaInfoCircle /> <h2 className="f-heading-v2">What is <i>{title}</i> For?</h2></div>
            <p className="panel-desc-v2">{desc}</p>
            <div className="what-is-grid-v2">
                {points.map((p, i) => <div className="what-point-v2" key={i}><FaCheck color="var(--lightblue)"/> {p}</div>)}
            </div>
        </div>
    </section>
);
export default WhatIsSec;