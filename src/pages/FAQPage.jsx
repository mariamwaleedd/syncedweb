import React, { useEffect, useState } from 'react';
import './FAQPage.css';
import TopSections from '../common/TopSections';
import { supabase } from '../Supabase';
import { useGlobal } from '../context/GlobalContext';
import { FaHeartbeat, FaUsers, FaShieldAlt, FaFileMedical, FaSearch, FaPlus } from 'react-icons/fa';

const FAQPage = () => {
    const { isAr } = useGlobal();
    const [header, setHeader] = useState(null);
    const [categories, setCategories] = useState([]);
    const [faqs, setFaqs] = useState([]);
    const [activeFaq, setActiveFaq] = useState(null);

    useEffect(() => {
        const fetchFaqData = async () => {
            const { data } = await supabase.from('faq_page').select('*').order('order_index', { ascending: true });
            if (data) {
                setHeader(data.find(i => i.type === 'header'));
                setCategories(data.filter(i => i.type === 'cat_card'));
                setFaqs(data.filter(i => i.type === 'faq'));
            }
        };
        fetchFaqData();
    }, []);

    const getIcon = (iconName) => {
        switch (iconName) {
            case 'FaHeartbeat': return <FaHeartbeat />;
            case 'FaUsers': return <FaUsers />;
            case 'FaShieldAlt': return <FaShieldAlt />;
            case 'FaFileMedical': return <FaFileMedical />;
            default: return null;
        }
    };

    const toggleFaq = (id) => setActiveFaq(activeFaq === id ? null : id);

    if (!header) return null;

    return (
        <div className="faq-page-wrapper">
            <TopSections 
                titleMain={isAr ? header.title_ar.split(' ').slice(0,2).join(' ') : header.title_en.split(' ').slice(0,3).join(' ')}
                titleItalic={isAr ? header.title_ar.split(' ').slice(2).join(' ') : header.title_en.split(' ').slice(3).join(' ')}
                description={isAr ? header.desc_ar : header.desc_en}
            />

            <div className="faq-search-bar-container">
                <div className="faq-search-input-box">
                    <FaSearch className="search-icon-faq" />
                    <input type="text" placeholder={isAr ? "عن ماذا تبحث؟" : "What are you searching for?"} />
                </div>
            </div>

            <main className="faq-main-content">
                <section className="faq-categories-section">
                    <h2>{isAr ? "عن ماذا تبحث؟" : "What are you searching for?"}</h2>
                    <div className="faq-cat-grid">
                        {categories.map((cat, idx) => (
                            <div className="faq-cat-card" key={idx}>
                                <div className="cat-icon-box">{getIcon(cat.icon_type)}</div>
                                <h4>{isAr ? cat.title_ar : cat.title_en}</h4>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="faq-list-section">
                    {categories.map((cat, catIdx) => (
                        <div className="faq-group" key={catIdx}>
                            <h3 className="group-title">{isAr ? cat.title_ar : cat.title_en}</h3>
                            <div className="faq-items-container">
                                {faqs.filter(f => f.category === cat.title_en).map((faq) => (
                                    <div 
                                        className={`faq-accordion-item ${activeFaq === faq.id ? 'active' : ''}`} 
                                        key={faq.id}
                                        onClick={() => toggleFaq(faq.id)}
                                    >
                                        <div className="faq-q-row">
                                            <span>{isAr ? faq.title_ar : faq.title_en}</span>
                                            <div className="faq-plus-btn"><FaPlus /></div>
                                        </div>
                                        <div className="faq-a-row">
                                            <p>{isAr ? faq.desc_ar : faq.desc_en}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </section>
            </main>
        </div>
    );
};

export default FAQPage;