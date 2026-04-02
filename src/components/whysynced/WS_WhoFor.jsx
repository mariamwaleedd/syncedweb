import React from 'react';
import { useGlobal } from '../../context/GlobalContext';

const WS_WhoFor = () => {
    const { isAr } = useGlobal();
    return (
        <section className="ws-section">
            <h2 className="ws-title-center">{isAr ? "لمن هذا التطبيق؟" : "Who Is This App For?"}</h2>
            <p className="ws-desc-center">{isAr ? "مثالي لأي شخص يريد التحكم في صحته" : "Perfect for anyone who wants to take control of their health"}</p>
            <div className="ws-who-grid">
                <div className="ws-who-card">
                    <img src="https://uwtejjvilzwbxzhanbyd.supabase.co/storage/v1/object/public/Synced/imgs/Features/image%2054-1.png" alt="" />
                    <div className="ws-who-text">
                        <h3>{isAr ? "الآباء والعائلات" : "Parents & Families"}</h3>
                        <p>{isAr ? "تتبع تطعيمات الأطفال ومخططات النمو والتاريخ الطبي للعائلة." : "Keep track of children's vaccinations, growth charts, and family medical history."}</p>
                    </div>
                </div>
                <div className="ws-who-card">
                    <img src="https://uwtejjvilzwbxzhanbyd.supabase.co/storage/v1/object/public/Synced/imgs/Features/image%2054-4.png" alt="" />
                    <div className="ws-who-text">
                        <h3>{isAr ? "مقدمو الرعاية وكبار السن" : "Caregivers & Seniors"}</h3>
                        <p>{isAr ? "مثالي لمقدمي الرعاية الذين يديرون صحة الوالدين المسنين والحالات المزمنة." : "Ideal for caregivers managing elderly parents' health, chronic conditions, and daily medications."}</p>
                    </div>
                </div>
                <div className="ws-who-card wide-who">
                    <img src="https://uwtejjvilzwbxzhanbyd.supabase.co/storage/v1/object/public/Synced/imgs/WebsiteRepeated/image%2062.png" alt="" />
                    <div className="ws-who-text">
                        <h3>{isAr ? "الحساب الشخصي" : "Personal Account"}</h3>
                        <p>{isAr ? "تتبع تقاريرك الطبية ومؤشراتك الحيوية الخاصة." : "Keep track of your own medical reports & health vitals."}</p>
                    </div>
                </div>
            </div>
        </section>
    );
};
export default WS_WhoFor;