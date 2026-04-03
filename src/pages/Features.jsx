import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Features.css';
import NavBar from '../common/NavBar';
import Footer from '../common/Footer';
import TopSections from '../common/TopSections';
import { supabase } from '../Supabase';
import { useGlobal } from '../context/GlobalContext';


    useEffect(() => {
        document.title = isAr ? "سينكد | الميزات" : "Synced | Features";
    }, [isAr]);

const Features = () => {
    const { isAr } = useGlobal();
    const [features, setFeatures] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFeatures = async () => {
            const { data } = await supabase
                .from('features')
                .select('*')
                .order('order_index', { ascending: true });
            if (data) setFeatures(data);
        };
        fetchFeatures();
    }, []);

    const generateSlug = (text) => {
        return text.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    };

    const handleImgMove = (e) => {
        const img = e.currentTarget.querySelector('.feature-3d-img');
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        img.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.2)`;
    };

    const handleImgLeave = (e) => {
        const img = e.currentTarget.querySelector('.feature-3d-img');
        img.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)`;
    };

    return (
        <div className="features-root">
            <TopSections 
                titleMain={isAr ? "ما هي الميزات التي " : "What features "}
                titleItalic={isAr ? "يقدمها سينكد؟" : "does synced offer?"}
                description={isAr 
                    ? "اكتشف مجموعة واسعة من الأدوات المصممة لجعل إدارة صحة عائلتك بسيطة وفعالة." 
                    : "Discover a wide range of tools designed to make managing your family's health simple and efficient."}
            />

            <main className="features-grid-container">
                <div className="features-main-grid">
                    {features.map((item) => (
                        <div className="feature-v-card" key={item.id}>
                            <div className="card-bg-mesh"></div>
                            <span className="feat-cat-label">{isAr ? item.category_ar : item.category_en}</span>
                            
                            <div 
                                className="feat-img-interactive-area"
                                onMouseMove={handleImgMove}
                                onMouseLeave={handleImgLeave}
                            >
                                <div className="img-spotlight"></div>
                                <img src={item.img_url} alt="" className="feature-3d-img" />
                            </div>

                            <div className="feat-content-box">
                                <h3>{isAr ? item.title_ar : item.title_en}</h3>
                                <p>{isAr ? item.desc_ar : item.desc_en}</p>
                                <button 
                                    className="feat-action-btn"
                                    onClick={() => navigate(`/features/${generateSlug(item.title_en)}`)}
                                >
                                    {isAr ? item.btn_text_ar : item.btn_text_en}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default Features;