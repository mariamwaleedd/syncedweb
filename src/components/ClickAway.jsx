import React from 'react';
import './ClickAway.css';
import clickAwayImg from '../imgs/clickaway.png';

const ClickAway = () => {
    return (
        <section className="click-away-section">
            <div className="click-away-container">
                <div className="click-away-image">
                    <img src={clickAwayImg} alt="Family Portal" />
                </div>
                
                <div className="click-away-content">
                    <div className="click-away-label">
                        <span className="line"></span> FAMILY PORTAL
                    </div>
                    <h2>One <i>click</i> away.</h2>
                    <p>
                        Care for the ones you love with complete visibility into each family 
                        member's health from your children to your parents.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default ClickAway;