import React from 'react';
import hugsVideo from '../../vids/hugs.mp4';
import overlayImg from '../../imgs/overlay.png';

const WS_Video = ({ isAr }) => {
    return (
        <section className="ws-video-section">
            <div className="ws-video-container">
                <video autoPlay loop muted playsInline className="ws-bg-video">
                    <source src={hugsVideo} type="video/mp4" />
                </video>
                <img src={overlayImg} alt="" className="ws-video-img-overlay" />
                <div className="ws-video-text-overlay">
                    <h2>
                        {isAr ? "ماذا تنتظر؟" : "What are you waiting for?"} 
                        <br /> 
                        <i>{isAr ? "انضم لسينكد الآن." : "join Synced now."}</i>
                    </h2>
                </div>
            </div>
        </section>
    );
};

export default WS_Video;