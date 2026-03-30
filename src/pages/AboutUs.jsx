import React from 'react';
import './AboutUs.css';
import TopSections from '../common/TopSections';
import { useGlobal } from '../context/GlobalContext';
import { FaBullseye, FaEye, FaHeart, FaShieldAlt, FaUserFriends, FaLightbulb, FaUserTie, FaUserMd, FaLaptopCode } from 'react-icons/fa';

const AboutUs = () => {
    const { isAr } = useGlobal();

    return (
        <div className="about-page">
            <TopSections 
                titleMain={isAr ? "قصتنا و " : "Our "}
                titleItalic={isAr ? "رؤيتنا" : "Story"}
                description={isAr 
                    ? "تعرف على الرحلة وراء سينكد وكيف نهدف إلى تحويل الرعاية الصحية للعائلات." 
                    : "Learn about the journey behind Synced and how we aim to transform family healthcare."}
            />

            <main className="about-content-wrapper">
                <section className="story-card">
                    <h2>{isAr ? "قصتنا" : "Our Story"}</h2>
                    <p>
                        {isAr 
                            ? "تأسست في عام 2025 من قبل مريم وليد، ولدت منصتنا من حاجة شخصية لمساعدة الناس على تتبع صحتهم ورفاهية عائلاتهم. ما بدأ كمشروع بسيط لمراقبة السجلات الصحية لعائلتها تطور إلى حل تتبع صحي شامل تثق به العائلات في جميع أنحاء العالم."
                            : "Founded in 2025 by college student Mariam Waleed, our platform was born from a personal need to help people track their health and the well-being of their families. What began as a simple project to monitor her own family's health records has evolved into a comprehensive health tracking solution trusted by families worldwide."}
                    </p>
                    <p>
                        {isAr
                            ? "بصفتها طالبة شغوفة بكل من التكنولوجيا والرعاية الصحية، أدركت مريم التحديات التي تواجهها العائلات في إدارة المعلومات الصحية عبر العديد من أفراد الأسرة. من تتبع الأدوية والمواعيد إلى مراقبة مقاييس العلامات الحيوية، تصورت منصة من شأنها أن تجعل إدارة صحة الأسرة بسيطة وآمنة ويمكن الوصول إليها."
                            : "As a student passionate about both technology and healthcare, Mariam recognized the challenges families face in managing health information across multiple family members. From tracking medications and appointments to monitoring vital health metrics, she envisioned a platform that would make family health management simple, secure, and accessible."}
                    </p>
                </section>

                <div className="mission-vision-grid">
                    <div className="mv-card">
                        <div className="mv-icon"><FaBullseye /></div>
                        <h3>{isAr ? "رسالتنا" : "Our Mission"}</h3>
                        <p>{isAr 
                            ? "تمكين العائلات من خلال أدوات تتبع صحية بديهية وسهلة الوصول تبسط إدارة المعلومات الصحية الشخصية والعائلية."
                            : "To empower families with accessible and intuitive health tracking tools that simplify the management of personal and family health information."}</p>
                    </div>
                    <div className="mv-card">
                        <div className="mv-icon"><FaEye /></div>
                        <h3>{isAr ? "رؤيتنا" : "Our Vision"}</h3>
                        <p>{isAr 
                            ? "أن نصبح الرفيق الأكثر موثوقية لتتبع الصحة للعائلات في جميع أنحاء العالم، مما يجعل إدارة الصحة بسيطة مثل قضاء الوقت معاً."
                            : "To become the most trusted health tracking companion for families worldwide, making health management as simple as spending time together."}</p>
                    </div>
                </div>

                <div className="about-stats-bar">
                    <div className="stat-box">
                        <h4>2025</h4>
                        <p>{isAr ? "سنة التأسيس" : "Year Founded"}</p>
                    </div>
                    <div className="stat-box">
                        <h4>1000+</h4>
                        <p>{isAr ? "عائلة مستفيدة" : "Families Helped"}</p>
                    </div>
                    <div className="stat-box">
                        <h4>5000+</h4>
                        <p>{isAr ? "سجل صحي" : "Health Records"}</p>
                    </div>
                    <div className="stat-box">
                        <h4>24/7</h4>
                        <p>{isAr ? "دعم متوفر" : "Support Available"}</p>
                    </div>
                </div>

                <section className="values-section">
                    <h2>{isAr ? "قيمنا الجوهرية" : "Our Core Values"}</h2>
                    <div className="values-grid">
                        <div className="value-item">
                            <div className="v-icon"><FaHeart /></div>
                            <div>
                                <h4>{isAr ? "الاهتمام" : "Care"}</h4>
                                <p>{isAr ? "نحن نهتم بصدق بصحة ورفاهية كل عائلة نخدمها." : "We genuinely care about the health and well-being of every family we serve."}</p>
                            </div>
                        </div>
                        <div className="value-item">
                            <div className="v-icon"><FaShieldAlt /></div>
                            <div>
                                <h4>{isAr ? "الخصوصية" : "Privacy"}</h4>
                                <p>{isAr ? "بياناتك الصحية محمية بأعلى معايير الأمان والتشفير." : "Your health data is protected with the highest security standards and encryption."}</p>
                            </div>
                        </div>
                        <div className="value-item">
                            <div className="v-icon"><FaUserFriends /></div>
                            <div>
                                <h4>{isAr ? "العائلة أولاً" : "Family First"}</h4>
                                <p>{isAr ? "نحن نصمم كل ميزة مع وضع العائلات في الاعتبار." : "We design every feature with families in mind, making health tracking collaborative."}</p>
                            </div>
                        </div>
                        <div className="value-item">
                            <div className="v-icon"><FaLightbulb /></div>
                            <div>
                                <h4>{isAr ? "البساطة" : "Simplicity"}</h4>
                                <p>{isAr ? "نحن نؤمن أن تتبع الصحة يجب أن يكون بسيطاً وبديهياً." : "We believe health tracking should be simple, intuitive, and accessible to everyone."}</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="leadership-section">
                    <h2>{isAr ? "فريق القيادة" : "Meet Our Leadership"}</h2>
                    <div className="leader-grid">
                        <div className="leader-card">
                            <div className="l-icon"><FaUserTie /></div>
                            <h4>{isAr ? "مريم وليد" : "Mariam Waleed"}</h4>
                            <span>{isAr ? "المؤسس والرئيس التنفيذي" : "Founder & CEO"}</span>
                            <p>{isAr ? "طالبة جامعية ومؤسسة ذات رؤية شغوفة بتكنولوجيا الصحة." : "College student and visionary founder passionate about health technology and family wellness."}</p>
                        </div>
                        <div className="leader-card">
                            <div className="l-icon"><FaUserMd /></div>
                            <h4>{isAr ? "د. أحمد حسن" : "Dr. Ahmed Hassan"}</h4>
                            <span>{isAr ? "كبير المستشارين الطبيين" : "Chief Medical Advisor"}</span>
                            <p>{isAr ? "طبيب متخصص يضمن الدقة الطبية وأفضل الممارسات." : "Healthcare professional ensuring medical accuracy and best practices."}</p>
                        </div>
                        <div className="leader-card">
                            <div className="l-icon"><FaUserFriends /></div>
                            <h4>{isAr ? "ليلى إبراهيم" : "Layla Ibrahim"}</h4>
                            <span>{isAr ? "رئيسة قسم المنتجات" : "Head of Product"}</span>
                            <p>{isAr ? "مكرسة لإنشاء تجارب تتبع صحية بديهية للعائلات." : "Dedicated to creating intuitive health tracking experiences for families."}</p>
                        </div>
                        <div className="leader-card">
                            <div className="l-icon"><FaLaptopCode /></div>
                            <h4>{isAr ? "عمر خليل" : "Omar Khalil"}</h4>
                            <span>{isAr ? "كبير المهندسين" : "Lead Engineer"}</span>
                            <p>{isAr ? "بناء تكنولوجيا تتبع صحي آمنة وموثوقة." : "Building secure and reliable health tracking technology."}</p>
                        </div>
                    </div>
                </section>

                <section className="why-choose-us">
                    <h2>{isAr ? "لماذا تختارنا؟" : "Why Choose Us"}</h2>
                    <div className="why-grid">
                        <div className="why-item">
                            <FaShieldAlt />
                            <h4>{isAr ? "آمن وخصوصي" : "Secure & Private"}</h4>
                            <p>{isAr ? "بيانات عائلتك مشفرة ومحمية." : "Your family's health data is encrypted and protected with industry-leading security."}</p>
                        </div>
                        <div className="why-item">
                            <FaHeart />
                            <h4>{isAr ? "سهل الاستخدام" : "Easy to Use"}</h4>
                            <p>{isAr ? "تصميم بديهي يمكن للجميع استخدامه." : "Intuitive design that anyone can use, from kids to grandparents."}</p>
                        </div>
                        <div className="why-item">
                            <FaUserFriends />
                            <h4>{isAr ? "تركيز عائلي" : "Family Focused"}</h4>
                            <p>{isAr ? "بني خصيصاً للعائلات لإدارة الصحة معاً." : "Built specifically for families to manage health together."}</p>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default AboutUs;