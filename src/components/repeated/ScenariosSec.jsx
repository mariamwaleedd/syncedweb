import React from 'react';
import { FaUsers } from 'react-icons/fa';

const ScenariosSec = ({ s1, s2, isAr }) => {
    return (
        <section className="f-section">
            <div className="center-header-v2">
                <FaUsers />
                <h2 className="f-heading-v2">
                    {isAr ? "سيناريوهات " : "Real-Life "}
                    <i>{isAr ? "واقعية" : "Scenarios"}</i>
                </h2>
            </div>
            <div className="sc-v2-grid">
                <div className="sc-v2-card">
                    <span className="sc-v2-tag">{isAr ? "٠١" : "01"}</span>
                    <p>{s1}</p>
                </div>
                <div className="sc-v2-card">
                    <span className="sc-v2-tag">{isAr ? "٠٢" : "02"}</span>
                    <p>{s2}</p>
                </div>
            </div>
        </section>
    );
};

export default ScenariosSec;