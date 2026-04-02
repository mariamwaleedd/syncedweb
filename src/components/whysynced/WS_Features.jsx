import React from 'react';
import { useGlobal } from '../../context/GlobalContext';
import { FaUsers, FaChartBar, FaSyncAlt, FaBell, FaCalendarCheck, FaLightbulb } from 'react-icons/fa';

const WS_Features = () => {
    const { isAr } = useGlobal();
    const feats = [
        { icon: <FaUsers />, tEn: "Family Portal", tAr: "بوابة العائلة", dEn: "Manage health records for your entire family in one place.", dAr: "إدارة السجلات الصحية لعائلتك بأكملها في مكان واحد آمن." },
        { icon: <FaChartBar />, tEn: "Health Vitals", tAr: "المؤشرات الحيوية", dEn: "Monitor essential health metrics like heart rate and glucose.", dAr: "راقب المقاييس الصحية الأساسية مثل نبض القلب والجلوكوز." },
        { icon: <FaSyncAlt />, tEn: "Smart Syncing", tAr: "المزامنة الذكية", dEn: "Automatically sync data across all your wearable devices.", dAr: "مزامنة البيانات تلقائياً عبر جميع أجهزتك القابلة للارتداء." },
        { icon: <FaBell />, tEn: "Medical Reminders", tAr: "تذكيرات طبية", dEn: "Never miss a medication or doctor appointment again.", dAr: "لا تفوت موعد دواء أو زيارة طبيب مرة أخرى أبداً." },
        { icon: <FaCalendarCheck />, tEn: "Appointment Tracking", tAr: "تتبع المواعيد", dEn: "Keep track of all medical appointments for your family.", dAr: "تتبع جميع المواعيد الطبية لعائلتك بانتظام." },
        { icon: <FaLightbulb />, tEn: "Health Insights", tAr: "رؤى صحية", dEn: "Get visual reports and trends of your health data.", dAr: "احصل على تقارير مرئية واتجاهات لبياناتك الصحية." }
    ];
    return (
        <section className="ws-section">
            <h2 className="ws-title-center">{isAr ? "ميزات قوية" : "Powerful Features"}</h2>
            <p className="ws-desc-center">{isAr ? "كل ما تحتاجه لإدارة صحة عائلتك في مكان واحد" : "Everything you need to manage your family's health in one place"}</p>
            <div className="ws-features-grid">
                {feats.map((f, i) => (
                    <div className="ws-glass-card left-align" key={i}>
                        <div className="ws-icon-small">{f.icon}</div>
                        <h3>{isAr ? f.tAr : f.tEn}</h3>
                        <p>{isAr ? f.dAr : f.dEn}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};
export default WS_Features;