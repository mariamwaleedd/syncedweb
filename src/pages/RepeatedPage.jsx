import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './RepeatedPage.css';
import { supabase } from '../Supabase';
import { useGlobal } from '../context/GlobalContext';
import NavBar from '../common/NavBar';
import Footer from '../common/Footer';
import { 
    FaStethoscope, FaInfoCircle, FaCheck, FaLightbulb, 
    FaShieldAlt, FaRocket, FaUsers, FaArrowRight, 
    FaCommentDots, FaVideo, FaShareAlt, FaCalendarAlt, 
    FaPrescriptionBottle, FaBell, FaChartLine 
} from 'react-icons/fa';

const RepeatedPage = () => {
    const { slug } = useParams();
    const { isAr } = useGlobal();
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchPageData = async () => {
            const { data: pageData } = await supabase.from('feature_details').select('*').eq('slug', slug).single();
            if (pageData) {
                setData(pageData);
                document.title = isAr ? `${pageData.title_ar} | سينكد` : `${pageData.title_en} | Synced`;
            }
        };
        fetchPageData();
        window.scrollTo(0, 0);
    }, [slug, isAr]);

    if (!data) return null;

    const splitData = (str) => str ? str.split(';') : [];
    const splitSub = (str) => str ? str.split(':') : ['', ''];
    const splitPipe = (str) => str ? str.split('|') : ['', ''];
    const benefitIcons = [<FaCommentDots />, <FaVideo />, <FaShareAlt />, <FaCalendarAlt />, <FaPrescriptionBottle />, <FaBell />];

    return (
        <div className="feature-dynamic-root">
            <NavBar />
            <section className="f-hero-fullscreen" style={{backgroundImage: `url(${data.hero_img})`}}>
                <div className="f-hero-overlay-solid"></div>
                <div className="f-hero-text-align">
                    <div className="f-hero-tag"><FaStethoscope /></div>
                    <h1>{isAr ? data.title_ar : data.title_en}</h1>
                    <h3>{isAr ? data.sub_ar : data.sub_en}</h3>
                    <p>{isAr ? data.cap_ar : data.cap_en}</p>
                </div>
            </section>

            <div className="f-page-body">
                <section className="f-body-section">
                    <div className="f-glass-panel-main">
                        <div className="f-panel-header-row">
                            <div className="f-header-icon-square"><FaInfoCircle /></div>
                            <h2>{isAr ? `ما هو ${data.title_ar}؟` : `What Is ${data.title_en} For?`}</h2>
                        </div>
                        <p className="f-panel-big-text">{isAr ? data.what_desc_ar : data.what_desc_en}</p>
                        <div className="f-points-grid-wrapper">
                            {splitData(isAr ? data.what_points_ar : data.what_points_en).map((p, i) => (
                                <div className="f-point-v3" key={i}>
                                    <div className="f-check-box"><FaCheck /></div>
                                    <span>{p}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="f-body-section text-center">
                    <div className="f-section-intro">
                        <h2>{isAr ? "الميزات الأساسية" : "Key Benefits"}</h2>
                    </div>
                    <div className="f-benefits-grid-exact">
                        {splitData(isAr ? data.benefits_json_ar : data.benefits_json_en).map((b, i) => {
                            const [title, desc] = splitPipe(b);
                            return (
                                <div className="f-benefit-card-v3" key={i}>
                                    <div className="f-benefit-icon-padded">{benefitIcons[i]}</div>
                                    <h4>{title}</h4>
                                    <p>{desc}</p>
                                </div>
                            );
                        })}
                    </div>
                </section>

                <section className="f-body-section">
                    <div className="f-cta-banner-v3">
                        <FaChartLine className="f-cta-icon-large" />
                        <h2>{isAr ? data.cta_desc_ar : data.cta_desc_en}</h2>
                        <button className="f-cta-button-v3">
                            {isAr ? "ابدأ الآن" : "Get Started"} <FaArrowRight />
                        </button>
                    </div>
                </section>
            </div>
            <Footer />
        </div>
    );
};

export default RepeatedPage;