import React from 'react';
import { FaRocket } from 'react-icons/fa';

const HowItHelpsSec = ({ items, isAr }) => {
    return (
        <section className="f-section">
            <div className="center-header-v2">
                <FaRocket />
                <h2 className="f-heading-v2">
                    {isAr ? "كيف " : "How it "}
                    <i>{isAr ? "يساعدك؟" : "Helps You"}</i>
                </h2>
            </div>
            <div className="how-v2-list">
                {items.map((item, i) => {
                    const parts = item.split(':');
                    const title = parts[0];
                    const description = parts[1];
                    return (
                        <div className="how-v2-item" key={i}>
                            <h4>{title}</h4>
                            <p>{description}</p>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default HowItHelpsSec;