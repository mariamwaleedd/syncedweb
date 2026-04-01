import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './RepeatedPage.css';
import { supabase } from '../Supabase';
import { useGlobal } from '../context/GlobalContext';

import HeroSec from '../components/repeated/HeroSec';
import WhatIsSec from '../components/repeated/WhatIsSec';
import WhySec from '../components/repeated/WhySec';
import BenefitsSec from '../components/repeated/BenefitsSec';
import HowItHelpsSec from '../components/repeated/HowItHelpsSec';
import ScenariosSec from '../components/repeated/ScenariosSec';
import StatsSec from '../components/repeated/StatSec';
import CTASec from '../components/repeated/CTASec';

const RepeatedPage = () => {
    const { slug } = useParams();
    const { isAr } = useGlobal();
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchPageData = async () => {
            const { data: pageData } = await supabase.from('feature_details').select('*').eq('slug', slug).single();
            if (pageData) setData(pageData);
        };
        fetchPageData();
        window.scrollTo(0, 0);
    }, [slug]);

    if (!data) return null;

    return (
        <div className="rep-root-v2">
            <HeroSec 
                img={data.hero_img} 
                title={isAr ? data.title_ar : data.title_en} 
                sub={isAr ? data.sub_ar : data.sub_en} 
            />
            <WhatIsSec 
                title={isAr ? data.title_ar : data.title_en} 
                desc={isAr ? data.what_desc_ar : data.what_desc_en} 
                points={isAr ? data.what_points_ar?.split(';') || [] : data.what_points_en?.split(';') || []} 
                isAr={isAr}
            />
            <WhySec 
                desc={isAr ? data.why_desc_ar : data.why_desc_en} 
                cards={isAr ? data.why_cards_ar?.split(';') || [] : data.why_cards_en?.split(';') || []} 
                isAr={isAr}
            />
            <BenefitsSec 
                items={isAr ? data.benefit_cards_ar?.split(';') || [] : data.benefit_cards_en?.split(';') || []} 
                isAr={isAr}
            />
            <HowItHelpsSec 
                items={isAr ? data.how_items_ar?.split(';') || [] : data.how_items_en?.split(';') || []} 
                isAr={isAr}
            />
            <ScenariosSec 
                s1={isAr ? data.sc1_ar : data.sc1_en} 
                s2={isAr ? data.sc2_ar : data.sc2_en} 
                isAr={isAr}
            />
            <StatsSec 
                stats={isAr ? data.stats_ar?.split(';') || [] : data.stats_en?.split(';') || []} 
            />
            <CTASec 
                title={isAr ? data.title_ar : data.title_en} 
                desc={isAr ? data.cta_desc_ar : data.cta_desc_en} 
                isAr={isAr}
            />
        </div>
    );
};

export default RepeatedPage;