import React from 'react';
import '@google/model-viewer';
import './CommandCenter.css';

import heartModel from '../3d/lowpoly_human_heart.glb';
import lungsModel from '../3d/lungs.glb';
import rbcModel from '../3d/erythrocytes_-_red_blood_cells.glb';
import anatomyModel from '../3d/ecorche_-_anatomy_study.glb';

const CommandCenter = () => {
    return (
        <section className="command-center">
            <div className="cc-container">
                <div className="cc-left">
                    <div className="cc-header">
                        <div className="cc-label">
                            <span className="line"></span> YOUR COMMAND CENTER
                        </div>
                        <h2>A dashboard built <br/> for <i>clarity</i></h2>
                        <p>Every metric, every trend, every alert organized and readable at a single glance. No clutter, no confusion.</p>
                    </div>

                    <div className="cc-metrics-list">
                        <div className="metric-card">
                            <div className="metric-info">
                                <span className="m-label">HEART RATE</span>
                                <div className="m-value">72 <span className="m-unit">BPM</span></div>
                                <span className="m-status"><span className="dot glow-blue"></span> NORMAL</span>
                            </div>
                            <div className="metric-model">
                                <model-viewer 
                                    src={heartModel} 
                                    camera-orbit="45deg 75deg 105%" 
                                    field-of-view="30deg"
                                    tone-mapping="neutral" 
                                    shadow-intensity="1" 
                                    auto-rotate autoplay disable-zoom
                                ></model-viewer>
                            </div>
                        </div>

                        <div className="metric-card">
                            <div className="metric-info">
                                <span className="m-label">BLOOD OXYGEN</span>
                                <div className="m-value">98 <span className="m-unit">%</span></div>
                                <span className="m-status"><span className="dot glow-blue"></span> OPTIMAL</span>
                            </div>
                            <div className="metric-model">
                                <model-viewer 
                                    src={lungsModel} 
                                    camera-orbit="0deg 90deg 100%"
                                    field-of-view="35deg"
                                    tone-mapping="neutral" 
                                    shadow-intensity="1" 
                                    auto-rotate autoplay disable-zoom
                                ></model-viewer>
                            </div>
                        </div>

                        <div className="metric-card">
                            <div className="metric-info">
                                <span className="m-label">BLOOD PRESSURE</span>
                                <div className="m-value">120 <span className="m-unit">/80</span></div>
                                <span className="m-status"><span className="dot glow-blue"></span> MONITOR</span>
                            </div>
                            <div className="metric-model">
                                <model-viewer 
                                    src={rbcModel} 
                                    camera-orbit="-45deg 75deg 100%"
                                    field-of-view="30deg"
                                    tone-mapping="neutral" 
                                    shadow-intensity="1" 
                                    auto-rotate autoplay disable-zoom
                                ></model-viewer>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="cc-right">
                    <div className="anatomy-card">
                        <model-viewer 
                            src={anatomyModel} 
                            camera-controls 
                            camera-orbit="0deg 90deg 110%"
                            tone-mapping="neutral" 
                            shadow-intensity="0.85" 
                            auto-rotate 
                            autoplay
                            exposure="0.6" 
                            shadow-softness="1"
                            disable-zoom
                        >
                        </model-viewer>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CommandCenter;