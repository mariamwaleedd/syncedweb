import React, { useState, useEffect, useRef } from 'react';
import './Application.css';
import { useGlobal } from '../context/GlobalContext';
import TopSections from '../common/TopSections';
import { FaAndroid, FaGooglePlay, FaDownload, FaArrowRight, FaCheckCircle, FaMobileAlt } from 'react-icons/fa';

const screens = [
    {
        img: "https://uwtejjvilzwbxzhanbyd.supabase.co/storage/v1/object/public/Synced/imgs/Application/Jla3P43tx11(9).png",
        titleEn: "Hydration & Water Tracker",
        titleAr: "تتبع شرب الماء والترطيب",
        descEn: "Log your daily water intake, set hydration goals, and view quick intake percentages to maintain a healthy fluid balance.",
        descAr: "سجل معدل شرب الماء اليومي، وحدد أهداف الترطيب، واطلع على نسب إنجازك اليومية للحفاظ على توازن السوائل في جسمك."
    },
    {
        img: "https://uwtejjvilzwbxzhanbyd.supabase.co/storage/v1/object/public/Synced/imgs/Application/Jla3P43tx11(10).png",
        titleEn: "Wellness Hub & Vitals Summary",
        titleAr: "لوحة مؤشرات العافية والنشاط",
        descEn: "Get a comprehensive summary of your daily steps, active calories, sleep duration, and hydration metrics in a single interactive dashboard.",
        descAr: "احصل على ملخص شامل لخطواتك اليومية، السعرات الحرارية المحروقة، ساعات النوم، ومؤشرات شرب الماء في لوحة تحكم تفاعلية واحدة."
    },
    {
        img: "https://uwtejjvilzwbxzhanbyd.supabase.co/storage/v1/object/public/Synced/imgs/Application/Jla3P43tx11(11).png",
        titleEn: "Doctor Booking & Consultations",
        titleAr: "حجز مواعيد الأطباء والاستشارات",
        descEn: "Search for healthcare specialists by department, view clinical schedules, schedule physical checkups, and book appointments easily.",
        descAr: "ابحث عن الأخصائيين والأطباء بحسب التخصص، واطلع على جداول العيادات المتاحة، واحجز مواعيدك واستشاراتك الطبية بسهولة."
    },
    {
        img: "https://uwtejjvilzwbxzhanbyd.supabase.co/storage/v1/object/public/Synced/imgs/Application/Jla3P43tx11(12).png",
        titleEn: "Medicine Tracker & Pill Reminders",
        titleAr: "تتبع ذكي للأدوية والجرعات",
        descEn: "Set precise medication schedules, configure custom repeat dosage alarms, track remaining pill inventory, and receive alerts.",
        descAr: "قم بإعداد جداول الأدوية الخاصة بك، وفعل تنبيهات مخصصة بمواعيد الجرعات، وتتبع كمية الأقراص المتبقية لضمان الالتزام بخطتك العلاجية."
    },
    {
        img: "https://uwtejjvilzwbxzhanbyd.supabase.co/storage/v1/object/public/Synced/imgs/Application/Jla3P43tx11(13).png",
        titleEn: "Smart Wearable Device Pairing",
        titleAr: "ربط ومزامنة الأجهزة الذكية",
        descEn: "Scan and pair fitness bands, smartwatches, heart rate monitors, and smart scales via Bluetooth for automated health data importing.",
        descAr: "ابحث واربط الساعات الذكية، أجهزة تتبع النشاط، أحزمة قياس النبض، والموازين الذكية عبر البلوتوث لمزامنة البيانات واستيرادها تلقائياً."
    },
    {
        img: "https://uwtejjvilzwbxzhanbyd.supabase.co/storage/v1/object/public/Synced/imgs/Application/Jla3P43tx11(14).png",
        titleEn: "Secure Medical Reports Vault",
        titleAr: "خزنة التقارير الطبية الآمنة",
        descEn: "Upload, archive, and preview medical reports, laboratory test results, radiological scans, and prescription histories securely.",
        descAr: "قم بتحميل وأرشفة وعرض نتائج التحاليل المختبرية، صور وتقارير الأشعة، والوصفات الطبية الخاصة بك في خزنتك المشفرة والآمنة."
    },
    {
        img: "https://uwtejjvilzwbxzhanbyd.supabase.co/storage/v1/object/public/Synced/imgs/Application/Jla3P43tx11(15).png",
        titleEn: "AI Health Assistant & Symptoms",
        titleAr: "مساعد الصحة بالذكاء الاصطناعي",
        descEn: "Interact with our clinical AI chatbot to analyze wellness trends, check symptoms, ask health queries, and get personalized diet tips.",
        descAr: "دردش مع المساعد الطبي الذكي المدعوم بالذكاء الاصطناعي لتحليل أعراضك، وطرح الاستفسارات الصحية، وتلقي نصائح التغذية والعافية."
    },
    {
        img: "https://uwtejjvilzwbxzhanbyd.supabase.co/storage/v1/object/public/Synced/imgs/Application/Jla3P43tx11(16).png",
        titleEn: "Family Circle & Emergency SOS Alerts",
        titleAr: "بوابة العائلة وطوارئ SOS",
        descEn: "Manage family profiles, track vitals (heart rate, blood pressure, oxygen) for dependents, and coordinate instant emergency alerts.",
        descAr: "أدر حسابات عائلتك (الأطفال وكبار السن)، وراقب مؤشراتهم الحيوية الحية (النبض، ضغط الدم، الأكسجين)، وفعل نداء الطوارئ SOS عند الخطر."
    }
];

const steps = [
    {
        num: "01",
        titleEn: "Download & Permissions",
        titleAr: "تحميل التطبيق والأذونات",
        descEn: "Download Synced Health Hub from Google Play or APKPure. Enable Bluetooth for medical devices and notifications for medication schedules.",
        descAr: "قم بتنزيل تطبيق Synced Health Hub من متجر Google Play أو APKPure. قم بتفعيل البلوتوث لربط الأجهزة الطبية والتنبيهات لمواعيد الأدوية."
    },
    {
        num: "02",
        titleEn: "Setup Profiles & Circle",
        titleAr: "إعداد الملفات الشخصية ودائرة العائلة",
        descEn: "Create your secure account. Add your personal metrics (blood type, allergies, conditions) and invite family members to join your health circle.",
        descAr: "أنشئ حسابك الآمن. أضف مؤشراتك الشخصية (فصيلة الدم، الحساسية، الأمراض المزمنة) وادعُ أفراد عائلتك للانضمام إلى دائرتك الصحية."
    },
    {
        num: "03",
        titleEn: "Pair Wearable Sensors",
        titleAr: "ربط الأجهزة والمستشعرات الذكية",
        descEn: "Connect your smartwatch, fitness tracker, or blood pressure monitors. The app automatically syncs heart rate, sleep, oxygen, and blood sugar trends.",
        descAr: "اربط ساعتك الذكية، أو متتبع اللياقة البدنية، أو أجهزة قياس ضغط الدم. يقوم التطبيق بمزامنة نبضات القلب، النوم، والأكسجين تلقائياً."
    },
    {
        num: "04",
        titleEn: "Configure Meds & Vault",
        titleAr: "إعداد الأدوية وخزنة التقارير",
        descEn: "Input your prescription details and set precise dosage reminders. Scan and upload medical reports, lab results, and prescriptions to your secure vault.",
        descAr: "أدخل تفاصيل الوصفات الطبية وحدد مواعيد وجرعات الأدوية بدقة. قم بمسح وتحميل التقارير الطبية ونتائج التحاليل إلى خزنتك الآمنة."
    },
    {
        num: "05",
        titleEn: "Monitor & Share Vitals",
        titleAr: "المتابعة ومشاركة المؤشرات",
        descEn: "View live health charts, access AI symptom assessment tools, share reports directly with doctors, and activate SOS emergency signals if needed.",
        descAr: "تابع الرسوم البيانية الحية، واستخدم مساعد الذكاء الاصطناعي، وشارك التقارير مع أخصائيك، أو فعل نداء الطوارئ SOS عند الحاجة."
    }
];

const Application = () => {
    const { isAr } = useGlobal();
    const [activeIndex, setActiveIndex] = useState(0);
    const [previewIndex, setPreviewIndex] = useState(null);
    const scrollContainerRef = useRef(null);

    const handleScroll = (e) => {
        const container = e.target;
        if (window.innerWidth > 1024) return;
        
        const containerRect = container.getBoundingClientRect();
        const containerCenter = containerRect.left + containerRect.width / 2;

        const items = container.querySelectorAll('.showcase-nav-item');
        let closestIndex = activeIndex;
        let minDistance = Infinity;

        items.forEach((item, idx) => {
            const itemRect = item.getBoundingClientRect();
            const itemCenter = itemRect.left + itemRect.width / 2;
            const distance = Math.abs(containerCenter - itemCenter);
            if (distance < minDistance) {
                minDistance = distance;
                closestIndex = idx;
            }
        });

        if (closestIndex !== activeIndex) {
            setActiveIndex(closestIndex);
        }
    };

    const handleCardClick = (idx) => {
        setActiveIndex(idx);
        const container = scrollContainerRef.current;
        if (container) {
            const items = container.querySelectorAll('.showcase-nav-item');
            const targetItem = items[idx];
            if (targetItem) {
                targetItem.scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest',
                    inline: 'center'
                });
            }
        }
    };

    useEffect(() => {
        document.title = isAr ? "سينكد | التطبيق الذكي" : "Synced | Mobile App";
        window.scrollTo(0, 0);
    }, [isAr]);

    useEffect(() => {
        if (previewIndex === null) return;
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                setPreviewIndex(null);
            } else if (e.key === 'ArrowLeft') {
                setPreviewIndex((prev) => (prev === 0 ? screens.length - 1 : prev - 1));
            } else if (e.key === 'ArrowRight') {
                setPreviewIndex((prev) => (prev === screens.length - 1 ? 0 : prev + 1));
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [previewIndex]);

    return (
        <div className="app-page-root">
            <TopSections 
                titleMain={isAr ? "اكتشف تطبيق " : "Discover the "}
                titleItalic={isAr ? "سينكد للهواتف" : "synced mobile app"}
                description={isAr 
                    ? "منصتك الصحية المتكاملة في جيبك. تتبع ذكي للمؤشرات الحيوية، تنبيهات الأدوية، وبوابة العائلة." 
                    : "Your complete health platform in your pocket. Smart vitals tracking, medicine reminders, and family health circle."}
            />

            <main className="app-main-content">
                <section className="app-summary-sec">
                    <div className="app-summary-card">
                        <div className="app-summary-text">
                            <h2>{isAr ? "صحتك وصحة عائلتك في مكان واحد" : "Your Health & Family in One Place"}</h2>
                            <p>
                                {isAr 
                                    ? "تم تصميم تطبيق سينكد للهواتف الذكية ليكون بمثابة مرافقك الصحي اليومي. إنه يربطك مباشرة بجهات الاتصال الطبية وأفراد عائلتك للحصول على رعاية صحية فورية ومزامنة المؤشرات الحيوية تلقائياً من الأجهزة الذكية. كما يوفر وصولاً مبسطاً للوصفات الطبية ومواعيد الفحوصات الدورية للحفاظ على التوازن الصحي."
                                    : "The Synced mobile application is designed to be your daily health companion. It links you directly to your family members and doctors for real-time care, automatically syncing live vitals from smartwatches and medical trackers. It also grants simplified access to prescription logs and scheduled checkups to keep everyone in optimal physical condition."
                                }
                            </p>
                            <ul className="app-summary-bullets">
                                <li><FaCheckCircle className="bullet-check" /> {isAr ? "مراقبة مستمرة للمؤشرات الحيوية" : "Continuous Vitals Monitoring"}</li>
                                <li><FaCheckCircle className="bullet-check" /> {isAr ? "تنبيهات جرعات الأدوية والوصفات" : "Prescription & Medication Reminders"}</li>
                                <li><FaCheckCircle className="bullet-check" /> {isAr ? "مشاركة التقارير والتحاليل الطبية" : "Easy Lab & Report Vault Sharing"}</li>
                                <li><FaCheckCircle className="bullet-check" /> {isAr ? "إشعارات طوارئ فورية لمحيطك" : "Instant Emergency SOS Notifications"}</li>
                            </ul>
                        </div>
                        <div className="app-summary-cta">
                            <h3>{isAr ? "حمل التطبيق الآن" : "Download the App Now"}</h3>
                            <p>{isAr ? "ابدأ رحلة إدارة صحة عائلتك الذكية بلمسة واحدة." : "Begin your family health management journey with a single tap."}</p>
                            <div className="app-cta-btns">
                                <a href="https://play.google.com/apps/internaltest/4701006948578557043" target="_blank" rel="noreferrer" className="cta-download-btn google-play">
                                    <FaGooglePlay className="btn-icon" />
                                    <span>Google Play</span>
                                </a>
                                <a href="https://apkpure.com/synced-health-hub/com.synced.healthhub" target="_blank" rel="noreferrer" className="cta-download-btn apk-pure">
                                    <FaAndroid className="btn-icon" />
                                    <span>APKPURE</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="app-interactive-showcase">
                    <div className="section-title">
                        <h2>
                            {isAr ? "واجهات " : "App "}
                            <i>{isAr ? "التطبيق" : "Screens"}</i>
                        </h2>
                        <p>{isAr ? "استكشف ميزات التطبيق من خلال واجهاته الحية" : "Explore the mobile application features through its interfaces"}</p>
                    </div>

                    <div className="showcase-container">
                        <div className="showcase-mockup-wrapper" onClick={() => setPreviewIndex(activeIndex)} style={{ cursor: 'pointer' }}>
                            <div className="phone-bezel">
                                <div className="phone-screen">
                                    {screens.map((screen, idx) => (
                                        <img 
                                            key={idx}
                                            src={screen.img} 
                                            alt={isAr ? screen.titleAr : screen.titleEn} 
                                            className={`screen-img ${idx === activeIndex ? 'active' : ''}`}
                                        />
                                    ))}
                                    <div className="screen-overlay-glow"></div>
                                </div>
                            </div>
                        </div>

                        <div 
                            className="showcase-nav-list"
                            ref={scrollContainerRef}
                            onScroll={handleScroll}
                        >
                            {screens.map((screen, idx) => (
                                <div 
                                    className={`showcase-nav-item ${idx === activeIndex ? 'active' : ''}`}
                                    key={idx}
                                    onClick={() => handleCardClick(idx)}
                                >
                                    <span className="nav-index">0{idx + 1}</span>
                                    <div className="nav-item-content">
                                        <h4>{isAr ? screen.titleAr : screen.titleEn}</h4>
                                        <p>{isAr ? screen.descAr : screen.descEn}</p>
                                    </div>
                                    <FaArrowRight className="nav-arrow" />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="app-all-screens-sec">
                    <div className="section-title center">
                        <h2>
                            {isAr ? "معرض الشاشات " : "All App "}
                            <i>{isAr ? "الكاملة" : "Screens"}</i>
                        </h2>
                        <p>{isAr ? "نظرة شاملة على جميع واجهات وخصائص البرنامج" : "A complete overview of all application screens and layouts"}</p>
                    </div>
                    
                    <div className="screens-grid">
                        {screens.map((screen, idx) => (
                            <div className="screen-grid-card" key={idx} onClick={() => setPreviewIndex(idx)} style={{ cursor: 'pointer' }}>
                                <div className="screen-grid-bezel">
                                    <img src={screen.img} alt={screen.titleEn} className="grid-screen-img" />
                                </div>
                                <h4>{isAr ? screen.titleAr : screen.titleEn}</h4>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="app-how-to-sec">
                    <div className="section-title center">
                        <h2>
                            {isAr ? "كيفية " : "How to "}
                            <i>{isAr ? "الاستخدام" : "Use"}</i>
                        </h2>
                        <p>{isAr ? "خطوات بسيطة لبدء رحلتك الصحية معنا" : "Simple steps to start your health journey with us"}</p>
                    </div>

                    <div className="app-steps-container-expanded">
                        {steps.map((step, idx) => (
                            <div className="app-step-row-card" key={idx}>
                                <div className="step-row-num-box">
                                    <span>{step.num}</span>
                                </div>
                                <div className="step-row-content">
                                    <h3>{isAr ? step.titleAr : step.titleEn}</h3>
                                    <p>{isAr ? step.descAr : step.descEn}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="app-specs-sec">
                    <div className="section-title center">
                        <h2>
                            {isAr ? "مواصفات وتكامل " : "App Specs & "}
                            <i>{isAr ? "التطبيق" : "Capabilities"}</i>
                        </h2>
                        <p>{isAr ? "قوة تقنية متطورة بين يديك للحفاظ على سلامة أسرتك" : "Advanced technical capabilities in your hands to keep your family safe"}</p>
                    </div>

                    <div className="specs-grid">
                        <div className="spec-card">
                            <FaCheckCircle className="spec-icon-check" />
                            <div className="spec-card-content">
                                <h3>{isAr ? "توافق شامل مع الأجهزة" : "Universal Device Syncing"}</h3>
                                <p>{isAr ? "يتكامل بسلاسة مع أشهر الساعات الذكية مثل Fitbit وGarmin وأجهزة WearOS، بالإضافة إلى أجهزة قياس ضغط الدم ونبضات القلب التي تدعم البلوتوث." : "Seamlessly integrates with popular smartwatches including Fitbit, Garmin, and WearOS devices, alongside Bluetooth-enabled blood pressure cuffs and glucose meters."}</p>
                            </div>
                        </div>

                        <div className="spec-card">
                            <FaCheckCircle className="spec-icon-check" />
                            <div className="spec-card-content">
                                <h3>{isAr ? "أمان وتشفير على مستوى بنكي" : "Bank-Grade Cryptography"}</h3>
                                <p>{isAr ? "يتم تشفير جميع التقارير الطبية المرفوعة والبيانات الحيوية الحساسة باستخدام بروتوكولات التشفير التام لحماية خصوصيتك وضمان سرية معلوماتك." : "Protects medical records and vital logs with end-to-end encryption. Your sensitive clinical documentation is stored securely in compliant database silos."}</p>
                            </div>
                        </div>

                        <div className="spec-card">
                            <FaCheckCircle className="spec-icon-check" />
                            <div className="spec-card-content">
                                <h3>{isAr ? "التسجيل والمزامنة في وضع عدم الاتصال" : "Offline Logging & Auto-Sync"}</h3>
                                <p>{isAr ? "قم بتسجيل جرعات الأدوية والأعراض حتى لو لم تكن متصلاً بالإنترنت. سيقوم التطبيق بحفظ البيانات محلياً ورفعها تلقائياً عند استعادة الاتصال." : "Log medications and symptoms even without internet connectivity. The app stores entries locally and performs background synchronization once connection is restored."}</p>
                            </div>
                        </div>

                        <div className="spec-card">
                            <FaCheckCircle className="spec-icon-check" />
                            <div className="spec-card-content">
                                <h3>{isAr ? "تنبيهات عائلية ذكية" : "Smart Family Notifications"}</h3>
                                <p>{isAr ? "نظام إشعارات ذكي ينبه أفراد العائلة فوراً في حال تفويت جرعة دواء حرجة أو عند رصد مؤشرات حيوية غير طبيعية من الأجهزة المتصلة." : "Intelligent alerts that instantly notify family members in case of critical missed medication doses or abnormal vital readings detected from paired devices."}</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="app-quick-download">
                    <div className="quick-download-card">
                        <FaMobileAlt className="quick-icon" />
                        <h2>{isAr ? "ابدأ رعاية صحتك اليوم" : "Start Managing Your Health Today"}</h2>
                        <p>{isAr ? "حمل تطبيق سينكد للهواتف وابدأ بتتبع المؤشرات الحيوية لعائلتك." : "Download the Synced app now and start tracking your family's live vitals."}</p>
                        <div className="quick-btns">
                            <a href="https://apkpure.com/synced-health-hub/com.synced.healthhub" target="_blank" rel="noreferrer" className="quick-btn-link apk">
                                <FaDownload /> APKPURE
                            </a>
                            <a href="https://play.google.com/apps/internaltest/4701006948578557043" target="_blank" rel="noreferrer" className="quick-btn-link play">
                                <FaGooglePlay /> Google Play
                            </a>
                        </div>
                    </div>
                </section>
            </main>

            {previewIndex !== null && (
                <div className="app-preview-overlay" onClick={() => setPreviewIndex(null)}>
                    <div className="app-preview-modal" onClick={(e) => e.stopPropagation()}>
                        <button className="preview-close-btn" onClick={() => setPreviewIndex(null)} aria-label="Close">
                            &times;
                        </button>
                        
                        <button className="preview-nav-btn prev" onClick={() => setPreviewIndex((prev) => (prev === 0 ? screens.length - 1 : prev - 1))} aria-label="Previous">
                            &#8249;
                        </button>
                        
                        <div className="preview-content">
                            <img 
                                src={screens[previewIndex].img} 
                                alt={isAr ? screens[previewIndex].titleAr : screens[previewIndex].titleEn} 
                                className="preview-img"
                            />
                            <div className="preview-caption">
                                <h3>{isAr ? screens[previewIndex].titleAr : screens[previewIndex].titleEn}</h3>
                                <p>{isAr ? screens[previewIndex].descAr : screens[previewIndex].descEn}</p>
                            </div>
                        </div>
                        
                        <button className="preview-nav-btn next" onClick={() => setPreviewIndex((prev) => (prev === screens.length - 1 ? 0 : prev + 1))} aria-label="Next">
                            &#8250;
                        </button>
                    </div>
                </div>
            )}

        </div>
    );
};

export default Application;
