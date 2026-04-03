import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './ChatBot.css';
import { useGlobal } from '../context/GlobalContext';
import { FaComments, FaTimes, FaUser, FaHeadset, FaPaperPlane, FaInfoCircle, FaRocket } from 'react-icons/fa';

const ChatBot = () => {
    const { isAr } = useGlobal();
    const [isOpen, setIsOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [mode, setMode] = useState('chat'); 
    const [history, setHistory] = useState([]);
    const scrollRef = useRef(null);

    const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

    const initialMessages = [
        {
            id: 1,
            type: 'bot',
            textEn: "Hello! I'm your Synced assistant. How can I help you today?",
            textAr: "مرحباً! أنا مساعد سينكد الذكي. كيف يمكنني مساعدتك اليوم؟",
            options: [
                { id: 'about', labelEn: 'About Us', labelAr: 'عن المنصة', link: '/AboutUs' },
                { id: 'features', labelEn: 'Explore Features', labelAr: 'استكشف الميزات', link: '/features' },
                { id: 'human', labelEn: 'Talk to Team', labelAr: 'تحدث مع الفريق' }
            ]
        }
    ];

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    useEffect(() => {
        setHistory(initialMessages);
    }, [isAr]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [history, mode]);

    const handleOptionClick = (optionId) => {
        if (optionId === 'human') {
            setMode('form');
        }
    };

    const handleFormChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setMode('success');
        setTimeout(() => {
            setMode('chat');
            setIsOpen(false);
            setForm({ name: '', email: '', subject: '', message: '' });
        }, 3000);
    };

    return (
        <div className={`chatbot-wrapper ${isAr ? 'rtl' : 'ltr'} ${isVisible ? 'visible' : ''}`}>
            <button className={`chatbot-trigger ${isOpen ? 'active' : ''}`} onClick={() => setIsOpen(!isOpen)}>
                <span className="tooltip">{isAr ? 'تحدث معنا' : 'chat with us'}</span>
                {isOpen ? <FaTimes /> : <FaComments />}
            </button>

            {isOpen && (
                <div className="chatbot-window">
                    <div className="chatbot-header">
                        <div className="bot-info">
                            <div className="bot-avatar"><FaHeadset /></div>
                            <div>
                                <h4>Synced Assistant</h4>
                                <span>{isAr ? 'متصل الآن' : 'Online Now'}</span>
                            </div>
                        </div>
                        <button className="close-chat" onClick={() => setIsOpen(false)}><FaTimes /></button>
                    </div>

                    <div className="chatbot-body" ref={scrollRef}>
                        {mode === 'chat' && history.map((msg) => (
                            <div key={msg.id} className="bot-msg-group">
                                <div className="bot-bubble">
                                    {isAr ? msg.textAr : msg.textEn}
                                </div>
                                <div className="bot-options">
                                    {msg.options?.map((opt) => (
                                        opt.link ? (
                                            <Link key={opt.id} to={opt.link} className="opt-btn" onClick={() => setIsOpen(false)}>
                                                {opt.id === 'about' ? <FaInfoCircle /> : <FaRocket />}
                                                {isAr ? opt.labelAr : opt.labelEn}
                                            </Link>
                                        ) : (
                                            <button key={opt.id} className="opt-btn" onClick={() => handleOptionClick(opt.id)}>
                                                <FaUser />
                                                {isAr ? opt.labelAr : opt.labelEn}
                                            </button>
                                        )
                                    ))}
                                </div>
                            </div>
                        ))}

                        {mode === 'form' && (
                            <form className="chat-contact-form" onSubmit={handleFormSubmit}>
                                <p className="form-intro">{isAr ? "يرجى ملء بياناتك للتواصل مع الفريق:" : "Please fill your details to contact the team:"}</p>
                                <div className="chat-input-group">
                                    <input type="text" name="name" placeholder={isAr ? "الاسم" : "Name"} value={form.name} onChange={handleFormChange} required />
                                </div>
                                <div className="chat-input-group">
                                    <input type="email" name="email" placeholder={isAr ? "البريد الإلكتروني" : "Email"} value={form.email} onChange={handleFormChange} required />
                                </div>
                                <div className="chat-input-group">
                                    <input type="text" name="subject" placeholder={isAr ? "الموضوع" : "Subject"} value={form.subject} onChange={handleFormChange} required />
                                </div>
                                <div className="chat-input-group">
                                    <textarea name="message" placeholder={isAr ? "كيف يمكننا مساعدتك؟" : "How can we help?"} value={form.message} onChange={handleFormChange} required></textarea>
                                </div>
                                <div className="form-btns">
                                    <button type="button" className="chat-cancel" onClick={() => setMode('chat')}>{isAr ? "إلغاء" : "Cancel"}</button>
                                    <button type="submit" className="chat-submit">{isAr ? "إرسال" : "Send"} <FaPaperPlane /></button>
                                </div>
                            </form>
                        )}

                        {mode === 'success' && (
                            <div className="chat-success">
                                <div className="success-check">✓</div>
                                <p>{isAr ? "تم إرسال رسالتك! سيتواصل معك الفريق قريباً." : "Message sent! Our team will contact you soon."}</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChatBot;