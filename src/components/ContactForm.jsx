import React, { useState } from 'react';
import './ContactForm.css';
import { useGlobal } from '../context/GlobalContext';
import { FaUser, FaEnvelope, FaPen, FaCommentDots, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

const ContactForm = () => {
    const { isAr } = useGlobal();
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        subject: '',
        message: ''
    });

    const [errors, setErrors] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const validate = () => {
        let tempErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!formData.fullName.trim()) {
            tempErrors.fullName = isAr ? "الاسم الكامل مطلوب" : "Full name is required";
        } else if (formData.fullName.length < 3) {
            tempErrors.fullName = isAr ? "يجب أن يكون الاسم 3 أحرف على الأقل" : "Name must be at least 3 characters";
        }

        if (!formData.email.trim()) {
            tempErrors.email = isAr ? "البريد الإلكتروني مطلوب" : "Email is required";
        } else if (!emailRegex.test(formData.email)) {
            tempErrors.email = isAr ? "البريد الإلكتروني غير صالح" : "Email is not valid";
        }

        if (!formData.subject.trim()) {
            tempErrors.subject = isAr ? "الموضوع مطلوب" : "Subject is required";
        }

        if (!formData.message.trim()) {
            tempErrors.message = isAr ? "الرسالة مطلوبة" : "Message is required";
        } else if (formData.message.length < 10) {
            tempErrors.message = isAr ? "يجب أن تكون الرسالة 10 أحرف على الأقل" : "Message must be at least 10 characters";
        }

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (errors[name]) {
            setErrors({ ...errors, [name]: '' });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            setIsLoading(true);
            setTimeout(() => {
                setIsLoading(false);
                setIsSubmitted(true);
                setFormData({ fullName: '', email: '', subject: '', message: '' });
                setTimeout(() => setIsSubmitted(false), 5000);
            }, 1500);
        }
    };

    return (
        <section className="contact-form-section">
            <div className="form-container-v2">
                <div className="form-header-v2">
                    <h2>{isAr ? "أرسل لنا " : "Send Us a "}<i>{isAr ? "رسالة" : "Message"}</i></h2>
                    <p>{isAr ? "نحن هنا لمساعدتك في أي استفسار طبي أو تقني." : "We are here to help with any medical or technical inquiry."}</p>
                </div>

                <div className="form-wrapper-v2">
                    {isSubmitted ? (
                        <div className="success-message-v2">
                            <FaCheckCircle className="success-icon-v2" />
                            <h3>{isAr ? "تم الإرسال بنجاح!" : "Sent Successfully!"}</h3>
                            <p>{isAr ? "سنقوم بالرد عليك في أقرب وقت ممكن." : "We will get back to you as soon as possible."}</p>
                            <button onClick={() => setIsSubmitted(false)} className="back-btn-v2">
                                {isAr ? "إرسال رسالة أخرى" : "Send another message"}
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} noValidate>
                            <div className="input-row-v2">
                                <div className={`input-group-v2 ${errors.fullName ? 'has-error' : ''}`}>
                                    <label><FaUser /> {isAr ? "الاسم الكامل" : "Full Name"}</label>
                                    <input 
                                        type="text" 
                                        name="fullName" 
                                        value={formData.fullName} 
                                        onChange={handleChange} 
                                        placeholder={isAr ? "مريم وليد" : "Mariam Waleed"}
                                    />
                                    {errors.fullName && <span className="error-text-v2"><FaExclamationCircle /> {errors.fullName}</span>}
                                </div>

                                <div className={`input-group-v2 ${errors.email ? 'has-error' : ''}`}>
                                    <label><FaEnvelope /> {isAr ? "البريد الإلكتروني" : "Email Address"}</label>
                                    <input 
                                        type="email" 
                                        name="email" 
                                        value={formData.email} 
                                        onChange={handleChange} 
                                        placeholder="hello@synced.com"
                                    />
                                    {errors.email && <span className="error-text-v2"><FaExclamationCircle /> {errors.email}</span>}
                                </div>
                            </div>

                            <div className={`input-group-v2 ${errors.subject ? 'has-error' : ''}`}>
                                <label><FaPen /> {isAr ? "الموضوع" : "Subject"}</label>
                                <input 
                                    type="text" 
                                    name="subject" 
                                    value={formData.subject} 
                                    onChange={handleChange} 
                                    placeholder={isAr ? "كيف يمكننا مساعدتك؟" : "How can we help you?"}
                                />
                                {errors.subject && <span className="error-text-v2"><FaExclamationCircle /> {errors.subject}</span>}
                            </div>

                            <div className={`input-group-v2 ${errors.message ? 'has-error' : ''}`}>
                                <label><FaCommentDots /> {isAr ? "الرسالة" : "Message"}</label>
                                <textarea 
                                    name="message" 
                                    rows="5" 
                                    value={formData.message} 
                                    onChange={handleChange} 
                                    placeholder={isAr ? "اكتب تفاصيل استفسارك هنا..." : "Type your inquiry details here..."}
                                ></textarea>
                                {errors.message && <span className="error-text-v2"><FaExclamationCircle /> {errors.message}</span>}
                            </div>

                            <button type="submit" className={`submit-form-btn ${isLoading ? 'btn-loading' : ''}`} disabled={isLoading}>
                                {isLoading ? (isAr ? "جاري الإرسال..." : "Sending...") : (isAr ? "إرسال الرسالة" : "Send Message")}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </section>
    );
};

export default ContactForm;