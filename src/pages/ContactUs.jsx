import React, { useEffect, useState } from 'react';
import './ContactUs.css';
import NavBar from '../common/NavBar';
import Footer from '../common/Footer';
import TopSections from '../common/TopSections';
import { supabase } from '../Supabase';
import { useGlobal } from '../context/GlobalContext';
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa';
import { IoSend } from 'react-icons/io5';

const ContactUs = () => {
    const { isAr } = useGlobal();
    const [data, setData] = useState([]);

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
        <div className="contact-root">
            <NavBar />
            <TopSections 
                titleMain={isAr ? header?.label_ar : header?.label_en}
                titleItalic={isAr ? header?.value_ar : header?.value_en}
                description={isAr ? desc?.label_ar : desc?.label_en}
            />
            
            <main className="contact-bottom-wrapper">
                <div className="contact-grid">
                    <div className="contact-info-panel panel-card">
                        <h3>{isAr ? "معلومات الاتصال" : "Contact Information"}</h3>
                        <div className="info-rows">
                            {getList('info').map((item, idx) => (
                                <div className="info-row" key={idx}>
                                    <div className="info-icon">
                                        {item.key === 'email' && <FaEnvelope />}
                                        {item.key === 'phone' && <FaPhoneAlt />}
                                        {item.key === 'address' && <FaMapMarkerAlt />}
                                    </div>
                                    <div className="info-texts">
                                        <h4>{isAr ? item.label_ar : item.label_en}</h4>
                                        <p>{isAr ? item.value_ar : item.value_en}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="hours-box">
                            <h3>{isAr ? "ساعات العمل" : "Business Hours"}</h3>
                            {getList('hours').map((item, idx) => (
                                <div className="hour-row" key={idx}>
                                    <h4>{isAr ? item.label_ar : item.label_en}</h4>
                                    <p>{isAr ? item.value_ar : item.value_en}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <form className="contact-form-panel panel-card">
                        <h3>{isAr ? "اترك لنا رسالة" : "Leave Us a Message"}</h3>
                        <div className="input-field">
                            <label>{isAr ? "الاسم" : "Your Name"}</label>
                            <input type="text" placeholder="John Doe" required />
                        </div>
                        <div className="input-field">
                            <label>{isAr ? "البريد الإلكتروني" : "Email Address"}</label>
                            <input type="email" placeholder="john@example.com" required />
                        </div>
                        <div className="input-field">
                            <label>{isAr ? "الموضوع" : "Subject"}</label>
                            <input type="text" placeholder={isAr ? "كيف نساعدك؟" : "How can we help?"} required />
                        </div>
                        <div className="input-field">
                            <label>{isAr ? "الرسالة" : "Message"}</label>
                            <textarea rows="5" placeholder={isAr ? "اكتب رسالتك هنا..." : "Tell us more about your inquiry..."} required></textarea>
                        </div>
                        <button type="submit" className="form-submit-btn">
                            {isAr ? "إرسال الرسالة" : "Send Message"} <IoSend />
                        </button>
                    </form>
                </div>

                <div className="social-follow-card">
                    <h2>{isAr ? "تابعنا" : "Follow Us"}</h2>
                    <p>{isAr ? "ابق على تواصل" : "Stay connected on social media"}</p>
                    <div className="social-icons-list">
                        <a href="#" className="soc-icon"><FaFacebookF /></a>
                        <a href="#" className="soc-icon"><FaTwitter /></a>
                        <a href="#" className="soc-icon"><FaInstagram /></a>
                        <a href="#" className="soc-icon"><FaLinkedinIn /></a>
                        <a href="#" className="soc-icon"><FaYoutube /></a>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default ContactUs;