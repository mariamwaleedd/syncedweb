import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './AboutUs.css';
import TopSections from '../common/TopSections';
import { useGlobal } from '../context/GlobalContext';
import { supabase } from '../Supabase';
import { 
    FaBullseye, FaEye, FaFlag, FaLightbulb, FaRocket, 
    FaShieldAlt, FaUsers, FaHeartbeat, FaHistory, FaDraftingCompass,
    FaPenFancy, FaStickyNote, FaBookOpen, FaArrowRight
} from 'react-icons/fa';

const AboutUs = () => {
    const { isAr } = useGlobal();
    const [dbData, setDbData] = useState([]);

    useEffect(() => {
        document.title = isAr ? "سينكد | من نحن" : "Synced | About Us";
    }, [isAr]);

    useEffect(() => {
        const fetchAbout = async () => {
            const { data } = await supabase.from('about_us').select('*').order('order_index', { ascending: true });
            if (data) setDbData(data);
        };
        fetchAbout();
    }, []);

    const iconMap = {
        FaBullseye: <FaBullseye />, FaEye: <FaEye />, FaFlag: <FaFlag />, FaLightbulb: <FaLightbulb />, 
        FaRocket: <FaRocket />, FaShieldAlt: <FaShieldAlt />, FaUsers: <FaUsers />, FaHeartbeat: <FaHeartbeat />, 
        FaHistory: <FaHistory />, FaDraftingCompass: <FaDraftingCompass />, FaPenFancy: <FaPenFancy />, 
        FaStickyNote: <FaStickyNote />, FaBookOpen: <FaBookOpen />
    };

    const filter = (type) => dbData.filter(i => i.type === type);
    const find = (key) => dbData.find(i => i.key_id === key);

    const header = find('top');
    const origin = find('origin');
    const philosophy = find('phi1');

    if (!header) return null;

    return (
        <div className="about-v5-root">
            <TopSections 
                titleMain={isAr ? header.title_ar : header.title_en}
                titleItalic={isAr ? header.subtitle_ar : header.subtitle_en}
                description={isAr ? header.content_ar : header.content_en}
            />

            <main className="about-v5-container">
                <section className="origin-story-v5">
                    <div className="v5-origin-grid">
                        <div className="v5-origin-text">
                            <span className="v5-tag">{isAr ? "بدايتنا المتواضعة" : "HOW WE STARTED"}</span>
                            <h2>{isAr ? origin?.title_ar : origin?.title_en}</h2>
                            <p>{isAr ? origin?.content_ar : origin?.content_en}</p>
                            <div className="v5-highlight-box">
                                {iconMap[origin?.icon_type]}
                                <p>{isAr ? "بدأ العمل الفعلي في صيف 2025 بتمويل ذاتي وإرادة لا تنكسر." : "Real work began in the summer of 2025 with self-funding and unbreakable will."}</p>
                            </div>
                        </div>
                        <div className="v5-origin-image">
                            <div className="ceo-frame">
                                <img src={origin?.img_url} alt="CEO" className="ceo-main-img" />
                                <div className="ceo-badge">
                                    <strong>Mariam Waleed</strong>
                                    <span>Founder & CEO</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="sketches-gallery">
                    <div className="v5-center-header">
                        <span className="v5-tag center">{isAr ? "خلف الكواليس" : "BEHIND THE SCENES"}</span>
                        <h2>{isAr ? "دفاتر التطوير والمسودات" : "Drafts & Development Logs"}</h2>
                    </div>
                    <div className="notebook-grid">
                        {filter('notebook').map((nb, i) => (
                            <div className={`notebook-card ${i===0?'rotate-left':i===1?'rotate-right':''}`} key={i}>
                                <div className="nb-paper">
                                    {iconMap[nb.icon_type]}
                                    <h5>{isAr ? nb.title_ar : nb.title_en}</h5>
                                    <p>{isAr ? nb.content_ar : nb.content_en}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="v5-trinity">
                    <div className="trinity-v5-grid">
                        <div className="t-v5-card">
                            <FaBullseye />
                            <h3>{isAr ? "مهمتنا" : "Mission"}</h3>
                            <p>{isAr ? "سد الفجوة بين المرضى وعائلاتهم والبيانات الصحية." : "Bridging the gap between patients, families, and health data."}</p>
                        </div>
                        <div className="t-v5-card center-t">
                            <FaEye />
                            <h3>{isAr ? "رؤيتنا" : "Vision"}</h3>
                            <p>{isAr ? "أن يصبح سينكد هو السجل الصحي العالمي لكل منزل." : "For Synced to become the universal health record for every home."}</p>
                        </div>
                        <div className="t-v5-card">
                            <FaFlag />
                            <h3>{isAr ? "هدفنا" : "Goal"}</h3>
                            <p>{isAr ? "توفير رعاية صحية استباقية تعتمد على البيانات." : "Providing proactive healthcare based on real-time data."}</p>
                        </div>
                    </div>
                </section>

                <section className="roadmap-v5">
                    <h2 className="center-title">{isAr ? "رحلة الوصول" : "The Roadmap to Launch"}</h2>
                    <div className="roadmap-container">
                        <div className="v-line"></div>
                        {filter('roadmap').map((pt, i) => (
                            <div className={`road-point ${i % 2 === 0 ? 'left' : 'right'}`} key={i}>
                                {i % 2 !== 0 && <div className="road-dot">{iconMap[pt.icon_type]}</div>}
                                <div className="road-info">
                                    <h4>{isAr ? pt.title_ar : pt.title_en}</h4>
                                    <p>{isAr ? pt.content_ar : pt.content_en}</p>
                                </div>
                                {i % 2 === 0 && <div className="road-dot">{iconMap[pt.icon_type]}</div>}
                            </div>
                        ))}
                    </div>
                </section>

                <section className="philosophy-v5">
                    <div className="phi-glass-box">
                        <div className="phi-text">
                            <h2>{isAr ? philosophy?.title_ar : philosophy?.title_en}</h2>
                            <p>{isAr ? philosophy?.content_ar : philosophy?.content_en}</p>
                        </div>
                        <div className="phi-icon"><div className="icon-pulse">{iconMap[philosophy?.icon_type]}</div></div>
                    </div>
                </section>

                <section className="about-privacy-bar">
                    <div className="privacy-bar-content">
                        <div className="p-bar-icon"><FaShieldAlt /></div>
                        <p>
                            {isAr 
                                ? "نحن نأخذ خصوصيتك على محمل الجد. جميع بياناتك مشفرة ومحمية." 
                                : "We take your privacy seriously. All your data is encrypted and protected."
                            }
                        </p>
                        <Link to="/PrivacyPolicy" className="privacy-link-btn">
                            {isAr ? "سياستنا للخصوصية" : "Our Privacy Policy"} <FaArrowRight />
                        </Link>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default AboutUs;