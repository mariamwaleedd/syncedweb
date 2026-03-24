import React from 'react';
import './FeaturesHome.css';

const FeaturesHome = () => {
    const liveIcon = (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
            <polyline points="16 7 22 7 22 13"></polyline>
        </svg>
    );

    const calendarIcon = (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
            <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01"></path>
        </svg>
    );

    return (
        <section className="features-home">
            <div className="features-container">
                <div className="features-left-column">
                    <div className="features-header">
                        <div className="features-label">
                            <span className="line"></span> FAMILY PORTAL
                        </div>
                        <h2>One account. <br /> Every <i>family member</i></h2>
                        <p>
                            Care for the ones you love with complete visibility into each 
                            family member's health from your children to your parents.
                        </p>
                    </div>

                    <div className="feature-card last-card">
                        <div className="feature-icon">{calendarIcon}</div>
                        <div className="feature-info">
                            <h4>Appointment Management</h4>
                            <p>Book, reschedule, and manage doctor appointments with calendar sync and reminders.</p>
                        </div>
                    </div>
                </div>

                <div className="features-right-column">
                    <div className="feature-card">
                        <div className="feature-icon">{liveIcon}</div>
                        <div className="feature-info">
                            <h4>Live Health Metrics</h4>
                            <p>Real-time streaming from wearables with historical trend graphs and anomaly detection.</p>
                        </div>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon">{calendarIcon}</div>
                        <div className="feature-info">
                            <h4>Appointment Management</h4>
                            <p>Book, reschedule, and manage doctor appointments with calendar sync and reminders.</p>
                        </div>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon">{liveIcon}</div>
                        <div className="feature-info">
                            <h4>Live Health Metrics</h4>
                            <p>Real-time streaming from wearables with historical trend graphs and anomaly detection.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FeaturesHome;