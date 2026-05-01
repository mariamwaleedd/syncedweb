import React, { useEffect, useState, Suspense, lazy, useRef } from 'react';
import './iPhoneSpline.css';
import { supabase, fetchWithCache } from '../Supabase';
import { useGlobal } from '../context/GlobalContext';

const Spline = lazy(() => import('@splinetool/react-spline'));

const IPhoneSpline = () => {
    const { isAr } = useGlobal();
    const [data, setData] = useState(null);
    const [isVisible, setIsVisible] = useState(false);
    const splineRef = useRef(null);

    useEffect(() => {
        const fetchData = () => {
            fetchWithCache('hero_extra_spline', supabase
                .from('hero_extra_sections')
                .select('*')
                .eq('section_id', 'spline')
                .single(), (sectionData) => {
                setData(sectionData);
            });
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (!data) return; // Wait until data is loaded and DOM is rendered
        
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
                observer.disconnect();
            }
        });
        if (splineRef.current) observer.observe(splineRef.current);
        return () => observer.disconnect();
    }, [data]);

    if (!data) return null;

    return (
        <section className="spline-section">
            <div className="spline-container" ref={splineRef}>
                {isVisible ? (
                    <Suspense fallback={<div style={{ width: '100%', height: '100%', opacity: 0 }}></div>}>
                        <Spline scene={data.spline_url} />
                    </Suspense>
                ) : (
                    <div style={{ width: '100%', height: '100%', opacity: 0 }}></div>
                )}
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