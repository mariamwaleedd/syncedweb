import React, { useEffect, useState } from 'react';
import './AboutUs.css';
import TopSections from '../common/TopSections';
import { useGlobal } from '../context/GlobalContext';
import { supabase } from '../Supabase';
import { 
    FaBullseye, FaEye, FaHeart, FaShieldAlt, FaUserFriends, 
    FaLightbulb, FaUserTie, FaUserMd, FaLaptopCode 
} from 'react-icons/fa';

const AboutUs = () => {
    const { isAr } = useGlobal();
    const [dbData, setDbData] = useState([]);

    useEffect(() => {
        const fetchAboutData = async () => {
            const { data } = await supabase
                .from('about_us')
                .select('*')
                .order('order_index', { ascending: true });
            if (data) setDbData(data);
        };
        fetchAboutData();
    }, []);

    const getData = (type) => dbData.filter(item => item.type === type);
    const getSingle = (key) => dbData.find(item => item.key_id === key);

    const iconMap = {
        FaBullseye: <FaBullseye />,
        FaEye: <FaEye />,
        FaHeart: <FaHeart />,
        FaShieldAlt: <FaShieldAlt />,
        FaUserFriends: <FaUserFriends />,
        FaLightbulb: <FaLightbulb />,
        FaUserTie: <FaUserTie />,
        FaUserMd: <FaUserMd />,
        FaLaptopCode: <FaLaptopCode />
    };

    const header = getSingle('top');
    if (!header) return null;

    return (
        <div className="about-page">
            <TopSections 
                titleMain={isAr ? header.title_ar : header.title_en}
                titleItalic={isAr ? header.subtitle_ar : header.subtitle_en}
                description={isAr ? header.content_ar : header.content_en}
            />

            <main className="about-content-wrapper">
                <section className="story-card">
                    <h2>{isAr ? getSingle('p1')?.title_ar : getSingle('p1')?.title_en}</h2>
                    {getData('story').map((p, i) => (
                        <p key={i}>{isAr ? p.content_ar : p.content_en}</p>
                    ))}
                </section>

                <div className="mission-vision-grid">
                    {getData('mission').concat(getData('vision')).map((item, i) => (
                        <div className="mv-card" key={i}>
                            <div className="mv-icon">{iconMap[item.icon_type]}</div>
                            <h3>{isAr ? item.title_ar : item.title_en}</h3>
                            <p>{isAr ? item.content_ar : item.content_en}</p>
                        </div>
                    ))}
                </div>

                <div className="about-stats-bar">
                    {getData('stat').map((s, i) => (
                        <div className="stat-box" key={i}>
                            <h4>{s.value}</h4>
                            <p>{isAr ? s.title_ar : s.title_en}</p>
                        </div>
                    ))}
                </div>

                <section className="values-section">
                    <h2>{isAr ? "قيمنا الجوهرية" : "Our Core Values"}</h2>
                    <div className="values-grid">
                        {getData('value').map((v, i) => (
                            <div className="value-item" key={i}>
                                <div className="v-icon">{iconMap[v.icon_type]}</div>
                                <div className="v-content">
                                    <h4>{isAr ? v.title_ar : v.title_en}</h4>
                                    <p>{isAr ? v.content_ar : v.content_en}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="leadership-section">
                    <h2>{isAr ? "فريق القيادة" : "Meet Our Leadership"}</h2>
                    <div className="leader-grid">
                        {getData('leader').map((l, i) => (
                            <div className="leader-card" key={i}>
                                <div className="l-icon">{iconMap[l.icon_type]}</div>
                                <h4>{isAr ? l.title_ar : l.title_en}</h4>
                                <span>{isAr ? l.subtitle_ar : l.subtitle_en}</span>
                                <p>{isAr ? l.content_ar : l.content_en}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="why-choose-us">
                    <h2>{isAr ? "لماذا تختارنا؟" : "Why Choose Us"}</h2>
                    <div className="why-grid">
                        {getData('why').map((w, i) => (
                            <div className="why-item" key={i}>
                                {iconMap[w.icon_type]}
                                <h4>{isAr ? w.title_ar : w.title_en}</h4>
                                <p>{isAr ? w.content_ar : w.content_en}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
};

export default AboutUs;