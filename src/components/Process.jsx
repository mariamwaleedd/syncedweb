import React, { useEffect, useState, useRef } from 'react';
import './Process.css';
import { supabase } from '../Supabase';
import { useGlobal } from '../context/GlobalContext';

const Process = () => {
    const { isAr } = useGlobal();
    const [inView, setInView] = useState(false);
    const [header, setHeader] = useState(null);
    const [steps, setSteps] = useState([]);
    const sectionRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            const { data, error } = await supabase
                .from('the_process')
                .select('*')
                .order('order_index', { ascending: true });
            
            if (data && data.length > 0) {
                setHeader(data.find(i => i.type === 'header'));
                setSteps(data.filter(i => i.type === 'step'));
            } else {
                console.error("No data found in 'the_process' table", error);
            }
        };
        fetchData();

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) setInView(true);
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => {
            if (sectionRef.current) observer.unobserve(sectionRef.current);
        };
    }, []);

    if (!header) return null;

    return (
        <section className="process-section" ref={sectionRef}>
            <div className={`process-header ${inView ? 'animate-header' : ''}`}>
                <div className="process-label">
                    <span className="line"></span> {isAr ? header.label_ar : header.label_en}
                </div>
                <h2>{isAr ? header.title_ar : header.title_en}</h2>
                <p>{isAr ? header.desc_ar : header.desc_en}</p>
            </div>

            <div className="steps-container">
                <div className={`connector-line ${inView ? 'animate-line' : ''}`}></div>
                {steps.map((step, index) => (
                    <div 
                        key={index} 
                        className={`step-card ${inView ? 'animate-step' : ''}`}
                        style={{ '--delay': index }}
                    >
                        <div className="step-icon">
                            <span>{step.num}</span>
                        </div>
                        <div className="step-content">
                            <h4>{isAr ? step.title_ar : step.title_en}</h4>
                            <p>{isAr ? step.desc_ar : step.desc_en}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Process;