import React, { useEffect, useState } from 'react';
import '@google/model-viewer';
import './CommandCenter.css';
import { supabase } from '../Supabase';
import { useGlobal } from '../context/GlobalContext';

import heartModel from '../3d/lowpoly_human_heart.glb';
import lungsModel from '../3d/lungs.glb';
import rbcModel from '../3d/erythrocytes_-_red_blood_cells.glb';
import anatomyModel from '../3d/ecorche_-_anatomy_study.glb';

const CommandCenter = () => {
    const { isAr } = useGlobal();
    const [header, setHeader] = useState(null);
    const [metrics, setMetrics] = useState([]);
    const [anatomyAlt, setAnatomyAlt] = useState({ en: '', ar: '' });

    const models = [heartModel, lungsModel, rbcModel];

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await supabase
                .from('command_center')
                .select('*')
                .order('order_index', { ascending: true });

            if (data) {
                setHeader(data.find(i => i.type === 'header'));
                setMetrics(data.filter(i => i.type === 'metric'));
                const anatomy = data.find(i => i.type === 'anatomy');
                if (anatomy) setAnatomyAlt({ en: anatomy.alt_en, ar: anatomy.alt_ar });
            }
        };
        fetchData();
    }, []);

    if (!header) return null;

    return (
        <section className="command-center">
            <div className="cc-container">
                <div className="cc-left">
                    <div className="cc-header">
                        <div className="cc-label">
                            <span className="line"></span> 
                            {isAr ? header.label_ar : header.label_en}
                        </div>
                        <h2>{isAr ? header.title_ar : header.title_en}</h2>
                        <p>{isAr ? header.desc_ar : header.desc_en}</p>
                    </div>

                    <div className="cc-metrics-list">
                        {metrics.map((m, idx) => (
                            <div className="metric-card" key={idx}>
                                <div className="metric-info">
                                    <span className="m-label">{isAr ? m.metric_label_ar : m.metric_label_en}</span>
                                    <div className="m-value">
                                        {m.metric_value} <span className="m-unit">{m.metric_unit}</span>
                                    </div>
                                    <span className="m-status">
                                        <span className="dot glow-blue"></span> 
                                        {isAr ? m.status_ar : m.status_en}
                                    </span>
                                </div>
                                <div className="metric-model">
                                    <model-viewer 
                                        key={`${idx}-${isAr}`}
                                        src={models[idx]} 
                                        alt={isAr ? m.alt_ar : m.alt_en}
                                        camera-orbit={idx === 0 ? "45deg 75deg 105%" : idx === 1 ? "0deg 90deg 100%" : "-45deg 75deg 100%"}
                                        field-of-view={idx === 1 ? "35deg" : "30deg"}
                                        tone-mapping="neutral" 
                                        shadow-intensity="1" 
                                        auto-rotate 
                                        autoplay 
                                        disable-zoom
                                        dir="ltr"
                                        loading="eager"
                                        reveal="auto"
                                    ></model-viewer>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="cc-right">
                    <div className="anatomy-card">
                        <model-viewer 
                            key={`anatomy-${isAr}`}
                            src={anatomyModel} 
                            alt={isAr ? anatomyAlt.ar : anatomyAlt.en}
                            camera-controls 
                            camera-orbit="0deg 90deg 110%"
                            tone-mapping="neutral" 
                            shadow-intensity="0.85" 
                            auto-rotate 
                            autoplay
                            exposure="0.6" 
                            shadow-softness="1"
                            disable-zoom
                            dir="ltr"
                            loading="eager"
                            reveal="auto"
                        >
                        </model-viewer>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CommandCenter;