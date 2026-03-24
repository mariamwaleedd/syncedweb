import React, { useState } from 'react';
import './FrequentlyAsked.css';

const FrequentlyAsked = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const faqs = [
        {
            question: "Is my health data secure and private?",
            answer: "Yes, we use enterprise-grade encryption and comply with all international health data privacy standards to ensure your information remains yours alone."
        },
        {
            question: "Which wearable devices does Synced support?",
            answer: "Synced supports all major wearables including Apple Watch, Garmin, Fitbit, and Samsung Health, as well as various smart scales and blood pressure monitors."
        },
        {
            question: "How does the Family Portal work for children?",
            answer: "Parents can create managed profiles for children under their main account, allowing them to track growth, vaccinations, and daily vitals in one dashboard."
        },
        {
            question: "What happens to my data if I cancel?",
            answer: "You can export all your historical data at any time. If you cancel, your data is securely archived for 30 days before being permanently deleted."
        },
        {
            question: "Is there an app for iOS and Android?",
            answer: "Yes, our native apps are available for both iOS and Android platforms, providing a seamless mobile experience with real-time notifications."
        }
    ];

    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section className="faq-section">
            <div className="faq-container">
                <div className="faq-content-left">
                    <div className="faq-label">
                        <span className="line"></span> QUESTIONS
                    </div>
                    <h2>Frequently <br /> asked <i>questions</i></h2>
                    <p>
                        Have a question not answered here? <br />
                        Reach out to our support team 24/7.
                    </p>
                </div>

                <div className="faq-accordion-right">
                    {faqs.map((faq, index) => (
                        <div 
                            key={index} 
                            className={`faq-item ${activeIndex === index ? 'active' : ''}`}
                            onClick={() => toggleAccordion(index)}
                        >
                            <div className="faq-question-row">
                                <span className="faq-question">{faq.question}</span>
                                <div className="faq-toggle-btn">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="12" y1="5" x2="12" y2="19"></line>
                                        <line x1="5" y1="12" x2="19" y2="12"></line>
                                    </svg>
                                </div>
                            </div>
                            <div className="faq-answer">
                                <p>{faq.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FrequentlyAsked;