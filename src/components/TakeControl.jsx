import React, { useEffect, useState } from 'react';
import './TakeControl.css';
import { supabase } from '../Supabase';
import { useGlobal } from '../context/GlobalContext';

const TakeControl = () => {
    const { isAr } = useGlobal();
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const { data: sectionData } = await supabase
                .from('hero_extra_sections') // Changed to lowercase
                .select('*')
                .eq('section_id', 'take_control')
                .single();
            if (sectionData) setData(sectionData);
        };
        fetchData();
    }, []);

    if (!data) return null;

    return (
        <section className="take-control-section">
            <div className="tc-overlay">
                <div className="tc-content">
                    <span className="tc-label">{isAr ? data.label_ar : data.label_en}</span>
                    <h2 className="tc-title">
                        <span className="blue-text">{isAr ? data.title_main_ar : data.title_main_en}</span> <br /> 
                        <span className="white-italic">{isAr ? data.title_italic_ar : data.title_italic_en}</span>
                    </h2>
                    <p className="tc-description">{isAr ? data.desc_ar : data.desc_en}</p>
                    <div className="tc-buttons">
                        <button className="btn-download">{isAr ? data.btn1_ar : data.btn1_en}</button>
                        <button className="btn-demo">{isAr ? data.btn2_ar : data.btn2_en}</button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TakeControl;