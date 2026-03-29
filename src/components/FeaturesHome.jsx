import React, { useEffect, useState } from 'react';
import './FeaturesHome.css';
import { supabase } from '../Supabase';
import { useGlobal } from '../context/GlobalContext';

const FeaturesHome = () => {
    const { isAr } = useGlobal();
    const [header, setHeader] = useState(null);
    const [cards, setCards] = useState([]);

    useEffect(() => {
        const fetchFeatures = async () => {
            const { data } = await supabase
                .from('features_home')
                .select('*')
                .order('order_index', { ascending: true });
            
            if (data) {
                setHeader(data.find(i => i.type === 'header'));
                setCards(data.filter(i => i.type === 'card'));
            }
        };
        fetchFeatures();
    }, []);

    const getIcon = (type) => {
        if (type === 'live') {
            return (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
                    <polyline points="16 7 22 7 22 13"></polyline>
                </svg>
            );
        }
        return (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
                <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01"></path>
            </svg>
        );
    };

    if (!header || cards.length === 0) return null;

    return (
        <section className="features-home">
            <div className="features-container">
                <div className="features-left-column">
                    <div className="features-header">
                        <div className="features-label">
                            <span className="line"></span> {isAr ? header.label_ar : header.label_en}
                        </div>
                        <h2>{isAr ? header.title_ar : header.title_en}</h2>
                        <p>{isAr ? header.desc_ar : header.desc_en}</p>
                    </div>

                    <div className="feature-card last-card">
                        <div className="feature-icon">{getIcon(cards[0].icon_type)}</div>
                        <div className="feature-info">
                            <h4>{isAr ? cards[0].title_ar : cards[0].title_en}</h4>
                            <p>{isAr ? cards[0].desc_ar : cards[0].desc_en}</p>
                        </div>
                    </div>
                </div>

                <div className="features-right-column">
                    {cards.slice(1).map((card, index) => (
                        <div className="feature-card" key={index}>
                            <div className="feature-icon">{getIcon(card.icon_type)}</div>
                            <div className="feature-info">
                                <h4>{isAr ? card.title_ar : card.title_en}</h4>
                                <p>{isAr ? card.desc_ar : card.desc_en}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturesHome;