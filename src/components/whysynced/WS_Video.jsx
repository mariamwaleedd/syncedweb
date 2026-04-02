import React from 'react';
import hugsVideo from '../../vids/hugs.mp4';
const WS_Video = ({ isAr }) => (
    <section className="ws-video-section">
        <video autoPlay loop muted playsInline className="ws-bg-video">
            <source src={hugsVideo} type="video/mp4" />
        </video>
        <div className="ws-video-overlay">
            <h2>{isAr ? "ماذا تنتظر؟" : "What are you waiting for?"} <br /> <i>{isAr ? "انضم لسينكد الآن." : "join Synced now."}</i></h2>
        </div>
    </section>
);
export default WS_Video;