import React, { useEffect, useState } from 'react';
import './PlansPage.css';
import TopSections from '../common/TopSections';
import { supabase } from '../Supabase';
import { useGlobal } from '../context/GlobalContext';
import { FaCheck } from 'react-icons/fa';

const PlansPage = () => {
    const { isAr } = useGlobal();
    const [header, setHeader] = useState(null);
    const [secTitle, setSecTitle] = useState(null);
    const [plans, setPlans] = useState([]);

    useEffect(() => {
        const fetchPlans = async () => {
            const { data } = await supabase
                .from('subscription_plans')
                .select('*')
                .order('order_index', { ascending: true });
            
            if (data) {
                setHeader(data.find(i => i.type === 'header'));
                setSecTitle(data.find(i => i.type === 'section_title'));
                setPlans(data.filter(i => i.type === 'plan'));
            }
        };
        fetchPlans();
    }, []);

    if (!header) return null;

    return (
        <div className="plans-page-root">
            <TopSections 
                titleMain={isAr ? header.main_ar : header.main_en}
                titleItalic={isAr ? header.italic_ar : header.italic_en}
                description={isAr ? header.desc_ar : header.desc_en}
            />

            <main className="plans-content">
                <div className="plans-intro">
                    <h2>
                        {isAr ? secTitle?.main_ar : secTitle?.main_en} 
                        <i>{isAr ? secTitle?.italic_ar : secTitle?.italic_en}</i>
                    </h2>
                    <p>{isAr ? secTitle?.desc_ar : secTitle?.desc_en}</p>
                </div>

                <div className="plans-grid">
                    {plans.map((plan, idx) => (
                        <div className={`plan-card ${plan.is_featured ? 'featured' : ''}`} key={idx}>
                            {plan.is_featured && (
                                <div className="plan-badge">{isAr ? plan.badge_ar : plan.badge_en}</div>
                            )}
                            <h3 className="plan-name">{isAr ? plan.main_ar : plan.main_en}</h3>
                            <div className="plan-price">
                                {isAr ? plan.price_ar : plan.price_en}
                                <span>{isAr ? "/شهرياً" : "/month"}</span>
                            </div>

                            <ul className="plan-features">
                                {(isAr ? plan.features_ar : plan.features_en).split(',').map((feat, fIdx) => (
                                    <li key={fIdx}>
                                        <FaCheck className="check-icon" /> {feat}
                                    </li>
                                ))}
                            </ul>

                            <button className="plan-btn">
                                {isAr ? plan.btn_ar : plan.btn_en}
                            </button>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default PlansPage;