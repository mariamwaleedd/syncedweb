import React from 'react';
import './TakeControl.css';

const TakeControl = () => {
    return (
        <section className="take-control-section">
            <div className="tc-overlay">
                <div className="tc-content">
                    <span className="tc-label">READY TO BEGIN?</span>
                    <h2 className="tc-title">
                        <span className="blue-text">Take control of your</span> <br /> 
                        <span className="white-italic">health today.</span>
                    </h2>
                    <p className="tc-description">
                        Join thousands of families already living healthier, more informed 
                        lives with Synced. Start free no credit card needed.
                    </p>
                    <div className="tc-buttons">
                        <button className="btn-download">Download App</button>
                        <button className="btn-demo">Explore Demo</button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TakeControl;