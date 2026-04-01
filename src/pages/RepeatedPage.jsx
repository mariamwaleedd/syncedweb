import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './RepeatedPage.css';
import { supabase } from '../Supabase';
import { useGlobal } from '../context/GlobalContext';
import FeatureHero from '../components/FeatureHero';
import FeatureAbout from '../components/FeatureAbout';
import FeatureRationale from '../components/FeatureRationale';

const RepeatedPage = () => {
    const { slug } = useParams();
    const { isAr } = useGlobal();
    const [page, setPage] = useState(null);

    useEffect(() => {
        const fetchPage = async () => {
            const { data } = await supabase.from('feature_details').select('*').eq('slug', slug).single();
            if (data) setPage(data);
        };
        fetchPage();
        window.scrollTo(0, 0);
    }, [slug]);

    if (!page) return null;

    return (
        <div className="f-root">
            <FeatureHero 
                title={isAr ? page.title_ar : page.title_en}
                sub={isAr ? page.sub_ar : page.sub_en}
                cap={isAr ? page.cap_ar : page.cap_en}
                img={page.img}
            />

            <main className="f-container">
                <FeatureAbout 
                    title={isAr ? `ما هي ${page.title_ar}؟` : `What is ${page.title_en} For?`}
                    desc={isAr ? page.about_ar : page.about_en}
                    points={(isAr ? page.points_ar : page.points_en).split(',')}
                />

                <FeatureRationale 
                    title={isAr ? "لماذا اخترنا هذه الميزة" : "Why We Chose This Feature"}
                    desc={isAr ? page.why_ar : page.why_en}
                />

                <section className="f-scenarios">
                    <h2>{isAr ? "سيناريوهات واقعية" : "Real-Life Scenarios"}</h2>
                    <div className="f-sc-grid">
                        <div className="f-sc-card">
                            <span className="f-tag">SCENARIO 01</span>
                            <p>{isAr ? page.sc1_ar : page.sc1_en}</p>
                        </div>
                        <div className="f-sc-card">
                            <span className="f-tag">SCENARIO 02</span>
                            <p>{isAr ? page.sc2_ar : page.sc2_en}</p>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default RepeatedPage;