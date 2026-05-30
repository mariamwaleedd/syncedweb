import React, { useEffect, useState } from 'react';
import './PlansPage.css';
import TopSections from '../common/TopSections';
import { supabase, fetchWithCache } from '../Supabase';
import { useGlobal } from '../context/GlobalContext';
import { FaCheck } from 'react-icons/fa';

const PlansPage = () => {
    const { isAr } = useGlobal();

    useEffect(() => {
        document.title = isAr ? "سينكد | الخطط" : "Synced | Plans";
    }, [isAr]);
    const [header, setHeader] = useState(null);
    const [secTitle, setSecTitle] = useState(null);
    const [plans, setPlans] = useState([]);
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [subscriberName, setSubscriberName] = useState('');
    const [subscriberEmail, setSubscriberEmail] = useState('');
    const [subSuccess, setSubSuccess] = useState(false);

    const getPlanBadge = (planName) => {
        switch (planName?.toLowerCase()) {
            case 'free':
            case 'مجاني':
                return isAr ? 'مجاني للأبد' : 'Free Forever';
            case 'pro':
            case 'برو':
                return isAr ? 'الأكثر طلباً' : 'Most Popular';
            case 'premium':
            case 'بريميوم':
                return isAr ? 'أفضل قيمة' : 'Best Value';
            default:
                return '';
        }
    };

    const handleSubscribe = (e) => {
        e.preventDefault();
        setSubSuccess(true);
    };

    const closeModal = () => {
        setSelectedPlan(null);
        setSubscriberName('');
        setSubscriberEmail('');
        setSubSuccess(false);
    };

    useEffect(() => {
        const fetchPlans = () => {
            fetchWithCache('subscription_plans', supabase
                .from('subscription_plans')
                .select('*')
                .order('order_index', { ascending: true }), (data) => {
                setHeader(data.find(i => i.type === 'header'));
                setSecTitle(data.find(i => i.type === 'section_title'));
                setPlans(data.filter(i => i.type === 'plan'));
            });
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
                        <div className={`plan-card ${plan.is_featured === true || plan.is_featured === 'true' ? 'featured' : ''} ${plan.main_en?.toLowerCase() === 'premium' ? 'premium-highlight' : ''}`} key={idx}>
                            <div className="plan-badge">{getPlanBadge(plan.main_en)}</div>
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

                            <button className="plan-btn" onClick={() => setSelectedPlan(plan)}>
                                {isAr ? plan.btn_ar : plan.btn_en}
                            </button>
                        </div>
                    ))}
                </div>
            </main>

            {selectedPlan && (
                <div className="plans-modal-overlay">
                    <div className="plans-modal-card">
                        <button className="plans-modal-close" onClick={closeModal}>
                            &times;
                        </button>
                        
                        {!subSuccess ? (
                            <form onSubmit={handleSubscribe} className="plans-modal-form">
                                <h2>{isAr ? `الاشتراك في خطة ${selectedPlan.main_ar}` : `Subscribe to ${selectedPlan.main_en}`}</h2>
                                <p className="modal-price">
                                    {isAr ? selectedPlan.price_ar : selectedPlan.price_en}
                                    <span>{isAr ? "/شهرياً" : "/month"}</span>
                                </p>
                                
                                <div className="form-group">
                                    <label>{isAr ? "الاسم الكامل" : "Full Name"}</label>
                                    <input 
                                        type="text" 
                                        required 
                                        value={subscriberName} 
                                        onChange={(e) => setSubscriberName(e.target.value)} 
                                        placeholder={isAr ? "أدخل اسمك الكامل" : "Enter your full name"} 
                                    />
                                </div>
                                <div className="form-group">
                                    <label>{isAr ? "البريد الإلكتروني" : "Email Address"}</label>
                                    <input 
                                        type="email" 
                                        required 
                                        value={subscriberEmail} 
                                        onChange={(e) => setSubscriberEmail(e.target.value)} 
                                        placeholder={isAr ? "أدخل بريدك الإلكتروني" : "Enter your email address"} 
                                    />
                                </div>
                                
                                <button type="submit" className="modal-submit-btn">
                                    {isAr ? "تأكيد الاشتراك" : "Confirm Subscription"}
                                </button>
                            </form>
                        ) : (
                            <div className="plans-modal-success">
                                <div className="success-icon">&#10004;</div>
                                <h2>{isAr ? "تم الاشتراك بنجاح!" : "Subscription Successful!"}</h2>
                                <p>
                                    {isAr 
                                        ? `شكراً لك يا ${subscriberName}. تم تسجيل اشتراكك في خطة ${selectedPlan.main_ar} بنجاح. سنرسل لك تفاصيل التأكيد على ${subscriberEmail}.`
                                        : `Thank you, ${subscriberName}! You have successfully subscribed to the ${selectedPlan.main_en} plan. We have sent the confirmation details to ${subscriberEmail}.`
                                    }
                                </p>
                                <button className="modal-close-btn" onClick={closeModal}>
                                    {isAr ? "إغلاق" : "Close"}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default PlansPage;