import React, { useEffect, useState } from 'react';
import './ContactUs.css';
import NavBar from '../common/NavBar';
import Footer from '../common/Footer';
import { supabase } from '../Supabase';
import { useGlobal } from '../context/GlobalContext';
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa';
import { IoSend } from 'react-icons/io5';

const ContactUs = () => {
    const { isAr } = useGlobal();
    const [data, setData] = useState([]);

    useEffect(() => {
        document.title = isAr ? "سينكد | اتصل بنا" : "Synced | Contact Us";
    }, [isAr]);

    useEffect(() => {
        const fetchContactData = async () => {
            const { data: contactData } = await supabase
                .from('contact_us')
                .select('*')
                .order('order_index', { ascending: true });
            if (contactData) setData(contactData);
        };
        fetchContactData();
    }, []);

    const getItem = (key) => data.find(i => i.key === key);
    const getList = (type) => data.filter(i => i.type === type);

    const header = getItem('top');
    const desc = getItem('desc');

    return (
        <div className="contact-page-root">
            <NavBar />
            
            <section className="contact-hero-side-by-side">
                <div className="hero-bg-layer"></div>
                <div className="hero-grid-overlay"></div>
                
                <div className="contact-hero-container">
                    <div className="contact-hero-text">
                        <h1>
                            {isAr ? header?.label_ar : header?.label_en} 
                            <i>{isAr ? header?.value_ar : header?.value_en}</i>
                        </h1>
                        <p>{isAr ? desc?.label_ar : desc?.label_en}</p>
                    </div>

                    <div className="contact-hero-form">
                        <form className="contact-form-panel side-form-card">
                            <h3>{isAr ? "اترك لنا رسالة" : "Leave Us a Message"}</h3>
                            <div className="input-group-field">
                                <label>{isAr ? "الاسم الكامل" : "Your Name"}</label>
                                <input type="text" placeholder="John Doe" required />
                            </div>
                            <div className="input-group-field">
                                <label>{isAr ? "البريد الإلكتروني" : "Email Address"}</label>
                                <input type="email" placeholder="john@example.com" required />
                            </div>
                            <div className="input-group-field">
                                <label>{isAr ? "الموضوع" : "Subject"}</label>
                                <input type="text" placeholder={isAr ? "كيف نساعدك؟" : "How can we help?"} required />
                            </div>
                            <div className="input-group-field">
                                <label>{isAr ? "الرسالة" : "Message"}</label>
                                <textarea rows="4" placeholder={isAr ? "اكتب رسالتك هنا..." : "Tell us more about your inquiry..."} required></textarea>
                            </div>
                            <button type="submit" className="form-action-btn">
                                {isAr ? "إرسال الرسالة" : "Send Message"} <IoSend />
                            </button>
                        </form>
                    </div>
                </div>
            </section>
            
            <main className="contact-info-footer-grid">
                <div className="contact-info-card info-glass">
                    <h3>{isAr ? "معلومات الاتصال" : "Contact Information"}</h3>
                    <div className="info-list">
                        {getList('info').map((item, idx) => (
                            <div className="info-entry" key={idx}>
                                <div className="entry-icon">
                                    {item.key === 'email' && <FaEnvelope />}
                                    {item.key === 'phone' && <FaPhoneAlt />}
                                    {item.key === 'address' && <FaMapMarkerAlt />}
                                </div>
                                <div className="entry-texts">
                                    <h4>{isAr ? item.label_ar : item.label_en}</h4>
                                    <p>{isAr ? item.value_ar : item.value_en}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="follow-social-card info-glass">
                    <h2>{isAr ? "تابعنا" : "Follow Us"}</h2>
                    <p>{isAr ? "ابق على تواصل معنا" : "Stay connected on social media"}</p>
                    <div className="social-icon-row">
                        <a href="#" className="social-circle"><FaFacebookF /></a>
                        <a href="#" className="social-circle"><FaTwitter /></a>
                        <a href="#" className="social-circle"><FaInstagram /></a>
                        <a href="#" className="social-circle"><FaLinkedinIn /></a>
                        <a href="#" className="social-circle"><FaYoutube /></a>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default ContactUs;