import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './ChatBot.css';
import { useGlobal } from '../context/GlobalContext';
import { FaComments, FaTimes, FaUser, FaHeadset, FaPaperPlane, FaInfoCircle, FaRocket, FaGlobe } from 'react-icons/fa';

const GROQ_API_KEY = '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';
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const MODEL = 'llama-3.1-8b-instant';

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

    /* ── Groq API call ────────────────────────────────────────────── */
    const sendToGroq = async (userText, history, lang) => {
        const newHistory = [...history, { role: 'user', content: userText }];
        setApiHistory(newHistory);

        const response = await fetch(GROQ_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${GROQ_API_KEY}`,
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
            console.error('Groq API error', response.status, errBody);
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
            const botText = await sendToGroq(text, apiHistory, chatLang);
            setMessages((prev) => [...prev, { id: Date.now() + 1, type: 'bot', text: botText }]);
        } catch (err) {
            console.error('ChatBot error:', err);
            setMessages((prev) => [
                ...prev,
                {
                    id: Date.now() + 1,
                    type: 'bot',
                    text: ar
                        ? 'عذراً، حدث خطأ. يرجى المحاولة مرة أخرى.'
                        : `Error: ${err.message}`,
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