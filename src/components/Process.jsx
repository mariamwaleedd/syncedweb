import React, { useEffect, useState, useRef } from 'react';
import './Process.css';

const Process = () => {
    const [inView, setInView] = useState(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                }
            },
            { threshold: 0.2 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    const steps = [
        {
            num: "01",
            title: "Create Your Profile",
            desc: "Enter basic health information, conditions, medications, and allergies to personalize your experience."
        },
        {
            num: "02",
            title: "Connect Devices",
            desc: "Link your wearables and smart devices. It automatically begins importing your health history."
        },
        {
            num: "03",
            title: "Add Your Family",
            desc: "Invite family members to share their health data, or create managed profiles for children and elders."
        },
        {
            num: "04",
            title: "Stay in the Know",
            desc: "Receive daily health summaries, anomaly alerts, appointment reminders, and actionable insights."
        }
    ];

    return (
        <section className="process-section" ref={sectionRef}>
            <div className={`process-header ${inView ? 'animate-header' : ''}`}>
                <div className="process-label">
                    <span className="line"></span> THE PROCESS
                </div>
                <h2>Up and running <br /> in <i>minutes</i></h2>
                <p>No complex setup, no paperwork, Your health ecosystem is ready to go from day one.</p>
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
                            <h4>{step.title}</h4>
                            <p>{step.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Process;