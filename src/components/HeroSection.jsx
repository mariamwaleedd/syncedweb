import React, { useEffect, useState } from 'react';
import './HeroSection.css';
import { supabase } from '../Supabase';
import { useGlobal } from '../context/GlobalContext';

const HeroSection = () => {
    const { isAr } = useGlobal();
    const [content, setContent] = useState(null);

    useEffect(() => {
        const fetchHeroData = async () => {
            const { data } = await supabase
                .from('site_content')
                .select('*')
                .eq('section_id', 'hero')
                .single();
            
            if (data) setContent(data);
        };
        fetchHeroData();
    }, []);

    if (!content) return null;

    return (
        <section className="hero-container">
            <div className="video-background">
                {content.video_link && (
                    <video 
                        key={content.video_link}
                        autoPlay 
                        loop 
                        muted 
                        playsInline 
                        preload="metadata" 
                        className="main-video"
                    >
                        <source src={content.video_link} type="video/mp4" />
                    </video>
                )}
                <div className="overlay"></div>
            </div>

            <div className="hero-content">
                <h2 className="hero-subtitle">
                    {isAr ? content.label_ar : content.label_en}
                </h2>
                <h1 className="hero-title">
                    {isAr ? content.title_ar : content.title_en}
                </h1>
                <p className="hero-description">
                    {isAr ? content.desc_ar : content.desc_en}
                </p>
            </div>
        </section>
    );
};

export default HeroSection;