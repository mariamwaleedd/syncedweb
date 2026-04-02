import React from 'react';
import { useGlobal } from '../../context/GlobalContext';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';

const WS_HowTo = () => {
    const { isAr } = useGlobal();
    const steps = [
        { n: "01", tEn: "Download & Sign Up", tAr: "التحميل والتسجيل", dEn: "Get the app from App Store or Google Play.", dAr: "احصل على التطبيق من متجر آبل أو جوجل بلاي." },
        { n: "02", tEn: "Add Family Members", tAr: "أضف أفراد العائلة", dEn: "Invite your family and set up profiles.", dAr: "ادعُ عائلتك وقم بإعداد ملفاتهم الشخصية." },
        { n: "03", tEn: "Track & Monitor", tAr: "التتبع والمراقبة", dEn: "Start logging data and monitor vitals daily.", dAr: "ابدأ بتسجيل البيانات ومراقبة المؤشرات يومياً." },
        { n: "04", tEn: "Stay Healthy Together", tAr: "ابقوا أصحاء معاً", dEn: "Review insights and keep family informed.", dAr: "راجع الرؤى وحافظ على وعي عائلتك الصحي." }
    ];
    return (
        <section className="ws-section">
            <h2 className="ws-title-center">{isAr ? "كيفية الاستخدام" : "How to Use"}</h2>
            <p className="ws-desc-center">{isAr ? "ابدأ في ٤ خطوات بسيطة فقط" : "Get started in just 4 simple steps"}</p>
            <div className="ws-steps-row">
                {steps.map((s, i) => (
                    <React.Fragment key={i}>
                        <div className="ws-step-card">
                            <span className="ws-step-num">{s.n}</span>
                            <h3>{isAr ? s.tAr : s.tEn}</h3>
                            <p>{isAr ? s.dAr : s.dEn}</p>
                        </div>
                        {i < 3 && <div className="ws-step-arrow">{isAr ? <FaChevronLeft /> : <FaChevronRight />}</div>}
                    </React.Fragment>
                ))}
            </div>
        </section>
    );
};
export default WS_HowTo;