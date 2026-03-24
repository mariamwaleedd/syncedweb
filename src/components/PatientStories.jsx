import React from 'react';
import './PatientStories.css';

const UserIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
    </svg>
);

const Stars = () => (
    <div className="star-rating">
        {[...Array(5)].map((_, i) => (
            <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="white">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
        ))}
    </div>
);

const PatientStories = () => {
    return (
        <section className="stories-section">
            <div className="stories-header">
                <div className="stories-label">
                    <span className="line"></span> PATIENT STORIES
                </div>
                <h2>What our users say <br /> about <i>Synced</i></h2>
                <p>Real feedback from real families who made their health a priority.</p>
            </div>

            <div className="stories-grid">
                <div className="story-card tall">
                    <p className="testimonial">
                        "Synced completely changed how I manage my mother's diabetes. I get 
                        instant alerts when her blood sugar spikes, and her doctor can see 
                        the same data during consultations. The peace of mind is genuinely 
                        priceless. I wish this had existed 10 years ago."
                    </p>
                    <div className="card-footer">
                        <Stars />
                        <div className="user-info">
                            <div className="user-avatar"><UserIcon /></div>
                            <div>
                                <h5>Rania Mohamed</h5>
                                <span>Family Plan Member</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="story-card">
                    <p className="testimonial">
                        "The medication reminder system alone saves me every single day. 
                        I take 4 medications and never miss a dose anymore."
                    </p>
                    <div className="card-footer">
                        <Stars />
                        <div className="user-info">
                            <div className="user-avatar"><UserIcon /></div>
                            <div>
                                <h5>Rania Mohamed</h5>
                                <span>Family Plan Member</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="story-card">
                    <p className="testimonial">
                        "As a physician, seeing patients arrive with structured data cuts 
                        consultation time in half. The reports are excellent."
                    </p>
                    <div className="card-footer">
                        <Stars />
                        <div className="user-info">
                            <div className="user-avatar"><UserIcon /></div>
                            <div>
                                <h5>Rania Mohamed</h5>
                                <span>Family Plan Member</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="story-card wide">
                    <p className="testimonial">
                        "The family portal is beautifully designed. I monitor all four of my 
                        kids and my parents from one screen. Absolute game changer."
                    </p>
                    <div className="card-footer">
                        <Stars />
                        <div className="user-info">
                            <div className="user-avatar"><UserIcon /></div>
                            <div>
                                <h5>Rania Mohamed</h5>
                                <span>Family Plan Member</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="stories-bar">
                <div className="avatar-stack-container">
                    <div className="avatar-stack">
                        <div className="stack-item" style={{backgroundColor: '#A3D6FF'}}><UserIcon /></div>
                        <div className="stack-item" style={{backgroundColor: '#FFFFFF'}}><UserIcon /></div>
                        <div className="stack-item" style={{backgroundColor: '#64B5F6'}}><UserIcon /></div>
                        <div className="stack-item" style={{backgroundColor: '#FFFFFF'}}><UserIcon /></div>
                        <div className="stack-item" style={{backgroundColor: '#A3D6FF'}}><UserIcon /></div>
                        <div className="stack-item" style={{backgroundColor: '#64B5F6'}}><UserIcon /></div>
                    </div>
                    <span className="count-text">+30</span>
                </div>
                <button className="write-review-btn">
                    Write Your Review
                    <div className="btn-circle">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                            <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                    </div>
                </button>
            </div>
        </section>
    );
};

export default PatientStories;