import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './FrequentlyAsked.css';
import { supabase } from '../Supabase';
import { useGlobal } from '../context/GlobalContext';

const FrequentlyAsked = () => {
    const { isAr } = useGlobal();
    const [activeIndex, setActiveIndex] = useState(null);
    const [header, setHeader] = useState(null);
    const [faqs, setFaqs] = useState([]);

    useEffect(() => {
        const fetchFaqs = async () => {
            const { data, error } = await supabase
                .from('faqs')
                .select('*')
                .order('order_index', { ascending: true });
            
            if (error) {
                console.error(error);
                return;
            }

            if (data) {
                const headerRow = data.find(i => i.type?.toLowerCase().includes('header'));
                const faqRows = data.filter(i => i.type?.toLowerCase().includes('faq'));
                
                setHeader(headerRow);
                setFaqs(faqRows);
            }
        };
        fetchFaqs();
    }, []);

    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section className="faq-section">
            <div className="faq-container">
                <div className="faq-content-left">
                    <div className="faq-label">
                        <span className="line"></span> 
                        {header ? (isAr ? header.label_ar : header.label_en) : "QUESTIONS"}
                    </div>
                    <h2>
                        {header ? (isAr ? header.title_ar : header.title_en) : "Frequently Asked Questions"}
                    </h2>
                    <p className="faq-support-text">
                        {isAr ? (
                            <>
                                هل لديك سؤال لم تتم الإجابة عليه هنا؟ <Link to="/ContactUs" className="faq-contact-link">تواصل مع فريق الدعم لدينا</Link> على مدار الساعة.
                            </>
                        ) : (
                            <>
                                Have a question not answered here? <Link to="/ContactUs" className="faq-contact-link">Reach out to our support team</Link> 24/7.
                            </>
                        )}
                    </p>
                    <Link to="/FAQPage" className="faq-view-all-btn">
                        {isAr ? "عرض كل الأسئلة" : "View All FAQ"}
                    </Link>
                </div>

                <div className="faq-accordion-right">
                    {faqs.length > 0 ? faqs.map((faq, index) => (
                        <div 
                            key={index} 
                            className={`faq-item ${activeIndex === index ? 'active' : ''}`}
                            onClick={() => toggleAccordion(index)}
                        >
                            <div className="faq-question-row">
                                <span className="faq-question">
                                    {isAr ? faq.question_ar : faq.question_en}
                                </span>
                                <div className="faq-toggle-btn">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <line x1="12" y1="5" x2="12" y2="19"></line>
                                        <line x1="5" y1="12" x2="19" y2="12"></line>
                                    </svg>
                                </div>
                            </div>
                            <div className="faq-answer">
                                <p>{isAr ? faq.answer_ar : faq.answer_en}</p>
                            </div>
                        </div>
                    )) : (
                        <div style={{color: 'white', opacity: 0.5}}>{isAr ? "جاري التحديث..." : "Updating questions..."}</div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default FrequentlyAsked;