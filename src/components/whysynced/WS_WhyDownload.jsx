import React from 'react';
import { useGlobal } from '../../context/GlobalContext';
import { FaCheckCircle } from 'react-icons/fa';

const WS_WhyDownload = () => {
    const { isAr } = useGlobal();
    const reasons = [
        { en: "Easy sharing with doctors", ar: "مشاركة سهلة مع الأطباء" },
        { en: "Customizable health goals", ar: "أهداف صحية قابلة للتخصيص" },
        { en: "Complete health history", ar: "تاريخ صحي كامل في متناول يدك" },
        { en: "Multi-language support", ar: "دعم لغات متعددة" },
        { en: "Offline access to data", ar: "وصول للبيانات دون إنترنت" },
        { en: "Secure, encrypted storage", ar: "تخزين آمن ومشفر" }
    ];
    return (
        <section className="ws-section">
            <h2 className="ws-title-center">{isAr ? "لماذا تحمل هذا التطبيق؟" : "Why Download This App?"}</h2>
            <p className="ws-desc-center">{isAr ? "انضم لآلاف العائلات التي تتتبع صحتها بذكاء" : "Join thousands of families already tracking their health smarter"}</p>
            <div className="ws-reasons-grid">
                {reasons.map((r, i) => (
                    <div className="ws-reason-card" key={i}>
                        <FaCheckCircle /> <span>{isAr ? r.ar : r.en}</span>
                    </div>
                ))}
            </div>
        </section>
    );
};
export default WS_WhyDownload;