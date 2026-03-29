import React, { useEffect, useState } from 'react';
import Spline from '@splinetool/react-spline';
import './iPhoneSpline.css';
import { supabase } from '../Supabase';
import { useGlobal } from '../context/GlobalContext';

const IPhoneSpline = () => {
    const { isAr } = useGlobal();
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const { data: sectionData } = await supabase
                .from('hero_extra_sections') // Changed to lowercase
                .select('*')
                .eq('section_id', 'spline')
                .single();
            if (sectionData) setData(sectionData);
        };
        fetchData();
    }, []);

    if (!data) return null;

    return (
        <section className="spline-section">
            <div className="spline-container">
                <Spline scene={data.spline_url} />
            </div>
            <div className="spline-content">
                <div className="spline-label">
                    <span className="line"></span> {isAr ? data.label_ar : data.label_en}
                </div>
                <h2>
                    {isAr ? data.title_main_ar : data.title_main_en} <br /> 
                    <i>{isAr ? data.title_italic_ar : data.title_italic_en}</i> 
                    {isAr ? "" : " Now"}
                </h2>
                <p>{isAr ? data.desc_ar : data.desc_en}</p>
            </div>
        </section>
    );
};

export default IPhoneSpline;