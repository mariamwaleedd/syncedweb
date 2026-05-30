import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './ChatBot.css';
import { useGlobal } from '../context/GlobalContext';
import { FaComments, FaTimes, FaUser, FaHeadset, FaPaperPlane, FaInfoCircle, FaRocket, FaGlobe } from 'react-icons/fa';

const OPENROUTER_API_KEY = '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'; // <-- PASTE YOUR KEY HERE
const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';
const MODEL = 'meta-llama/llama-3.1-8b-instruct'; // Or any other OpenRouter model

const getSystemPrompt = (lang) => `You are the Synced Assistant, a helpful, friendly, and knowledgeable AI chatbot for Synced — a modern healthcare management platform.

Synced helps patients and healthcare providers manage health records, appointments, family health tracking, and more.

Your role:
- Answer questions about the Synced platform and its features
- Help users navigate the app (appointments, records, family health, messages, etc.)
- Provide general health information (but always recommend consulting a doctor for medical advice)
- Be concise, warm, and professional
- Key pages: /AboutUs (about us), /features (features), /contact (contact)

IMPORTANT: You MUST respond ONLY in ${lang === 'ar' ? 'Arabic (العربية). Every single reply must be in Arabic, no matter what language the user writes in.' : 'English. Every single reply must be in English, no matter what language the user writes in.'}

Do not make up medical diagnoses. For serious health concerns, always recommend consulting a healthcare professional.`;

const getLocalResponse = (query, lang) => {
    const isAr = lang === 'ar';
    const q = query.toLowerCase();

    // Greetings
    if (q.includes('hello') || q.includes('hi') || q.includes('hey') || q.includes('مرحبا') || q.includes('أهلاً') || q.includes('اهلا') || q.includes('سلام')) {
        return isAr 
            ? 'مرحباً بك! أنا مساعد سينكد الذكي. كيف يمكنني مساعدتك اليوم؟ يمكنك أن تسألني عن ميزات المنصة، خطط الاشتراك، أو كيفية التواصل مع الفريق.'
            : 'Hello! I am your Synced assistant. How can I help you today? You can ask me about our features, subscription plans, or how to contact our team.';
    }

    // Features
    if (q.includes('feature') || q.includes('mizat') || q.includes('ميزات') || q.includes('خدمات') || q.includes('تقديم') || q.includes('وظائف') || q.includes('ميزه') || q.includes('مزية')) {
        return isAr
            ? 'توفر منصة سينكد العديد من الميزات القوية:\n' +
              '• بوابة العائلة: إدارة السجلات الصحية لعائلتك بأكملها في مكان واحد.\n' +
              '• المؤشرات الحيوية: مراقبة المقاييس الصحية مثل نبض القلب والجلوكوز.\n' +
              '• المزامنة الذكية: مزامنة تلقائية للبيانات مع الأجهزة القابلة للارتداء.\n' +
              '• التذكيرات الطبية وتتبع المواعيد للحفاظ على صحة عائلتك.'
            : 'Synced offers several powerful features:\n' +
              '• Family Portal: Manage health records for your entire family in one place.\n' +
              '• Health Vitals: Monitor essential health metrics like heart rate and glucose.\n' +
              '• Smart Syncing: Automatically sync data across all wearable devices.\n' +
              '• Medical Reminders & Appointment Tracking to keep your family healthy and organized.';
    }

    // Plans & Prices
    if (q.includes('plan') || q.includes('price') || q.includes('sub') || q.includes('cost') || q.includes('خطة') || q.includes('سعر') || q.includes('اشتراك') || q.includes('باقة') || q.includes('اسعار') || q.includes('تكلفة')) {
        return isAr
            ? 'لدينا ثلاث خطط اشتراك تناسب احتياجاتك:\n' +
              '1. الخطة المجانية: ميزات أساسية وتتبع حتى 5 مشاريع مجاناً للأبد.\n' +
              '2. خطة برو (150 جنيه/شهرياً): مشاريع غير محدودة ودعم مميز ومزامنة ذكية.\n' +
              '3. خطة بريميوم (350 جنيه/شهرياً): كل ميزات برو بالإضافة إلى دعم مخصص على مدار الساعة وسعة تخزين غير محدودة.'
            : 'We offer three subscription plans to suit your needs:\n' +
              '1. Free Plan: Basic features and tracking for up to 5 projects forever.\n' +
              '2. Pro Plan (150 EGP/month): Unlimited projects, priority support, and smart syncing.\n' +
              '3. Premium Plan (350 EGP/month): All Pro features plus 24/7 dedicated support and unlimited storage.';
    }

    // About Us
    if (q.includes('about') || q.includes('who') || q.includes('من نحن') || q.includes('عن') || q.includes('سينكد') || q.includes('synced')) {
        return isAr
            ? 'سينكد (Synced) هي منصة رعاية صحية متطورة تهدف إلى ربط المرضى ومقدمي الرعاية الصحية بشكل ذكي ومباشر، وتسهيل تتبع البيانات الحيوية للمرضى وعائلاتهم لضمان حياة صحية مشتركة.'
            : 'Synced is a cutting-edge healthcare management platform designed to connect patients and healthcare providers seamlessly, making it easy to track health vitals and records for you and your family.';
    }

    // Contact & Support
    if (q.includes('contact') || q.includes('support') || q.includes('help') || q.includes('اتصال') || q.includes('دعم') || q.includes('فريق') || q.includes('تواصل') || q.includes('مساعدة')) {
        return isAr
            ? 'يمكنك التواصل مع فريق الدعم لدينا من خلال النقر على خيار "تحدث مع الفريق" في هذه النافذة وملء نموذج الاتصال، أو زيارة صفحة اتصل بنا المخصصة على موقعنا.'
            : 'You can contact our support team by clicking the "Talk to Team" option in this chat window and filling out the contact form, or by visiting the dedicated Contact Us page on our website.';
    }

    // Default response
    return isAr
        ? 'شكراً لرسالتك! أنا هنا لمساعدتك في استكشاف منصة سينكد (Synced). يمكنك الاستفسار عن ميزات المنصة، خطط الأسعار، أو التوجيه لصفحة الاتصال بالدعم.'
        : 'Thank you for your message! I am here to help you explore the Synced platform. Feel free to ask about our features, subscription plans, or how to contact our support team.';
};

const ChatBot = () => {
    const { isAr } = useGlobal();
    const [isOpen, setIsOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    const [mode, setMode] = useState('lang');
    const [chatLang, setChatLang] = useState(null);

    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [apiHistory, setApiHistory] = useState([]);

    const scrollRef = useRef(null);
    const inputRef = useRef(null);

    const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

    const ar = chatLang === 'ar';

    /* ── Scroll lock ─────────────────────────────────────────────── */
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    /* ── Show trigger after scrolling 300px ─────────────────────── */
    useEffect(() => {
        const onScroll = () => setIsVisible(window.scrollY > 300);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    /* ── Auto-scroll chat body ───────────────────────────────────── */
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, mode, isLoading]);

    /* ── Focus input when chat opens ─────────────────────────────── */
    useEffect(() => {
        if (isOpen && inputRef.current && mode === 'chat') {
            inputRef.current.focus();
        }
    }, [isOpen, mode]);

    /* ── Build welcome message in chosen language ─────────────────── */
    const getWelcomeMessage = (lang) => ({
        id: Date.now(),
        type: 'bot',
        text: lang === 'ar'
            ? 'مرحباً! أنا مساعد سينكد الذكي. كيف يمكنني مساعدتك اليوم؟'
            : "Hello! I'm your Synced assistant. How can I help you today?",
        options: [
            { id: 'about',    labelEn: 'About Us',         labelAr: 'عن المنصة',       link: '/AboutUs' },
            { id: 'features', labelEn: 'Explore Features',  labelAr: 'استكشف الميزات', link: '/features' },
            { id: 'human',    labelEn: 'Talk to Team',      labelAr: 'تحدث مع الفريق' },
        ],
    });

    /* ── Pick language and start conversation ─────────────────────── */
    const handleLangChoice = (lang) => {
        setChatLang(lang);
        setMessages([getWelcomeMessage(lang)]);
        setApiHistory([]);
        setMode('chat');
    };

    /* ── Toggle open/close ────────────────────────────────────────── */
    const handleToggle = () => {
        setIsOpen((prev) => !prev);
    };

    /* ── Close and reset ──────────────────────────────────────────── */
    const handleClose = () => {
        setIsOpen(false);
        // Reset so next open shows lang picker again
        setMode('lang');
        setChatLang(null);
        setMessages([]);
        setApiHistory([]);
    };

    /* ── OpenRouter API call ────────────────────────────────────────────── */
    const sendToOpenRouter = async (userText, history, lang) => {
        const newHistory = [...history, { role: 'user', content: userText }];
        setApiHistory(newHistory);

        const response = await fetch(OPENROUTER_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${OPENROUTER_API_KEY}`,
                'HTTP-Referer': window.location.href, // Required for OpenRouter rankings
                'X-Title': 'Synced Website', // Optional for OpenRouter
            },
            body: JSON.stringify({
                model: MODEL,
                messages: [{ role: 'system', content: getSystemPrompt(lang) }, ...newHistory],
                temperature: 0.7,
                max_tokens: 512,
            }),
        });

        if (!response.ok) {
            const errBody = await response.text();
            console.error('OpenRouter API error', response.status, errBody);
            throw new Error(`API ${response.status}: ${errBody}`);
        }

        const data = await response.json();
        const botText = data.choices[0].message.content;
        const updatedHistory = [...newHistory, { role: 'assistant', content: botText }];
        setApiHistory(updatedHistory);
        return botText;
    };

    /* ── Send user message ────────────────────────────────────────── */
    const handleSend = async () => {
        const text = inputValue.trim();
        if (!text || isLoading) return;

        const userMsg = { id: Date.now(), type: 'user', text };
        setMessages((prev) => [...prev, userMsg]);
        setInputValue('');
        setIsLoading(true);

        try {
            const botText = await sendToOpenRouter(text, apiHistory, chatLang);
            setMessages((prev) => [...prev, { id: Date.now() + 1, type: 'bot', text: botText }]);
        } catch (err) {
            console.error('ChatBot API error, falling back to local response:', err);
            await new Promise(resolve => setTimeout(resolve, 800));
            const localResponse = getLocalResponse(text, chatLang);
            setMessages((prev) => [
                ...prev,
                {
                    id: Date.now() + 1,
                    type: 'bot',
                    text: localResponse,
                },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const handleOptionClick = (optionId) => {
        if (optionId === 'human') setMode('form');
    };

    const handleFormChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setMode('success');
        setTimeout(() => {
            setMode('chat');
            setIsOpen(false);
            setForm({ name: '', email: '', subject: '', message: '' });
        }, 3000);
    };

    /* ── RTL direction based on chosen language ───────────────────── */
    const dir = chatLang === 'ar' ? 'rtl' : chatLang === 'en' ? 'ltr' : (isAr ? 'rtl' : 'ltr');

    return (
        <div className={`chatbot-wrapper ${dir} ${isVisible ? 'visible' : ''}`}>
            <button
                className={`chatbot-trigger ${isOpen ? 'active' : ''}`}
                onClick={handleToggle}
            >
                <span className="tooltip">{isAr ? 'تحدث معنا' : 'chat with us'}</span>
                {isOpen ? <FaTimes /> : <FaComments />}
            </button>

            {isOpen && (
                <div className={`chatbot-window ${dir}`}>
                    {/* ── Header ── */}
                    <div className="chatbot-header">
                        <div className="bot-info">
                            <div className="bot-avatar"><FaHeadset /></div>
                            <div>
                                <h4>Synced Assistant</h4>
                                <span>{ar ? 'متصل الآن' : 'Online Now'}</span>
                            </div>
                        </div>
                        <button className="close-chat" onClick={handleClose}><FaTimes /></button>
                    </div>

                    {/* ── Language picker ── */}
                    {mode === 'lang' && (
                        <div className="lang-picker">
                            <div className="lang-icon"><FaGlobe /></div>
                            <p className="lang-title">Choose your language</p>
                            <p className="lang-subtitle">اختر لغتك</p>
                            <div className="lang-btns">
                                <button className="lang-btn" onClick={() => handleLangChoice('en')}>
                                    🇬🇧 English
                                </button>
                                <button className="lang-btn lang-btn-ar" onClick={() => handleLangChoice('ar')}>
                                    🇸🇦 العربية
                                </button>
                            </div>
                        </div>
                    )}

                    {/* ── Chat body ── */}
                    {mode !== 'lang' && (
                        <div className="chatbot-body" ref={scrollRef}>
                            {mode === 'chat' && messages.map((msg) => (
                                <div key={msg.id} className={`msg-group ${msg.type === 'user' ? 'user-group' : 'bot-group'}`}>
                                    {msg.type === 'bot' ? (
                                        <>
                                            <div className="bot-bubble">{msg.text}</div>
                                            {msg.options && (
                                                <div className="bot-options">
                                                    {msg.options.map((opt) =>
                                                        opt.link ? (
                                                            <Link key={opt.id} to={opt.link} className="opt-btn" onClick={() => setIsOpen(false)}>
                                                                {opt.id === 'about' ? <FaInfoCircle /> : <FaRocket />}
                                                                {ar ? opt.labelAr : opt.labelEn}
                                                            </Link>
                                                        ) : (
                                                            <button key={opt.id} className="opt-btn" onClick={() => handleOptionClick(opt.id)}>
                                                                <FaUser />
                                                                {ar ? opt.labelAr : opt.labelEn}
                                                            </button>
                                                        )
                                                    )}
                                                </div>
                                            )}
                                        </>
                                    ) : (
                                        <div className="user-bubble">{msg.text}</div>
                                    )}
                                </div>
                            ))}

                            {isLoading && (
                                <div className="msg-group bot-group">
                                    <div className="bot-bubble typing-indicator">
                                        <span></span><span></span><span></span>
                                    </div>
                                </div>
                            )}

                            {mode === 'form' && (
                                <form className="chat-contact-form" onSubmit={handleFormSubmit}>
                                    <p className="form-intro">{ar ? 'يرجى ملء بياناتك للتواصل مع الفريق:' : 'Please fill your details to contact the team:'}</p>
                                    <div className="chat-input-group">
                                        <input type="text" name="name" placeholder={ar ? 'الاسم' : 'Name'} value={form.name} onChange={handleFormChange} required />
                                    </div>
                                    <div className="chat-input-group">
                                        <input type="email" name="email" placeholder={ar ? 'البريد الإلكتروني' : 'Email'} value={form.email} onChange={handleFormChange} required />
                                    </div>
                                    <div className="chat-input-group">
                                        <input type="text" name="subject" placeholder={ar ? 'الموضوع' : 'Subject'} value={form.subject} onChange={handleFormChange} required />
                                    </div>
                                    <div className="chat-input-group">
                                        <textarea name="message" placeholder={ar ? 'كيف يمكننا مساعدتك؟' : 'How can we help?'} value={form.message} onChange={handleFormChange} required></textarea>
                                    </div>
                                    <div className="form-btns">
                                        <button type="button" className="chat-cancel" onClick={() => setMode('chat')}>{ar ? 'إلغاء' : 'Cancel'}</button>
                                        <button type="submit" className="chat-submit">{ar ? 'إرسال' : 'Send'} <FaPaperPlane /></button>
                                    </div>
                                </form>
                            )}

                            {mode === 'success' && (
                                <div className="chat-success">
                                    <div className="success-check">✓</div>
                                    <p>{ar ? 'تم إرسال رسالتك! سيتواصل معك الفريق قريباً.' : 'Message sent! Our team will contact you soon.'}</p>
                                </div>
                            )}
                        </div>
                    )}

                    {/* ── Input bar (only in chat mode) ── */}
                    {mode === 'chat' && (
                        <div className="chatbot-input-bar">
                            <input
                                ref={inputRef}
                                type="text"
                                className="chatbot-text-input"
                                placeholder={ar ? 'اكتب رسالتك...' : 'Type your message...'}
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={handleKeyDown}
                                disabled={isLoading}
                            />
                            <button
                                className={`chatbot-send-btn ${isLoading || !inputValue.trim() ? 'disabled' : ''}`}
                                onClick={handleSend}
                                disabled={isLoading || !inputValue.trim()}
                            >
                                <FaPaperPlane />
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ChatBot;