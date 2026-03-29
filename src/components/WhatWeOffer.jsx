import React, { useState, useEffect } from 'react';
import './WhatWeOffer.css';
import { supabase } from '../Supabase';
import { useGlobal } from '../context/GlobalContext';

const Counter = ({ end, suffix, duration = 2000 }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let startTimestamp = null;
        const endVal = parseFloat(end);
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const currentCount = progress * endVal;
            setCount(endVal > 10 ? Math.floor(currentCount) : currentCount.toFixed(1));
            if (progress < 1) window.requestAnimationFrame(step);
        };
        window.requestAnimationFrame(step);
    }, [end, duration]);

    return <span>{count}{suffix}</span>;
};

const WhatWeOffer = () => {
    const { isAr } = useGlobal();
    const [header, setHeader] = useState(null);
    const [stats, setStats] = useState([]);
    const [cards, setCards] = useState([]);

    useEffect(() => {
        const fetchOfferData = async () => {
            const { data } = await supabase.from('what_we_offer').select('*');
            if (data) {
                setHeader(data.find(item => item.type === 'header'));
                setStats(data.filter(item => item.type === 'stat'));
                setCards(data.filter(item => item.type === 'card'));
            }
        };
        fetchOfferData();
    }, []);

    if (!header) return null;

    return (
        <section className="offer-section">
            <div className="stats-container">
                {stats.map((stat, idx) => (
                    <div className="stat-item" key={idx}>
                        <h3>
                            <Counter 
                                end={stat.val_end} 
                                suffix={isAr ? stat.suffix_ar : stat.suffix_en} 
                            />
                        </h3>
                        <p>{isAr ? stat.label_ar : stat.label_en}</p>
                    </div>
                ))}
            </div>

            <div className="offer-header">
                <div className="label">
                    <span className="line"></span> {isAr ? header.label_ar : header.label_en}
                </div>
                <h2>{isAr ? header.title_ar : header.title_en}</h2>
                <p>{isAr ? header.desc_ar : header.desc_en}</p>
            </div>

            <div className="offer-grid">
                {cards.map((card, idx) => (
                    <div className={`card ${card.card_class}`} key={idx}>
                        <div className="card-info">
                            <h4>{isAr ? card.title_ar : card.title_en}</h4>
                            <p>{isAr ? card.desc_ar : card.desc_en}</p>
                        </div>
                        <div className="img-wrapper">
                            <img src={card.img_url} alt="" className={card.img_class} />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default WhatWeOffer;