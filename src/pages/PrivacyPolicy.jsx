import React from 'react';
import './PrivacyPolicy.css';
import TopSections from '../common/TopSections';
import { useGlobal } from '../context/GlobalContext';
import { 
    FaShieldAlt, FaLock, FaEye, FaDatabase, FaCloud, FaMobileAlt, 
    FaUserShield, FaGlobe, FaFileContract, FaKey, FaUserCheck, FaNetworkWired,
    FaFingerprint, FaBug, FaChartLine, FaTools, FaLaptopCode, FaCheckCircle
} from 'react-icons/fa';


    useEffect(() => {
        document.title = isAr ? "سينكد | سياسة الخصوصية" : "Synced | Privacy Policy";
    }, [isAr]);

const PrivacyPolicy = () => {
    const { isAr } = useGlobal();

    return (
        <div className="privacy-page">
            <TopSections 
                titleMain={isAr ? "سياسة " : "Privacy "}
                titleItalic={isAr ? "الخصوصية" : "Policy"}
                description={isAr 
                    ? "التزامنا بحماية بياناتك الصحية وضمان أعلى مستويات الأمان والخصوصية." 
                    : "Our commitment to protecting your health data and ensuring the highest standards of security and privacy."}
            />

            <main className="privacy-content">
                <section className="protection-hero-card">
                    <div className="protection-text">
                        <div className="p-icon-main"><FaShieldAlt /></div>
                        <h2>{isAr ? "حماية بيانات بمعايير مؤسسية" : "Enterprise-Grade Data Protection"}</h2>
                        <p>{isAr 
                            ? "تتم حماية بياناتك باستخدام أدوات تشفير AES-256 المتوافقة مع معايير الصناعة أثناء النقل والسكون. نحن نطبق طبقات متعددة من بروتوكولات الأمان لضمان بقاء معلوماتك سرية ومحمية من الوصول غير المصرح به."
                            : "Your data is encrypted using industry-standard AES-256 encryption both in transit and at rest. We implement multiple layers of security protocols to ensure your information remains confidential and protected from unauthorized access."}</p>
                    </div>
                    <div className="protection-stats">
                        <div className="p-stat-box">
                            <h4>256-bit</h4>
                            <p>{isAr ? "معيار التشفير" : "Encryption Standard"}</p>
                        </div>
                        <div className="p-stat-box">
                            <h4>24/7</h4>
                            <p>{isAr ? "مراقبة التهديدات" : "Threat Monitoring"}</p>
                        </div>
                        <div className="p-stat-box">
                            <h4>99.9%</h4>
                            <p>{isAr ? "وقت تشغيل الأمان" : "Uptime Guarantee"}</p>
                        </div>
                        <div className="p-stat-box">
                            <h4>SOC 2</h4>
                            <p>{isAr ? "متوافق مع المعايير" : "Type II Compliant"}</p>
                        </div>
                    </div>
                </section>

                <div className="infra-privacy-grid">
                    <div className="side-card">
                        <FaNetworkWired className="card-icon" />
                        <h3>{isAr ? "بنية تحتية آمنة" : "Secure Infrastructure"}</h3>
                        <p>{isAr 
                            ? "تتم استضافة أنظمتنا في مراكز بيانات معتمدة من SOC 2 مع أنظمة تكرار وأجهزة كشف التهديدات الآلية."
                            : "Our systems are hosted in SOC 2 Type II certified data centers with redundant systems and automated threat detectors."}</p>
                        <ul>
                            <li>{isAr ? "تكرار متعدد المناطق" : "Multi-region redundancy"}</li>
                            <li>{isAr ? "أنظمة تجاوز الفشل الآلية" : "Automated failover systems"}</li>
                            <li>{isAr ? "شبكة سحابية معزولة" : "Cloud isolation enabled"}</li>
                        </ul>
                    </div>
                    <div className="side-card">
                        <FaEye className="card-icon" />
                        <h3>{isAr ? "نهج الخصوصية أولاً" : "Privacy First Approach"}</h3>
                        <p>{isAr 
                            ? "شفافية كاملة في كيفية تعاملنا مع بياناتك. معلوماتك ملك لك دائماً."
                            : "Complete transparency in how we handle your data. Your information belongs to you, always."}</p>
                        <ul>
                            <li>{isAr ? "لا نبيع بياناتك أبداً" : "Never sell your data"}</li>
                            <li>{isAr ? "إمكانية نقل البيانات" : "Full data portability"}</li>
                            <li>{isAr ? "الحق في النسيان" : "Right to be forgotten"}</li>
                        </ul>
                    </div>
                </div>

                <section className="process-section-privacy">
                    <h2 className="section-title-center">{isAr ? "عملية الأمان لدينا" : "Our Security Process"}</h2>
                    <div className="process-flow">
                        <div className="p-flow-item">
                            <div className="flow-icon"><FaDatabase /></div>
                            <h4>{isAr ? "جمع البيانات" : "Data Collection"}</h4>
                            <p>{isAr ? "جمع الحد الأدنى من البيانات" : "Minimal data collection"}</p>
                        </div>
                        <div className="p-flow-item">
                            <div className="flow-icon"><FaKey /></div>
                            <h4>{isAr ? "التشفير" : "Encryption"}</h4>
                            <p>{isAr ? "تشفير شامل وفوري" : "Instant end-to-end encryption"}</p>
                        </div>
                        <div className="p-flow-item">
                            <div className="flow-icon"><FaCloud /></div>
                            <h4>{isAr ? "تخزين آمن" : "Secure Storage"}</h4>
                            <p>{isAr ? "خوادم سحابية محمية" : "Protected cloud storage"}</p>
                        </div>
                        <div className="p-flow-item">
                            <div className="flow-icon"><FaCheckCircle /></div>
                            <h4>{isAr ? "حذف البيانات" : "Data Deletion"}</h4>
                            <p>{isAr ? "تطهير كامل عند الطلب" : "Complete purge on request"}</p>
                        </div>
                    </div>
                </section>

                <div className="compliance-grid">
                    <div className="mini-card"><FaUserCheck /> <h4>{isAr ? "التحكم في الوصول" : "Access Control"}</h4></div>
                    <div className="mini-card"><FaFileContract /> <h4>{isAr ? "الامتثال" : "Compliance"}</h4></div>
                    <div className="mini-card"><FaBug /> <h4>{isAr ? "الاستجابة للحوادث" : "Incident Response"}</h4></div>
                    <div className="mini-card"><FaChartLine /> <h4>{isAr ? "تنبيهات الأمان" : "Security Alerts"}</h4></div>
                    <div className="mini-card"><FaLock /> <h4>{isAr ? "أمان السحابة" : "Cloud Security"}</h4></div>
                    <div className="mini-card"><FaDatabase /> <h4>{isAr ? "نسخ احتياطي" : "Data Backup"}</h4></div>
                </div>

                <section className="training-card">
                    <div className="training-left">
                        <FaUserShield className="t-icon" />
                        <h2>{isAr ? "تدريب الموظفين على الأمان" : "Employee Security Training"}</h2>
                    </div>
                    <div className="training-right">
                        <p>{isAr 
                            ? "يخضع جميع الموظفين لتدريب شامل على التوعية الأمنية عند التعيين ودورات تنشيطية ربع سنوية."
                            : "All employees undergo comprehensive security awareness training upon hiring and quarterly refresher courses."}</p>
                        <div className="t-grid">
                            <div className="t-box"><h5>{isAr ? "تدريب أولي" : "Initial Training"}</h5></div>
                            <div className="t-box"><h5>{isAr ? "تحديثات ربع سنوية" : "Quarterly Updates"}</h5></div>
                            <div className="t-box"><h5>{isAr ? "فحص الخلفية" : "Background Checks"}</h5></div>
                            <div className="t-box"><h5>{isAr ? "اتفاقيات السرية" : "NDAs Required"}</h5></div>
                        </div>
                    </div>
                </section>

                <section className="international-standards">
                    <div className="is-left">
                        <FaGlobe className="globe-icon" />
                        <h2>{isAr ? "المعايير الدولية والامتثال" : "International Standards & Compliance"}</h2>
                        <p>{isAr 
                            ? "نحن نلتزم بمعايير ISO 27001 و ISO 27701. تتماشى خصوصيتنا مع مبادئ الخصوصية الصارمة."
                            : "We adhere to ISO 27001 and ISO 27701 standards. Our privacy framework aligns with strict privacy principles."}</p>
                    </div>
                    <div className="is-right">
                        <div className="badge-grid">
                            <span>HIPAA</span><span>GDPR</span><span>ISO 27001</span><span>CCPA</span><span>SOC 2</span><span>PCI DSS</span>
                        </div>
                    </div>
                </section>

                <section className="mobile-security-card">
                    <div className="ms-left">
                        <div className="ms-item"><FaMobileAlt /> <span>{isAr ? "تشفير الأجهزة" : "Device Encryption"}</span></div>
                        <div className="ms-item"><FaFingerprint /> <span>{isAr ? "المقاييس الحيوية" : "Biometric Locks"}</span></div>
                        <div className="ms-item"><FaShieldAlt /> <span>{isAr ? "حماية التطبيق" : "App Sandbox"}</span></div>
                    </div>
                    <div className="ms-right">
                        <h2>{isAr ? "أمان تطبيق الجوال" : "Mobile Application Security"}</h2>
                        <p>{isAr 
                            ? "تنفذ تطبيقاتنا للهواتف المحمولة تقنيات متقدمة لتأمين التخزين والاتصال."
                            : "Our mobile applications implement advanced sandboxing, secure storage, and runtime protection (RASP)."}</p>
                    </div>
                </section>

                <section className="advanced-features">
                    <h2 className="section-title-center">{isAr ? "ميزات أمان متقدمة" : "Advanced Security Features"}</h2>
                    <div className="adv-grid">
                        <div className="adv-card"><FaFingerprint /> <span>{isAr ? "المصادقة الثنائية" : "Biometric Auth"}</span></div>
                        <div className="adv-card"><FaBug /> <span>{isAr ? "فحص الثغرات" : "Vulnerability Scan"}</span></div>
                        <div className="adv-card"><FaChartLine /> <span>{isAr ? "مراقبة فورية" : "Real-time Monitor"}</span></div>
                        <div className="adv-card"><FaKey /> <span>{isAr ? "عزل المفاتيح" : "Password Isolation"}</span></div>
                        <div className="adv-card"><FaTools /> <span>{isAr ? "أمان الـ API" : "API Security"}</span></div>
                        <div className="adv-card"><FaLaptopCode /> <span>{isAr ? "إدارة الجلسات" : "Session Management"}</span></div>
                        <div className="adv-card"><FaEye /> <span>{isAr ? "عناصر التحكم" : "Privacy Controls"}</span></div>
                        <div className="adv-card"><FaShieldAlt /> <span>{isAr ? "تدقيق الأمان" : "Security Audits"}</span></div>
                    </div>
                </section>

                <section className="footer-banner">
                    <div className="fb-icon"><FaShieldAlt /></div>
                    <h2>{isAr ? "بياناتك. تحكمك." : "Your Data. Your Control."}</h2>
                    <p>{isAr 
                        ? "تلتزم سينكد بالحفاظ على أعلى معايير الأمان والخصوصية. ثقتك تُكتسب من خلال الشفافية والبروتوكولات الصارمة."
                        : "Synced is committed to maintaining the highest standards of security and privacy. Your trust is earned through transparency, rigorous protocols, and unwavering dedication."}</p>
                </section>
            </main>
        </div>
    );
};

export default PrivacyPolicy;