import React from 'react';
import { useGlobal } from '../../context/GlobalContext';
import hugsVideo from '../../vids/hugs.mp4';

const WS_Video = () => {
    const { isAr } = useGlobal();
    return (
        <section className="ws-video-section">
            <video autoPlay loop muted playsInline className="ws-bg-video">
                <source src={hugsVideo} type="video/mp4" />
            </video>
            <div className="ws-video-overlay">
                <h2>{isAr ? "ماذا تنتظر؟" : "What are you waiting for?"} <br /> <i>{isAr ? "انضم لسينكد الآن." : "join Synced now."}</i></h2>
            </div>
        </section>
    );
};
export default WS_Video;