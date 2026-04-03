import React, { useEffect, useState } from 'react';
import './WhySynced.css';
import { supabase } from '../Supabase';
import { useGlobal } from '../context/GlobalContext';

import WS_Hero from '../components/whysynced/WS_Hero';
import WS_WhatFor from '../components/whysynced/WS_WhatFor';
import WS_WhoFor from '../components/whysynced/WS_WhoFor';
import WS_Features from '../components/whysynced/WS_Features';
import WS_HowTo from '../components/whysynced/WS_HowTo';
import WS_Interface from '../components/whysynced/WS_Interface';
import WS_Video from '../components/whysynced/WS_Video';
import WS_WhyDownload from '../components/whysynced/WS_WhyDownload';
import WS_Ready from '../components/whysynced/WS_Ready';


const WhySynced = () => {
    const { isAr } = useGlobal();
    const [pageData, setPageData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await supabase.from('why_synced').select('*').order('order_index', { ascending: true });
            if (data) setPageData(data);
        };
        fetchData();
        document.title = isAr ? "سينكد | لماذا سينكد؟" : "Synced | Why Synced?";
    }, [isAr]);

    useEffect(() => {
        const observerOptions = { threshold: 0.1 };
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('ws-reveal-active');
                }
            });
        }, observerOptions);

        const sections = document.querySelectorAll('.ws-reveal');
        sections.forEach(sec => observer.observe(sec));

        return () => observer.disconnect();
    }, [pageData]);

    const get = (type) => pageData.filter(i => i.type === type);
    const hero = pageData.find(i => i.type === 'hero');

    if (pageData.length === 0) return null;

    return (
        <div className="ws-page-wrapper">
            <div className="ws-reveal"><WS_Hero data={hero} isAr={isAr} /></div>
            <div className="ws-reveal"><WS_WhatFor data={get('what')} isAr={isAr} /></div>
            <div className="ws-reveal"><WS_WhoFor data={get('who')} isAr={isAr} /></div>
            <div className="ws-reveal"><WS_Features data={get('feature')} isAr={isAr} /></div>
            <div className="ws-reveal"><WS_HowTo data={get('step')} isAr={isAr} /></div>
            <div className="ws-reveal"><WS_Interface isAr={isAr} /></div>
            <div className="ws-reveal"><WS_Video isAr={isAr} /></div>
            <div className="ws-reveal"><WS_WhyDownload isAr={isAr} /></div>
            <div className="ws-reveal"><WS_Ready isAr={isAr} /></div>
        </div>
    );
};

export default WhySynced;