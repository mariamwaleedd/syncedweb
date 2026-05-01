import React, { useEffect, useState } from 'react';
import './ClickAway.css';
import { supabase, fetchWithCache } from '../Supabase';
import { useGlobal } from '../context/GlobalContext';

const ClickAway = () => {
    const { isAr } = useGlobal();
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = () => {
            fetchWithCache('hero_extra_click_away', supabase
                .from('hero_extra_sections')
                .select('*')
                .eq('section_id', 'click_away')
                .single(), (sectionData) => {
                setData(sectionData);
            });
        };
        fetchData();
    }, []);

    if (!data) return null;

    return (
        <section className="click-away-section">
            <div className="click-away-container">
                <div className="click-away-image">
                    <img loading="lazy" 
                        crossOrigin="anonymous"
                        src={`${data.img_url}`} 
                        alt="Synced Mobile Experience" 
                        className={isAr ? 'rotated-ar' : ''} 
                    />
                </div>
                <div className="click-away-content">
                    <div className="click-away-label">
                        <span className="line"></span> {isAr ? data.label_ar : data.label_en}
                    </div>
                    <h2>
                        {isAr ? data.title_main_ar : data.title_main_en} 
                        <i>{isAr ? data.title_italic_ar : data.title_italic_en}</i> 
                        {!isAr && " away."}
                    </h2>
                    <p>{isAr ? data.desc_ar : data.desc_en}</p>
                </div>
            </div>
        </section>
    );
};

export default ClickAway;