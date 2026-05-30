import React, { useEffect, useState } from 'react';
import './FeaturesHome.css';
import { supabase, fetchWithCache } from '../Supabase';
import { useGlobal } from '../context/GlobalContext';
import { FaCalendarAlt, FaHeartbeat, FaFileMedical, FaUsers } from 'react-icons/fa';

const FeaturesHome = () => {
    const { isAr } = useGlobal();
    const [header, setHeader] = useState(null);
    const [cards, setCards] = useState([]);

    useEffect(() => {
        const fetchFeatures = () => {
            fetchWithCache('features_home', supabase
                .from('features_home')
                .select('*')
                .order('order_index', { ascending: true }), (data) => {
                setHeader(data.find(i => i.type === 'header'));
                const originalCards = data.filter(i => i.type === 'card');
                const modifiedCards = originalCards.map((card, idx) => {
                    if (idx === 2) {
                        return {
                            ...card,
                            icon_type: 'reports',
                            title_en: 'Secure Medical Vault',
                            title_ar: 'الخزنة الطبية الآمنة',
                            desc_en: 'Upload, encrypt, and share lab results and prescriptions with your doctors.',
                            desc_ar: 'قم بتحميل وتشفير ومشاركة نتائج المختبرات والوصفات الطبية مع أطبائك.'
                        };
                    }
                    if (idx === 3) {
                        return {
                            ...card,
                            icon_type: 'family',
                            title_en: 'Comprehensive Family Tracking',
                            title_ar: 'متابعة شاملة للعائلة',
                            desc_en: 'Monitor medication, checkups, and live vitals for your kids and parents.',
                            desc_ar: 'راقب الأدوية والفحوصات والمؤشرات الحيوية لأطفالك ووالديك.'
                        };
                    }
                    return card;
                });
                setCards(modifiedCards);
            });
        };
        fetchFeatures();
    }, []);

    const getIcon = (type) => {
        if (type === 'live') {
            return <FaHeartbeat />;
        }
        if (type === 'reports') {
            return <FaFileMedical />;
        }
        if (type === 'family') {
            return <FaUsers />;
        }
        return <FaCalendarAlt />;
    };

    if (!header || cards.length === 0) return null;

    return (
        <section className="features-home">
            <div className="features-container">
                <div className="features-left-column">
                    <div className="features-header">
                        <div className="features-label">
                            <span className="line"></span> {isAr ? header.label_ar : header.label_en}
                        </div>
                        <h2>{isAr ? header.title_ar : header.title_en}</h2>
                        <p>{isAr ? header.desc_ar : header.desc_en}</p>
                    </div>

                    <div className="feature-card last-card">
                        <div className="feature-icon">{getIcon(cards[0].icon_type)}</div>
                        <div className="feature-info">
                            <h4>{isAr ? cards[0].title_ar : cards[0].title_en}</h4>
                            <p>{isAr ? cards[0].desc_ar : cards[0].desc_en}</p>
                        </div>
                    </div>
                </div>

                <div className="features-right-column">
                    {cards.slice(1).map((card, index) => (
                        <div className="feature-card" key={index}>
                            <div className="feature-icon">{getIcon(card.icon_type)}</div>
                            <div className="feature-info">
                                <h4>{isAr ? card.title_ar : card.title_en}</h4>
                                <p>{isAr ? card.desc_ar : card.desc_en}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturesHome;