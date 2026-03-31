import React, { useEffect, useState } from 'react';
import './AboutUs.css';
import TopSections from '../common/TopSections';
import { useGlobal } from '../context/GlobalContext';
import { supabase } from '../Supabase';
import { 
    FaBullseye, FaEye, FaFlag, FaLightbulb, FaRocket, 
    FaShieldAlt, FaUsers, FaHeartbeat, FaHistory, FaDraftingCompass,
    FaPenFancy, FaStickyNote, FaBookOpen, FaBrain
} from 'react-icons/fa';

const AboutUs = () => {
    const { isAr } = useGlobal();
    const [content, setContent] = useState([]);

    useEffect(() => {
        const fetchAbout = async () => {
            const { data } = await supabase
                .from('about_us')
                .select('*')
                .order('order_index', { ascending: true });
            if (data) setContent(data);
        };
        fetchAbout();
    }, []);

    const team = [
        { name: "Mariam Waleed", ar: "مريم وليد", role: "Founder & CEO", arRole: "المؤسس والرئيس التنفيذي", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400" },
        { name: "Omar Khalil", ar: "عمر خليل", role: "CTO", arRole: "رئيس قسم التقنية", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400" },
        { name: "Layla Ibrahim", ar: "ليلى إبراهيم", role: "Head of Product", arRole: "رئيسة المنتج", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400" },
        { name: "Ahmed Hassan", ar: "أحمد حسن", role: "Medical Advisor", arRole: "مستشار طبي", img: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=400" }
    ];

    return (
        <div className="about-v5-root">
            <TopSections 
                titleMain={isAr ? "من الفكرة إلى " : "From Spark to "}
                titleItalic={isAr ? "الواقع" : "Reality"}
                description={isAr 
                    ? "رحلة الابتكار والاهتمام التي شكلت هوية سينكد وكيف بدأنا بمفردنا لنصبح عائلة واحدة." 
                    : "The journey of innovation and care that shaped Synced's identity and how we started alone to become one family."}
            />

            <main className="about-v5-container">
                
                <section className="origin-story-v5">
                    <div className="v5-origin-grid">
                        <div className="v5-origin-text">
                            <span className="v5-tag">{isAr ? "بدايتنا المتواضعة" : "HOW WE STARTED"}</span>
                            <h2>{isAr ? "حكاية بدأت بورقة وقلم" : "A Tale That Began with Pen & Paper"}</h2>
                            <p>
                                {isAr 
                                    ? "لم يولد سينكد في مكتب مكيف، بل ولد وسط مخاوف حقيقية. مريم وليد، المؤسسة، كانت تراقب والديها يعانيان مع تشتت المواعيد ونتائج التحاليل. قضت مئات الساعات وهي ترسم واجهات تخيلية على دفاترها الدراسية، تحلم بيوم تكون فيه الرعاية الصحية بسيطة كرسالة نصية."
                                    : "Synced wasn't born in a high-tech office; it was born out of real worry. Mariam Waleed, the founder, watched her parents struggle with fragmented appointments and scattered lab results. She spent hundreds of hours sketching imaginary interfaces in her college notebooks, dreaming of a day when healthcare would be as simple as a text message."}
                            </p>
                            <div className="v5-highlight-box">
                                <FaHistory className="v5-h-icon" />
                                <p>{isAr ? "بدأ العمل الفعلي في صيف 2025 بتمويل ذاتي وإرادة لا تنكسر." : "Real work began in the summer of 2025 with self-funding and unbreakable will."}</p>
                            </div>
                        </div>
                        <div className="v5-origin-image">
                            <div className="ceo-frame">
                                <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800" alt="CEO" className="ceo-main-img" />
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
                        <p>{isAr ? "نظرة حصرية على الملاحظات والرسومات الأولى التي شكلت واجهة المستخدم الحالية." : "An exclusive look at the first notes and sketches that shaped the current UI."}</p>
                    </div>
                    <div className="notebook-grid">
                        <div className="notebook-card rotate-left">
                            <div className="nb-paper">
                                <FaPenFancy className="nb-icon" />
                                <h5>{isAr ? "المسودة الأولى" : "First Draft"}</h5>
                                <p>{isAr ? "تخطيط بدائي لبوابة العائلة." : "Initial layout for family portal."}</p>
                            </div>
                        </div>
                        <div className="notebook-card rotate-right">
                            <div className="nb-paper">
                                <FaStickyNote className="nb-icon" />
                                <h5>{isAr ? "هيكل البيانات" : "Data Structure"}</h5>
                                <p>{isAr ? "كيفية ربط الأجهزة القابلة للارتداء." : "How to connect wearables."}</p>
                            </div>
                        </div>
                        <div className="notebook-card">
                            <div className="nb-paper">
                                <FaBookOpen className="nb-icon" />
                                <h5>{isAr ? "رحلة المريض" : "Patient Journey"}</h5>
                                <p>{isAr ? "تحليل التواصل بين الطبيب والمريض." : "Doctor-patient communication flow."}</p>
                            </div>
                        </div>
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
                        <div className="road-point left">
                            <div className="road-info">
                                <h4>{isAr ? "مرحلة التفكير" : "Conceptual Phase"}</h4>
                                <p>{isAr ? "تحديد المشاكل الصحية المتكررة في العائلات." : "Identifying recurring health problems in families."}</p>
                            </div>
                            <div className="road-dot"><FaLightbulb /></div>
                        </div>
                        <div className="road-point right">
                            <div className="road-dot"><FaDraftingCompass /></div>
                            <div className="road-info">
                                <h4>{isAr ? "بناء النظام" : "Architecture Build"}</h4>
                                <p>{isAr ? "تطوير قاعدة البيانات المشفرة وربطها بـ Supabase." : "Developing the encrypted DB linked to Supabase."}</p>
                            </div>
                        </div>
                        <div className="road-point left">
                            <div className="road-info">
                                <h4>{isAr ? "الإطلاق الرسمي" : "Official Launch"}</h4>
                                <p>{isAr ? "فتح المنصة للجمهور في الشرق الأوسط." : "Opening the platform to the ME public."}</p>
                            </div>
                            <div className="road-dot"><FaRocket /></div>
                        </div>
                    </div>
                </section>

                <section className="the-squad">
                    <div className="v5-center-header">
                        <h2>{isAr ? "الفريق المبدع" : "Meet The Squad"}</h2>
                        <p>{isAr ? "العقول التي تعمل ليل نهار لخدمتكم." : "The minds working day and night to serve you."}</p>
                    </div>
                    <div className="squad-grid">
                        {team.map((m, i) => (
                            <div className="member-v5-card" key={i}>
                                <div className="m-v5-img">
                                    <img src={m.img} alt={m.name} />
                                </div>
                                <div className="m-v5-details">
                                    <h4>{isAr ? m.ar : m.name}</h4>
                                    <span>{isAr ? m.arRole : m.role}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="philosophy-v5">
                    <div className="phi-glass-box">
                        <div className="phi-text">
                            <h2>{isAr ? "فلسفتنا" : "Philosophy"}</h2>
                            <p>{isAr ? "نحن نؤمن أن التكنولوجيا وجدت لخدمة الإنسان، ليس لتعقيد حياته. في سينكد، كل سطر برمجي هو وعد بالاهتمام." : "We believe technology was found to serve humans, not complicate their lives. At Synced, every line of code is a promise of care."}</p>
                        </div>
                        <div className="phi-icon">
                            <div className="icon-pulse">
                                <FaHeartbeat />
                            </div>
                        </div>
                    </div>
                </section>

            </main>
        </div>
    );
};

export default AboutUs;