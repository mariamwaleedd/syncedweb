import React from 'react';
import { FaChartLine, FaArrowRight } from 'react-icons/fa';

const CTASec = ({ title, desc, isAr }) => {
    return (
        <section className="f-section">
            <div className="cta-v2-box">
                <FaChartLine className="cta-v2-icon" />
                <h2>{isAr ? `ابدأ مع ${title}` : `Ready for ${title}?`}</h2>
                <p>{desc}</p>
                <button className="cta-v2-btn">
                    {isAr ? "ابدأ الآن" : "Get Started"} 
                    <FaArrowRight style={{ marginLeft: isAr ? '0' : '15px', marginRight: isAr ? '15px' : '0' }} />
                </button>
            </div>
        </section>
    );
};

export default CTASec;