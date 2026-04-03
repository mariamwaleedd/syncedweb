import React, { useEffect, useState, useRef } from 'react';
import './FAQPage.css';
import TopSections from '../common/TopSections';
import Footer from '../common/Footer';
import NavBar from '../common/NavBar';
import { supabase } from '../Supabase';
import { useGlobal } from '../context/GlobalContext';
import { FaHeartbeat, FaUsers, FaShieldAlt, FaFileMedical, FaSearch, FaPlus, FaPaperPlane } from 'react-icons/fa';


const FAQPage = () => {
    const { isAr } = useGlobal();

    useEffect(() => {
        document.title = isAr ? "سينكد | الأسئلة الشائعة" : "Synced | FAQ";
    }, [isAr]);
    const [header, setHeader] = useState(null);
    const [categories, setCategories] = useState([]);
    const [faqs, setFaqs] = useState([]);
    const [activeFaq, setActiveFaq] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [userQuestion, setUserQuestion] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const containerRef = useRef(null);

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

        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setSelectedCategory(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
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

    const handleCategoryClick = (e, catTitle) => {
        e.stopPropagation();
        setSelectedCategory(selectedCategory === catTitle ? null : catTitle);
    };

    const handleQuestionSubmit = async (e) => {
        e.preventDefault();
        if (!userQuestion.trim()) return;
        setIsSubmitting(true);
        const { error } = await supabase.from('user_questions').insert([{ question: userQuestion }]);
        if (!error) {
            setUserQuestion('');
            alert(isAr ? "تم إرسال سؤالك بنجاح!" : "Your question was sent successfully!");
        }
        setIsSubmitting(false);
    };

    const filteredFaqs = faqs.filter(f => {
        const matchesCategory = selectedCategory ? f.category === selectedCategory : true;
        const matchesSearch = searchTerm ? 
            (f.title_en.toLowerCase().includes(searchTerm.toLowerCase()) || 
             f.title_ar.includes(searchTerm)) : true;
        return matchesCategory && matchesSearch;
    });

    const activeCategories = selectedCategory 
        ? categories.filter(c => c.title_en === selectedCategory)
        : categories;

    if (!header) return null;

    return (
        <div className="faq-page-wrapper" onClick={() => setSelectedCategory(null)}>
            <NavBar />
            <TopSections 
                titleMain={isAr ? header.title_ar.split(' ').slice(0,2).join(' ') : header.title_en.split(' ').slice(0,3).join(' ')}
                titleItalic={isAr ? header.title_ar.split(' ').slice(2).join(' ') : header.title_en.split(' ').slice(3).join(' ')}
                description={isAr ? header.desc_ar : header.desc_en}
            />

            <div className="faq-search-bar-container" onClick={(e) => e.stopPropagation()}>
                <div className="faq-search-input-box">
                    <FaSearch className="search-icon-faq" />
                    <input 
                        type="text" 
                        placeholder={isAr ? "عن ماذا تبحث؟" : "What are you searching for?"} 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <main className="faq-main-content" ref={containerRef}>
                <section className="faq-categories-section">
                    <h2 className="faq-v2-title">{isAr ? "عن ماذا تبحث؟" : "What are you searching for?"}</h2>
                    <div className="faq-cat-grid">
                        {categories.map((cat, idx) => (
                            <div 
                                className={`faq-cat-card ${selectedCategory === cat.title_en ? 'active-cat' : ''}`} 
                                key={idx}
                                onClick={(e) => handleCategoryClick(e, cat.title_en)}
                            >
                                <div className="cat-icon-box">{getIcon(cat.icon_type)}</div>
                                <h4>{isAr ? cat.title_ar : cat.title_en}</h4>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="faq-list-section">
                    {activeCategories.map((cat, catIdx) => {
                        const catFaqs = filteredFaqs.filter(f => f.category === cat.title_en);
                        if (catFaqs.length === 0) return null;
                        
                        return (
                            <div className="faq-group" key={catIdx} onClick={(e) => e.stopPropagation()}>
                                <h3 className="group-title">{isAr ? cat.title_ar : cat.title_en}</h3>
                                <div className="faq-items-container">
                                    {catFaqs.map((faq) => (
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
                        );
                    })}
                </section>

                <section className="ask-own-question" onClick={(e) => e.stopPropagation()}>
                    <div className="ask-card">
                        <div className="ask-header">
                            <h3>{isAr ? "لم تجد إجابتك؟" : "Didn't find your answer?"}</h3>
                            <p>{isAr ? "أرسل لنا سؤالك وسنقوم بالرد عليك في أقرب وقت." : "Send us your question and we will get back to you soon."}</p>
                        </div>
                        <form className="ask-form" onSubmit={handleQuestionSubmit}>
                            <textarea 
                                placeholder={isAr ? "اكتب سؤالك هنا..." : "Type your question here..."}
                                value={userQuestion}
                                onChange={(e) => setUserQuestion(e.target.value)}
                                required
                            />
                            <button type="submit" disabled={isSubmitting}>
                                {isAr ? "إرسال السؤال" : "Send Question"} <FaPaperPlane />
                            </button>
                        </form>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default FAQPage;