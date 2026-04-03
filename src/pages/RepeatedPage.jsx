import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './RepeatedPage.css';
import { supabase } from '../Supabase';
import { useGlobal } from '../context/GlobalContext';
import { 
    FaStethoscope, FaInfoCircle, FaCheck, FaLightbulb, 
    FaRocket, FaUsers, FaArrowRight, FaChartLine,
    FaCommentDots, FaVideo, FaShareAlt, FaCalendarAlt, 
    FaPrescriptionBottle, FaBell 
} from 'react-icons/fa';

const RepeatedPage = () => {
    const { slug } = useParams();
    const { isAr } = useGlobal();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPageData = async () => {
            setLoading(true);
            const { data: pageData } = await supabase.from('feature_details').select('*').eq('slug', slug).single();
            if (pageData) setData(pageData);
            setLoading(false);
        };
        fetchPageData();
        window.scrollTo(0, 0);
    }, [slug, isAr]);

    if (loading || !data) return <div className="loading-state-v4"></div>;

    const splitData = (str) => str ? str.split(';') : [];
    const splitSub = (str) => str ? str.split(':') : ['', ''];
    const benefitIcons = [<FaCommentDots />, <FaVideo />, <FaShareAlt />, <FaCalendarAlt />, <FaPrescriptionBottle />, <FaBell />];
    const benefitsArr = isAr ? data.benefits_json_ar : data.benefits_json_en;

    return (
        <div className="feature-v4-root">
            <section className="f-hero-v4" style={{backgroundImage: `url(${data.hero_img})`}}>
                <div className="hero-overlay-v4"></div>
                <div className="hero-v4-content">
                    <div className="v4-icon-badge"><FaStethoscope /></div>
                    <h1>{isAr ? data.title_ar : data.title_en}</h1>
                    <h3>{isAr ? data.sub_ar : data.sub_en}</h3>
                    <p>{isAr ? data.cap_ar : data.cap_en}</p>
                </div>
            </section>

            <main className="v4-body-container">
                <section className="v4-sec">
                    <div className="glass-card-v4 what-is-v4">
                        <div className="v4-card-header">
                            <div className="header-icon-box"><FaInfoCircle /></div>
                            <h2>{isAr ? `ما هو ${data.title_ar}؟` : `What Is ${data.title_en} For?`}</h2>
                        </div>
                        <p className="v4-intro-text">{isAr ? data.what_desc_ar : data.what_desc_en}</p>
                        <div className="v4-check-grid">
                            {splitData(isAr ? data.what_points_ar : data.what_points_en).map((p, i) => (
                                <div className="v4-check-item" key={i}>
                                    <div className="v4-dot-check"><FaCheck /></div>
                                    <span>{p}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="v4-sec center-v4">
                    <div className="v4-intro-wrap">
                        <div className="v4-icon-square large"><FaLightbulb /></div>
                        <h2>{isAr ? "لماذا اخترنا هذه الميزة" : "Why We Chose This Feature"}</h2>
                        <p>{isAr ? data.why_desc_ar : data.why_desc_en}</p>
                    </div>
                    <div className="v4-why-grid">
                        {splitData(isAr ? data.why_cards_ar : data.why_cards_en).map((c, i) => (
                            <div className="v4-why-card" key={i}>
                                <span className="v4-card-index">0{i + 1}</span>
                                <p>{c}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="v4-sec center-v4">
                    <div className="v4-intro-wrap">
                        <h2>{isAr ? "الميزات الأساسية" : "Key Benefits"}</h2>
                        <p>{isAr ? "اكتشف كيف تغير هذه الميزة إدارة صحتك" : "Discover how this feature transforms your health management"}</p>
                    </div>
                    <div className="v4-benefits-grid">
                        {benefitsArr && benefitsArr.map((b, i) => (
                            <div className="v4-benefit-card" key={i}>
                                <div className="v4-benefit-icon-ring">{benefitIcons[i % 6]}</div>
                                <h4>{b.title}</h4>
                                <p>{b.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="v4-sec">
                    <div className="v4-intro-wrap center-v4">
                        <div className="v4-icon-square large"><FaRocket /></div>
                        <h2>{isAr ? "كيف يساعدك؟" : "How It Helps You:"}</h2>
                    </div>
                    <div className="v4-how-stack">
                        {splitData(isAr ? data.how_items_ar : data.how_items_en).map((h, i) => {
                            const [t, d] = splitSub(h);
                            return (
                                <div className="v4-how-item" key={i}>
                                    <h4>{t}</h4>
                                    <p>{d}</p>
                                </div>
                            );
                        })}
                    </div>
                </section>

                <section className="v4-sec center-v4">
                    <div className="v4-intro-wrap">
                        <div className="v4-icon-square large"><FaUsers /></div>
                        <h2>{isAr ? "سيناريوهات واقعية" : "Real-Life Scenarios"}</h2>
                        <p>{isAr ? "شاهد كيف تحل هذه الميزة تحديات الحياة اليومية" : "See how this feature solves everyday challenges"}</p>
                    </div>
                    <div className="v4-scenario-grid">
                        {[data.sc1_en, data.sc2_en].map((sc, i) => {
                            const text = isAr ? [data.sc1_ar, data.sc2_ar][i] : sc;
                            const [top, bottom] = text.split(' SOLUTION: ');
                            return (
                                <div className="v4-sc-card" key={i}>
                                    <div className="sc-part"><strong>SCENARIO</strong><p>{top}</p></div>
                                    <div className="sc-divider"></div>
                                    <div className="sc-part"><strong>SOLUTION</strong><p>{bottom}</p></div>
                                </div>
                            );
                        })}
                    </div>
                </section>

                <section className="v4-sec">
                    <div className="v4-stats-strip">
                        {splitData(isAr ? data.stats_ar : data.stats_en).map((s, i) => {
                            const [v, l] = splitSub(s);
                            return (
                                <div className="v4-stat-item" key={i}>
                                    <h4>{v}</h4>
                                    <p>{l}</p>
                                </div>
                            );
                        })}
                    </div>
                </section>

                <section className="v4-sec">
                    <div className="v4-cta-card">
                        <FaChartLine className="v4-cta-icon" />
                        <h2>{isAr ? `هل أنت جاهز لتجربة ${data.title_ar}؟` : `Ready to Experience ${data.title_en}?`}</h2>
                        <p>{isAr ? "قم بتحميل التطبيق اليوم وابدأ في الاستفادة من هذه الميزة القوية" : "Download the app today and start benefiting from this powerful feature"}</p>
                        <button className="v4-cta-btn">{isAr ? "تحميل الآن" : "Download Now"}</button>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default RepeatedPage;