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
        document.title = isAr ? "لماذا سينكد؟" : "Why Synced?";
    }, [isAr]);

    const get = (type) => pageData.filter(i => i.type === type);
    const hero = pageData.find(i => i.type === 'hero');

    if (pageData.length === 0) return null;

    return (
        <div className="ws-page-wrapper">
            <WS_Hero data={hero} isAr={isAr} />
            <WS_WhatFor data={get('what')} isAr={isAr} />
            <WS_WhoFor data={get('who')} isAr={isAr} />
            <WS_Features data={get('feature')} isAr={isAr} />
            <WS_HowTo data={get('step')} isAr={isAr} />
            <WS_Interface isAr={isAr} />
            <WS_Video isAr={isAr} />
            <WS_WhyDownload isAr={isAr} />
            <WS_Ready isAr={isAr} />
        </div>
    );
};

export default WhySynced;