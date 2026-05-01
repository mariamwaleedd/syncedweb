import React from 'react';
const WS_Hero = ({ data, isAr }) => (
    <section className="ws-hero" style={{backgroundImage: `url(${data?.img_url})`}}>
        <div className="ws-hero-overlay"></div>
        <div className="ws-hero-content">
            <span className="ws-badge">{isAr ? data?.label_ar : data?.label_en}</span>
            <h1>{isAr ? data?.title_ar : data?.title_en} <br /> <i>{isAr ? data?.italic_ar : data?.italic_en}</i></h1>
            <p>{isAr ? data?.desc_ar : data?.desc_en}</p>
            <div className="ws-hero-btns">
                <button className="ws-btn-blue">{isAr ? "تحميل الآن" : "Download Now"}</button>
                <button className="ws-btn-outline">{isAr ? "تعرف على المزيد" : "Learn More"} →</button>
            </div>
        </div>
    </section>
);
export default WS_Hero;