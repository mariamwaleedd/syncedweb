import React from 'react';
import { FaShieldAlt } from 'react-icons/fa';

const BenefitsSec = ({ items, isAr }) => {
    return (
        <section className="f-section">
            <div className="center-header-v2">
                <FaShieldAlt />
                <h2 className="f-heading-v2">
                    {isAr ? "الميزات " : "Key "}
                    <i>{isAr ? "الأساسية" : "Benefits"}</i>
                </h2>
            </div>
            <div className="benefits-v2-grid">
                {items.map((item, i) => (
                    <div className="benefit-v2-mini" key={i}>
                        <div className="mini-dot"></div>
                        <p>{item}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default BenefitsSec;