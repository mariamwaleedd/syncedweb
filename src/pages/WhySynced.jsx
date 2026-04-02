import React, { useEffect } from 'react';
import './WhySynced.css';
import NavBar from '../common/NavBar';
import Footer from '../common/Footer';
import { useGlobal } from '../context/GlobalContext';

import WS_Hero from './../components/whysynced/WS_Hero';
import WS_WhatFor from './../components/whysynced/WS_WhatFor';
import WS_Features from './../components/whysynced/WS_Features';
import WS_HowTo from './../components/whysynced/WS_HowTo';
import WS_Interface from './../components/whysynced/WS_Interface';
import WS_Video from './../components/whysynced/WS_Video';
import WS_WhyDownload from './../components/whysynced/WS_WhyDownload';
import WS_Ready from './../components/whysynced/WS_Ready';
import WS_WhoFor from './../components/whysynced/WS_WhoFor';

const WhySynced = () => {
    const { isAr } = useGlobal();

    useEffect(() => {
        document.title = isAr ? "لماذا سينكد؟ | سينكد" : "Why Synced? | Synced";
        window.scrollTo(0, 0);
    }, [isAr]);

    return (
        <div className="why-synced-page">
            <NavBar />
            <WS_Hero />
            <WS_WhatFor />
            <WS_WhoFor />
            <WS_Features />
            <WS_HowTo />
            <WS_Interface />
            <WS_Video />
            <WS_WhyDownload />
            <WS_Ready />
            <Footer />
        </div>
    );
};

export default WhySynced;