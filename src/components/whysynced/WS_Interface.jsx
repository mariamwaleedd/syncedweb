import React from 'react';
import { useGlobal } from '../../context/GlobalContext';
import { FaCheckCircle } from 'react-icons/fa';
import '@google/model-viewer';
import iphoneModel from '../../3d/iphone_12_pro.glb';

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
                    <model-viewer
                        src={iphoneModel}
                        camera-controls
                        auto-rotate
                        rotation-per-second="30deg"
                        shadow-intensity="1"
                        camera-orbit="30deg 75deg 105%"
                        disable-zoom
                        alt="3D iPhone Model"
                        loading="eager"
                        dir="ltr"
                        style={{ width: '60%', height: '100%' }}
                    ></model-viewer>
                </div>
            </div>
        </section>
    );
};

export default WS_Interface;