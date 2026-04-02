import React, { useEffect, useState } from 'react';
import './TakeControl.css';
import { supabase } from '../Supabase';
import { useGlobal } from '../context/GlobalContext';
import { Link } from 'react-router-dom';
import { FaTimes, FaMobileAlt, FaUserPlus, FaLink, FaUsers, FaArrowRight } from 'react-icons/fa';

const TakeControl = () => {
    const { isAr } = useGlobal();
    const [data, setData] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const { data: sectionData } = await supabase
                .from('hero_extra_sections')
                .select('*')
                .eq('section_id', 'take_control')
                .single();
            if (sectionData) setData(sectionData);
        };
        fetchData();
    }, []);

    if (!data) return null;

    const tutorialSteps = [
        {
            icon: <FaMobileAlt />,
            titleEn: "Install App",
            titleAr: "تثبيت التطبيق",
            descEn: "Download Synced from the App Store or Play Store.",
            descAr: "قم بتحميل سينكد من متجر التطبيقات أو متجر بلاي."
        },
        {
            icon: <FaUserPlus />,
            titleEn: "Setup Profile",
            titleAr: "إعداد الملف",
            descEn: "Create your personal health identity in seconds.",
            descAr: "أنشئ هويتك الصحية الشخصية في ثوانٍ."
        },
        {
            icon: <FaLink />,
            titleEn: "Sync Devices",
            titleAr: "ربط الأجهزة",
            descEn: "Connect your wearables to start tracking live vitals.",
            descAr: "اربط أجهزتك القابلة للارتداء لبدء تتبع المؤشرات."
        },
        {
            icon: <FaUsers />,
            titleEn: "Add Family",
            titleAr: "إضافة العائلة",
            descEn: "Invite loved ones to create a unified health circle.",
            descAr: "ادعُ أحباءك لإنشاء دائرة صحية موحدة."
        }
    ];

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
                        <a href="https://www.apple.com/app-store/" target="_blank" rel="noreferrer" className="btn-download">
                            {isAr ? data.btn1_ar : data.btn1_en}
                        </a>
                        <button className="btn-demo" onClick={() => setShowModal(true)}>
                            {isAr ? data.btn2_ar : data.btn2_en}
                        </button>
                    </div>
                </div>
            </div>

            {showModal && (
                <div className="demo-modal-overlay">
                    <div className="demo-modal-card landscape">
                        <button className="demo-close-btn" onClick={() => setShowModal(false)}>
                            <FaTimes />
                        </button>
                        <div className="demo-header">
                            <h2>{isAr ? "كيف يعمل سينكد؟" : "How Synced Works"}</h2>
                            <p>{isAr ? "دليلك السريع للبدء في رحلتك الصحية" : "Your quick guide to starting your health journey"}</p>
                        </div>
                        <div className="demo-steps-landscape-grid">
                            {tutorialSteps.map((step, index) => (
                                <div className="demo-step-card" key={index}>
                                    <div className="demo-step-icon">{step.icon}</div>
                                    <h4>{isAr ? step.titleAr : step.titleEn}</h4>
                                    <p>{isAr ? step.descAr : step.descEn}</p>
                                </div>
                            ))}
                        </div>
                        <div className="demo-footer">
                            <Link to="/features" className="demo-explore-btn" onClick={() => setShowModal(false)}>
                                {isAr ? "استكشف الميزات" : "Explore Features"} <FaArrowRight />
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default TakeControl;