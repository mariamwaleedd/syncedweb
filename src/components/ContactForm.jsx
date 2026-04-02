import React, { useState, useEffect } from 'react';
import './ContactForm.css';
import { useGlobal } from '../context/GlobalContext';
import { supabase } from '../Supabase';
import { FaUser, FaEnvelope, FaPen, FaCommentDots, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

const ContactForm = () => {
    const { isAr } = useGlobal();
    const [ui, setUi] = useState({});
    const [formData, setFormData] = useState({ fullName: '', email: '', subject: '', message: '' });
    const [errors, setErrors] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchUI = async () => {
            const { data } = await supabase.from('contact_form_ui').select('key, en, ar');
            if (data) {
                const mappedUI = data.reduce((acc, item) => {
                    acc[item.key] = isAr ? item.ar : item.en;
                    return acc;
                }, {});
                setUi(mappedUI);
            }
        };
        fetchUI();
    }, [isAr]);

    const validate = () => {
        let tempErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.fullName.trim()) tempErrors.fullName = ui.err_name_req;
        if (!formData.email.trim()) tempErrors.email = ui.err_email_req;
        else if (!emailRegex.test(formData.email)) tempErrors.email = ui.err_email_inv;
        if (!formData.subject.trim()) tempErrors.subject = isAr ? "الموضوع مطلوب" : "Subject required";
        if (!formData.message.trim()) tempErrors.message = ui.err_msg_req;
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            setIsLoading(true);
            const { error } = await supabase.from('contact_submissions').insert([
                { 
                    full_name: formData.fullName, 
                    email: formData.email, 
                    subject: formData.subject, 
                    message: formData.message 
                }
            ]);

            if (!error) {
                setIsSubmitted(true);
                setFormData({ fullName: '', email: '', subject: '', message: '' });
            }
            setIsLoading(false);
        }
    };

    return (
        <section className="contact-form-section">
            <div className="form-container-v2">
                <div className="form-header-v2">
                    <h2>{ui.title_main}<i>{ui.title_italic}</i></h2>
                    <p>{ui.subtitle}</p>
                </div>

                <div className="form-wrapper-v2">
                    {isSubmitted ? (
                        <div className="success-message-v2">
                            <FaCheckCircle className="success-icon-v2" />
                            <h3>{ui.success_title}</h3>
                            <p>{ui.success_desc}</p>
                            <button onClick={() => setIsSubmitted(false)} className="back-btn-v2">
                                {isAr ? "إرسال رسالة أخرى" : "Send another"}
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} noValidate>
                            <div className="input-row-v2">
                                <div className={`input-group-v2 ${errors.fullName ? 'has-error' : ''}`}>
                                    <label><FaUser /> {ui.label_name}</label>
                                    <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder={ui.ph_name} />
                                    {errors.fullName && <span className="error-text-v2"><FaExclamationCircle /> {errors.fullName}</span>}
                                </div>
                                <div className={`input-group-v2 ${errors.email ? 'has-error' : ''}`}>
                                    <label><FaEnvelope /> {ui.label_email}</label>
                                    <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder={ui.ph_email} />
                                    {errors.email && <span className="error-text-v2"><FaExclamationCircle /> {errors.email}</span>}
                                </div>
                            </div>
                            <div className={`input-group-v2 ${errors.subject ? 'has-error' : ''}`}>
                                <label><FaPen /> {ui.label_subject}</label>
                                <input type="text" name="subject" value={formData.subject} onChange={handleChange} placeholder={ui.ph_subject} />
                                {errors.subject && <span className="error-text-v2"><FaExclamationCircle /> {errors.subject}</span>}
                            </div>
                            <div className={`input-group-v2 ${errors.message ? 'has-error' : ''}`}>
                                <label><FaCommentDots /> {ui.label_message}</label>
                                <textarea name="message" rows="5" value={formData.message} onChange={handleChange} placeholder={ui.ph_message}></textarea>
                                {errors.message && <span className="error-text-v2"><FaExclamationCircle /> {errors.message}</span>}
                            </div>
                            <button type="submit" className={`submit-form-btn ${isLoading ? 'btn-loading' : ''}`} disabled={isLoading}>
                                {isLoading ? ui.btn_sending : ui.btn_send}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </section>
    );
};

export default ContactForm;