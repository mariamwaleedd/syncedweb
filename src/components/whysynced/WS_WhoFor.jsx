import React, { useEffect, useState } from 'react';
import { useGlobal } from '../../context/GlobalContext';
import { supabase } from '../../Supabase';

const WS_WhoFor = () => {
    const { isAr } = useGlobal();
    const [header, setHeader] = useState(null);
    const [cards, setCards] = useState([]);

    useEffect(() => {
        const fetchWhoData = async () => {
            const { data } = await supabase
                .from('why_synced')
                .select('*')
                .or('type.eq.who,type.eq.who_header')
                .order('order_index', { ascending: true });

            if (data) {
                setHeader(data.find(i => i.type === 'who_header'));
                setCards(data.filter(i => i.type === 'who'));
            }
        };
        fetchWhoData();
    }, []);

    if (!header) return null;

    return (
        <section className="ws-section">
            <h2 className="ws-title-center">
                {isAr ? header.title_ar : header.title_en}
            </h2>
            <p className="ws-desc-center">
                {isAr ? header.desc_ar : header.desc_en}
            </p>
            
            <div className="ws-who-grid">
                {cards.map((card, index) => (
                    <div 
                        className={`ws-who-card card-index-${index}`} 
                        key={card.key_id || index}
                    >
                        <div className="ws-who-img-container">
                            <img src={card.img_url} alt="" />
                        </div>
                        <div className="ws-who-text">
                            <h3>{isAr ? card.title_ar : card.title_en}</h3>
                            <p>{isAr ? card.desc_ar : card.desc_en}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default WS_WhoFor;