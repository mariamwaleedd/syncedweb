import React from 'react';
import { useGlobal } from '../../context/GlobalContext';
import { FaCheckCircle } from 'react-icons/fa';

const WS_Interface = () => {
    const { isAr } = useGlobal();
    const list = [
        { en: "Easy navigation", ar: "تنقل سهل" },
        { en: "Visual health charts", ar: "رسوم بيانية صحية مرئية" },
        { en: "Quick data entry", ar: "إدخال بيانات سريع" },
        { en: "Dark mode support", ar: "دعم الوضع الداكن" }
    ];
    return (
        <section className="ws-section ws-interface-sec">
            <div className="ws-interface-grid">
                <div className="ws-int-text">
                    <h2>{isAr ? "واجهة جميلة وبديهية" : "Beautiful, Intuitive Interface"}</h2>
                    <p>{isAr ? "صممت مع وضع البساطة في الاعتبار. واجهتنا الحديثة تجعل التتبع ممتعاً." : "Designed with simplicity in mind. Our clean, modern interface makes health tracking enjoyable."}</p>
                    <div className="ws-int-list">
                        {list.map((item, i) => (
                            <div key={i} className="ws-int-item">
                                <FaCheckCircle /> <span>{isAr ? item.ar : item.en}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="ws-int-visual">
                    <img src="https://uwtejjvilzwbxzhanbyd.supabase.co/storage/v1/object/public/Synced/imgs/Features/image%2055-5.png" alt="" />
                </div>
            </div>
        </section>
    );
};
export default WS_Interface;