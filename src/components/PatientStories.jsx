import React, { useEffect, useState } from 'react';
import './PatientStories.css';
import { supabase } from '../Supabase';
import { useGlobal } from '../context/GlobalContext';

const UserIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
    </svg>
);

const Stars = () => (
    <div className="star-rating">
        {[...Array(5)].map((_, i) => (
            <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="white">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
        ))}
    </div>
);

const PatientStories = () => {
    const { isAr } = useGlobal();
    const [header, setHeader] = useState(null);
    const [cards, setCards] = useState([]);
    const [bar, setBar] = useState(null);

    useEffect(() => {
        const fetchTestimonials = async () => {
            const { data, error } = await supabase
                .from('testimonials')
                .select('*')
                .order('order_index', { ascending: true });
            
            if (data && data.length > 0) {
                setHeader(data.find(i => i.type === 'header'));
                setCards(data.filter(i => i.type === 'card'));
                setBar(data.find(i => i.type === 'bar'));
            } else if (error) {
                console.error("Fetch error:", error.message);
            }
        };
        fetchTestimonials();
    }, []);

    if (cards.length === 0 && !header) return null;

    return (
        <section className="stories-section">
            <div className="stories-header">
                <div className="stories-label">
                    <span className="line"></span> {isAr ? header?.label_ar : header?.label_en}
                </div>
                <h2>{isAr ? header?.title_ar : header?.title_en}</h2>
                <p>{isAr ? header?.desc_ar : header?.desc_en}</p>
            </div>

            <div className="stories-grid">
                {cards.map((card, index) => (
                    <div className={`story-card ${card.variant}`} key={index}>
                        <p className="testimonial">
                            "{isAr ? card.content_ar : card.content_en}"
                        </p>
                        <div className="card-footer">
                            <Stars />
                            <div className="user-info">
                                <div className="user-avatar"><UserIcon /></div>
                                <div>
                                    <h5>{isAr ? card.name_ar : card.name_en}</h5>
                                    <span>{isAr ? card.role_ar : card.role_en}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="stories-bar">
                <div className="avatar-stack-container">
                    <div className="avatar-stack">
                        {[1, 2, 3, 4, 5, 6].map(i => (
                            <div key={i} className="stack-item" style={{backgroundColor: i % 2 === 0 ? '#FFFFFF' : '#A3D6FF'}}>
                                <UserIcon />
                            </div>
                        ))}
                    </div>
                    <span className="count-text">{bar?.count_text || "+30"}</span>
                </div>
                <button className="write-review-btn">
                    {isAr ? "اكتب مراجعتك" : "Write Your Review"}
                    <div className="btn-circle">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                            <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                    </div>
                </button>
            </div>
        </section>
    );
};

export default PatientStories;