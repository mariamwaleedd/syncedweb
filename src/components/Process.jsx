import React, { useEffect, useState, useRef } from 'react';
import './Process.css';
import { supabase, fetchWithCache } from '../Supabase';
import { useGlobal } from '../context/GlobalContext';
import alarmClockModel from '../3d/alarm_clock.glb';

const Process = () => {
    const { isAr } = useGlobal();
    const [inView, setInView] = useState(false);
    const [header, setHeader] = useState(null);
    const [steps, setSteps] = useState([]);
    const sectionRef = useRef(null);
    const modelRef = useRef(null);

    useEffect(() => {
        const fetchData = () => {
            fetchWithCache('the_process', supabase
                .from('the_process')
                .select('*')
                .order('order_index', { ascending: true }), (data) => {
                setHeader(data.find(i => i.type === 'header'));
                setSteps(data.filter(i => i.type === 'step'));
            });
        };
        fetchData();

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) setInView(true);
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) observer.observe(sectionRef.current);

        const handleMouseMove = (e) => {
            if (!modelRef.current) return;
            const x = (e.clientX / window.innerWidth) - 0.5;
            const y = (e.clientY / window.innerHeight) - 0.5;
            
            const yaw = x * 100;
            const pitch = 75 + (y * 50);
            
            modelRef.current.cameraOrbit = `${yaw}deg ${pitch}deg auto`;
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            if (sectionRef.current) observer.unobserve(sectionRef.current);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <section className="process-section" ref={sectionRef}>
            <div className="process-top">
                <div className={`process-header ${inView ? 'animate-header' : ''}`}>
                    <div className="process-label">
                        <span className="line"></span> 
                        {header ? (isAr ? header.label_ar : header.label_en) : "THE PROCESS"}
                    </div>
                    <h2>
                        {header ? (isAr ? header.title_ar : header.title_en) : "Up and running in minutes"}
                    </h2>
                    <p>
                        {header ? (isAr ? header.desc_ar : header.desc_en) : "Loading details..."}
                    </p>
                </div>
                
                <div className={`process-model-container ${inView ? 'animate-header' : ''}`}>
                    <model-viewer 
                        ref={modelRef}
                        src={alarmClockModel} 
                        ar 
                        ar-modes="webxr scene-viewer quick-look" 
                        tone-mapping="neutral" 
                        shadow-intensity="1" 
                        autoplay 
                        disable-zoom
                        interaction-prompt="none">
                    </model-viewer>
                </div>
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