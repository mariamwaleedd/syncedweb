import React, { useEffect, useState } from 'react';
import './PatientStories.css';
import { supabase } from '../Supabase';
import { useGlobal } from '../context/GlobalContext';

const UserIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
    </svg>
);

const Stars = ({ rating = 5 }) => (
    <div className="star-rating">
        {[...Array(5)].map((_, i) => (
            <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill={i < rating ? "white" : "rgba(255,255,255,0.2)"}>
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
        ))}
    </div>
);

const PatientStories = () => {
    const { isAr } = useGlobal();
    const [header, setHeader] = useState(null);
    const [cards, setCards] = useState([]);
    const [bar, setBar] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    
    const [newReview, setNewReview] = useState({
        name: '',
        role: '',
        content: '',
        rating: 5
    });

    const fetchTestimonials = async () => {
        const { data, error } = await supabase
            .from('testimonials')
            .select('*')
            .order('order_index', { ascending: true });
        
        if (data && data.length > 0) {
            setHeader(data.find(i => i.type === 'header'));
            setCards(data.filter(i => i.type === 'card'));
            setBar(data.find(i => i.type === 'bar'));
        }
    };

    useEffect(() => {
        fetchTestimonials();
    }, []);

    const handleInputChange = (e) => {
        setNewReview({ ...newReview, [e.target.name]: e.target.value });
    };

    const submitReview = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        
        const { error } = await supabase
            .from('testimonials')
            .insert([{
                type: 'card',
                variant: 'normal',
                name_en: newReview.name,
                name_ar: newReview.name,
                role_en: newReview.role,
                role_ar: newReview.role,
                content_en: newReview.content,
                content_ar: newReview.content,
                order_index: cards.length + 1
            }]);

        if (!error) {
            setIsModalOpen(false);
            setNewReview({ name: '', role: '', content: '', rating: 5 });
            fetchTestimonials();
        }
        setSubmitting(false);
    };

    if (cards.length === 0 && !header) return null;

    return (
        <section className="stories-section">
            <div className="stories-header">
                <div className="stories-label">
                    <span className="line"></span> {isAr ? header?.label_ar : header?.label_en}
                </div>
                <h2>{isAr ? header?.title_ar : header?.title_en}</h2>
                <p>{isAr ? header?.desc_ar : header?.desc_en}</p>
            </div>

            <div className="stories-grid">
                {cards.map((card, index) => (
                    <div className={`story-card ${card.variant}`} key={index}>
                        <p className="testimonial">
                            "{isAr ? card.content_ar : card.content_en}"
                        </p>
                        <div className="card-footer">
                            <Stars />
                            <div className="user-info">
                                <div className="user-avatar"><UserIcon /></div>
                                <div>
                                    <h5>{isAr ? card.name_ar : card.name_en}</h5>
                                    <span>{isAr ? card.role_ar : card.role_en}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="stories-bar">
                <div className="avatar-stack-container">
                    <div className="avatar-stack">
                        {[1, 2, 3, 4, 5, 6].map(i => (
                            <div key={i} className="stack-item" style={{backgroundColor: i % 2 === 0 ? '#FFFFFF' : '#A3D6FF'}}>
                                <UserIcon />
                            </div>
                        ))}
                    </div>
                    <span className="count-text">{bar?.count_text || "+30"}</span>
                </div>
                <button className="write-review-btn" onClick={() => setIsModalOpen(true)}>
                    {isAr ? "اكتب مراجعتك" : "Write Your Review"}
                    <div className="btn-circle">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                            <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                    </div>
                </button>
            </div>

            {isModalOpen && (
                <div className="review-modal-overlay">
                    <div className="review-modal-content">
                        <button className="close-modal" onClick={() => setIsModalOpen(false)}>&times;</button>
                        <div className="modal-header">
                            <h3>{isAr ? "أضف مراجعتك" : "Add Your Review"}</h3>
                            <p>{isAr ? "شاركنا تجربتك مع سينكد" : "Share your experience with Synced"}</p>
                        </div>
                        <form onSubmit={submitReview}>
                            <div className="modal-input-group">
                                <label>{isAr ? "الاسم" : "Full Name"}</label>
                                <input type="text" name="name" value={newReview.name} onChange={handleInputChange} required />
                            </div>
                            <div className="modal-input-group">
                                <label>{isAr ? "الوظيفة أو الدور" : "Role (e.g. Family Member)"}</label>
                                <input type="text" name="role" value={newReview.role} onChange={handleInputChange} required />
                            </div>
                            <div className="modal-input-group">
                                <label>{isAr ? "المراجعة" : "Your Testimonial"}</label>
                                <textarea name="content" rows="4" value={newReview.content} onChange={handleInputChange} required></textarea>
                            </div>
                            <button type="submit" className="modal-submit-btn" disabled={submitting}>
                                {submitting ? (isAr ? "جاري الإرسال..." : "Sending...") : (isAr ? "نشر المراجعة" : "Post Review")}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </section>
    );
};

export default PatientStories;