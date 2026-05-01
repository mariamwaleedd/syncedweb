import React, { useEffect, useRef, useState } from 'react';
import { useGlobal } from '../context/GlobalContext';
import toast from 'react-hot-toast';
import './Blogs.css';

import blogHero from '../imgs/blog.png';
import story1 from '../imgs/div.png';
import story2 from '../imgs/div-1.png';
import story3 from '../imgs/div-2.png';
import topic1 from '../imgs/Container1.png';
import topic2 from '../imgs/Container2.png';
import topic3 from '../imgs/Container3.png';
import topic4 from '../imgs/Container4.png';

const Blogs = () => {
    const { isAr } = useGlobal();
    const sectionRefs = useRef([]);

    const [selectedArticle, setSelectedArticle] = useState(null);
    const [email, setEmail] = useState('');

    useEffect(() => {
        document.title = isAr ? "سينكد | المدونة" : "Synced | Blogs";
    }, [isAr]);

    useEffect(() => {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: "0px 0px -50px 0px"
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal-visible');
                }
            });
        }, observerOptions);

        sectionRefs.current.forEach((ref) => {
            if (ref) observer.observe(ref);
        });

        return () => observer.disconnect();
    }, []);

    const addToRefs = (el) => {
        if (el && !sectionRefs.current.includes(el)) {
            sectionRefs.current.push(el);
        }
    };

    const handleOpenArticle = (data) => {
        setSelectedArticle(data);
    };

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (!email.trim()) return;
        toast.success(isAr ? "تم الاشتراك بنجاح!" : "Subscribed successfully!");
        setEmail('');
    };

    return (
        <div className="blog-page-container">
            <section className="blog-hero reveal-section" ref={addToRefs} style={{ backgroundImage: `url(${blogHero})` }}>
                <div className="blog-hero-overlay">
                    <div className="blog-hero-content" onClick={() => handleOpenArticle({
                        image: blogHero,
                        category: "Featured Article",
                        title: "The Complete Guide to Living a Healthier, Happier Life in 2026",
                        desc: "Discover evidence-based strategies for improving your physical and mental wellbeing, from nutrition and exercise to mindfulness and sleep optimization. This comprehensive guide breaks down the latest research into actionable daily habits that you can start implementing today to drastically improve your quality of life.",
                        author: "Dr. Sarah Martinez",
                        date: "February 25, 2026",
                        readTime: "8 min read"
                    })} style={{cursor: 'pointer'}}>
                        <span className="featured-badge">Featured Article</span>
                        <h1>The Complete Guide to Living a <i>Healthier, Happier</i> Life in 2026</h1>
                        <p>Discover evidence-based strategies for improving your physical and mental wellbeing, from nutrition and exercise to mindfulness and sleep optimization.</p>
                        <div className="author-box">
                            <div className="author-avatar">DR</div>
                            <div className="author-info">
                                <strong>Dr. Sarah Martinez</strong>
                                <span>Wellness Expert</span>
                            </div>
                            <div className="meta-info">
                                <span>February 25, 2026</span>
                                <span className="dot"></span>
                                <span>8 min read</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="blog-section reveal-section" ref={addToRefs}>
                <div className="section-header">
                    <h2>Featured <i>Health</i> Stories</h2>
                    <p>Curated insights from leading health professionals</p>
                </div>
                <div className="stories-grid">
                    <div className="story-card" onClick={() => handleOpenArticle({
                        image: story1,
                        category: "Fitness",
                        title: "Fitness Made Simple: Workouts for Every Level",
                        desc: "From beginner to advanced, find the perfect exercise routine to match your fitness goals. We explore the benefits of progressive overload, cardiovascular conditioning, and flexibility training, giving you a complete blueprint to transform your physical health without burnout.",
                        author: "Synced Fitness Team",
                        date: "Feb 23, 2026",
                        readTime: "7 min read"
                    })}>
                        <div className="img-zoom-wrap"><img loading="lazy" src={story1} alt="Fitness" /></div>
                        <div className="story-card-content">
                            <h3>Fitness Made Simple: Workouts for Every Level</h3>
                            <p>From beginner to advanced, find the perfect exercise routine to match your fitness goals.</p>
                            <div className="card-footer">
                                <span>Feb 23, 2026</span>
                                <span>7 min read</span>
                            </div>
                        </div>
                    </div>
                    <div className="story-card" onClick={() => handleOpenArticle({
                        image: story2,
                        category: "Nutrition",
                        title: "Nutrition Essentials: Building a Balanced Plate",
                        desc: "Expert nutritionists share their top tips for creating meals that nourish your body and mind. Learn about macronutrient balancing, micronutrient density, and how to build sustainable eating habits that don't rely on restrictive crash diets.",
                        author: "Synced Nutrition Team",
                        date: "Feb 24, 2026",
                        readTime: "6 min read"
                    })}>
                        <div className="img-zoom-wrap"><img loading="lazy" src={story2} alt="Nutrition" /></div>
                        <div className="story-card-content">
                            <h3>Nutrition Essentials: Building a Balanced Plate</h3>
                            <p>Expert nutritionists share their top tips for creating meals that nourish your body and mind.</p>
                            <div className="card-footer">
                                <span>Feb 24, 2026</span>
                                <span>6 min read</span>
                            </div>
                        </div>
                    </div>
                    <div className="story-card" onClick={() => handleOpenArticle({
                        image: story3,
                        category: "Mindfulness",
                        title: "Mindfulness Meditation: Transform Your Mental Health",
                        desc: "Learn how daily meditation practices can reduce stress, improve focus, and enhance overall wellbeing. This article covers the neurological benefits of mindfulness and provides a simple 5-minute daily routine to get you started.",
                        author: "Synced Psychology Team",
                        date: "Feb 26, 2026",
                        readTime: "5 min read"
                    })}>
                        <div className="img-zoom-wrap"><img loading="lazy" src={story3} alt="Mindfulness" /></div>
                        <div className="story-card-content">
                            <h3>Mindfulness Meditation: Transform Your Mental Health</h3>
                            <p>Learn how daily meditation practices can reduce stress, improve focus, and enhance overall wellbeing.</p>
                            <div className="card-footer">
                                <span>Feb 26, 2026</span>
                                <span>5 min read</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="blog-section topics-bg reveal-section" ref={addToRefs}>
                <div className="section-header">
                    <h2>Explore <i>Health</i> Topics</h2>
                    <p>Deep dive into specific areas of wellness</p>
                </div>
                <div className="topics-grid">
                    <div className="topic-card" style={{ backgroundImage: `url(${topic1})` }} onClick={() => handleOpenArticle({
                        image: topic1,
                        category: "Topic Collection",
                        title: "Mental Wellness Hub",
                        desc: "Explore our collection of 42 articles focused entirely on emotional balance, psychological health, and stress management strategies.",
                        author: "Multiple Authors",
                        date: "Updated Recently",
                        readTime: "Multiple Articles"
                    })}>
                        <div className="topic-overlay">
                            <h3>Mental Wellness</h3>
                            <p>Strategies for emotional balance and psychological health</p>
                            <button className="topic-btn">42 articles</button>
                        </div>
                    </div>
                    <div className="topic-card" style={{ backgroundImage: `url(${topic2})` }} onClick={() => handleOpenArticle({
                        image: topic2,
                        category: "Topic Collection",
                        title: "Heart Health Hub",
                        desc: "Explore our collection of 38 articles focused on cardiovascular wellness, prevention, and lifestyle choices that protect your heart.",
                        author: "Multiple Authors",
                        date: "Updated Recently",
                        readTime: "Multiple Articles"
                    })}>
                        <div className="topic-overlay">
                            <h3>Heart Health</h3>
                            <p>Cardiovascular wellness and prevention</p>
                            <button className="topic-btn">38 articles</button>
                        </div>
                    </div>
                    <div className="topic-card" style={{ backgroundImage: `url(${topic3})` }} onClick={() => handleOpenArticle({
                        image: topic3,
                        category: "Topic Collection",
                        title: "Medical Insights Hub",
                        desc: "Read our 56 articles covering the latest research, medical breakthroughs, and scientific discoveries in the healthcare field.",
                        author: "Multiple Authors",
                        date: "Updated Recently",
                        readTime: "Multiple Articles"
                    })}>
                        <div className="topic-overlay">
                            <h3>Medical Insights</h3>
                            <p>Latest research and medical breakthroughs</p>
                            <button className="topic-btn">56 articles</button>
                        </div>
                    </div>
                    <div className="topic-card" style={{ backgroundImage: `url(${topic4})` }} onClick={() => handleOpenArticle({
                        image: topic4,
                        category: "Topic Collection",
                        title: "Sleep & Recovery Hub",
                        desc: "Dive into 31 articles dedicated to optimizing your rest, understanding sleep cycles, and maximizing your body's recovery processes.",
                        author: "Multiple Authors",
                        date: "Updated Recently",
                        readTime: "Multiple Articles"
                    })}>
                        <div className="topic-overlay">
                            <h3>Sleep & Recovery</h3>
                            <p>Optimize your rest for better health</p>
                            <button className="topic-btn">31 articles</button>
                        </div>
                    </div>
                </div>
            </section>

            <section className="blog-section reveal-section" ref={addToRefs}>
                <div className="section-header">
                    <h2>Latest <i>Health</i> News</h2>
                    <p>Stay informed with cutting-edge health research and insights</p>
                </div>
                <div className="news-grid">
                    {[
                        { cat: "Research", t: "New Study Links Mediterranean Diet to Longevity", d: "Researchers find compelling evidence that Mediterranean eating patterns may add years to your life.", date: "Feb 28, 2026", time: "4 min read" },
                        { cat: "Science", t: "Understanding Gut Health: The Microbiome Revolution", d: "How the trillions of bacteria in your digestive system influence everything from immunity to mood.", date: "Feb 27, 2026", time: "6 min read" },
                        { cat: "Mental Health", t: "Managing Stress in the Modern Workplace", d: "Evidence-based techniques for reducing workplace anxiety and improving professional wellbeing.", date: "Feb 27, 2026", time: "5 min read" },
                        { cat: "Medical News", t: "Breakthrough in Alzheimer's Early Detection", d: "New diagnostic tools promise to identify Alzheimer's disease years before symptoms appear.", date: "Feb 26, 2026", time: "7 min read" },
                        { cat: "Fitness", t: "The Science of High-Intensity Interval Training", d: "Why short bursts of intense exercise might be more effective than traditional cardio.", date: "Feb 25, 2026", time: "5 min read" },
                        { cat: "Nutrition", t: "Plant-Based Proteins: Complete Nutrition Guide", d: "Everything you need to know about meeting your protein needs without animal products.", date: "Feb 25, 2026", time: "8 min read" }
                    ].map((news, index) => (
                        <div className="news-card" key={index} onClick={() => handleOpenArticle({
                            image: blogHero,
                            category: news.cat,
                            title: news.t,
                            desc: news.d + " This comprehensive report details the methodologies used, the key findings from the latest research papers, and what this means for the future of general public health and preventative care measures globally.",
                            author: "Synced Medical News",
                            date: news.date,
                            readTime: news.time
                        })}>
                            <span className="news-cat">{news.cat}</span>
                            <h3>{news.t}</h3>
                            <p>{news.d}</p>
                            <div className="card-footer">
                                <span>{news.date}</span>
                                <span>{news.time}</span>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="center-btn-wrap">
                    <button className="view-all-btn" onClick={() => handleOpenArticle({
                        image: blogHero,
                        category: "Archive",
                        title: "Complete Article Archive",
                        desc: "Welcome to the Synced Article Archive. Here you will soon be able to browse our entire catalog of over 500+ health, wellness, and medical articles chronologically or by specific tags and topics.",
                        author: "Synced Editor",
                        date: "Always Updated",
                        readTime: "Infinite"
                    })}>View All Articles</button>
                </div>
            </section>

            <section className="blog-section reveal-section" ref={addToRefs}>
                <div className="section-header">
                    <h2>Expert <i>Health</i> Tips</h2>
                    <p>Quick wellness advice from leading health professionals</p>
                </div>
                <div className="tips-grid">
                    <div className="tip-card" onClick={() => handleOpenArticle({
                        image: null,
                        category: "Expert Tip",
                        title: "Hydration is Key",
                        desc: "Aim for at least 8 glasses of water daily. Proper hydration supports every bodily function, from digestion to cognitive performance. Even a 2% drop in hydration levels can significantly impair your focus and energy throughout the day.",
                        author: "Dr. Emily Chen, Nutritionist",
                        date: "Recent Tip",
                        readTime: "1 min read"
                    })}>
                        <div className="tip-author">
                            <div className="tip-avatar">EC</div>
                            <div>
                                <strong>Dr. Emily Chen</strong>
                                <span>Nutritionist</span>
                            </div>
                        </div>
                        <h4>Hydration is Key</h4>
                        <p>Aim for at least 8 glasses of water daily. Proper hydration supports every bodily function, from digestion to cognitive performance.</p>
                    </div>
                    <div className="tip-card" onClick={() => handleOpenArticle({
                        image: null,
                        category: "Expert Tip",
                        title: "Move More, Sit Less",
                        desc: "Stand up and move for 5 minutes every hour. This simple habit can significantly reduce cardiovascular disease risk, improve circulation, and prevent the muscular degradation associated with prolonged sitting.",
                        author: "Dr. Michael Torres, Cardiologist",
                        date: "Recent Tip",
                        readTime: "1 min read"
                    })}>
                        <div className="tip-author">
                            <div className="tip-avatar">MT</div>
                            <div>
                                <strong>Dr. Michael Torres</strong>
                                <span>Cardiologist</span>
                            </div>
                        </div>
                        <h4>Move More, Sit Less</h4>
                        <p>Stand up and move for 5 minutes every hour. This simple habit can significantly reduce cardiovascular disease risk.</p>
                    </div>
                    <div className="tip-card" onClick={() => handleOpenArticle({
                        image: null,
                        category: "Expert Tip",
                        title: "Consistent Sleep Schedule",
                        desc: "Go to bed and wake up at the same time daily, even on weekends. This regulates your circadian rhythm for better sleep quality, making it easier to fall asleep and waking you up feeling refreshed rather than groggy.",
                        author: "Dr. Lisa Anderson, Sleep Specialist",
                        date: "Recent Tip",
                        readTime: "1 min read"
                    })}>
                        <div className="tip-author">
                            <div className="tip-avatar">LA</div>
                            <div>
                                <strong>Dr. Lisa Anderson</strong>
                                <span>Sleep Specialist</span>
                            </div>
                        </div>
                        <h4>Consistent Sleep Schedule</h4>
                        <p>Go to bed and wake up at the same time daily, even on weekends. This regulates your circadian rhythm for better sleep quality.</p>
                    </div>
                    <div className="tip-card" onClick={() => handleOpenArticle({
                        image: null,
                        category: "Expert Tip",
                        title: "Practice Gratitude Daily",
                        desc: "Write down three things you're grateful for each day. This simple practice can boost mood and overall mental wellbeing by physically rewiring your brain's neural pathways to focus on positive stimuli rather than threats.",
                        author: "Dr. James Parker, Mental Health Expert",
                        date: "Recent Tip",
                        readTime: "1 min read"
                    })}>
                        <div className="tip-author">
                            <div className="tip-avatar">JP</div>
                            <div>
                                <strong>Dr. James Parker</strong>
                                <span>Mental Health Expert</span>
                            </div>
                        </div>
                        <h4>Practice Gratitude Daily</h4>
                        <p>Write down three things you're grateful for each day. This simple practice can boost mood and overall mental wellbeing.</p>
                    </div>
                </div>
            </section>

            <section className="blog-section subscribe-section reveal-section" ref={addToRefs}>
                <div className="subscribe-box">
                    <h2>Stay Healthy, Stay Informed</h2>
                    <p>Get the latest health news, expert tips, and wellness insights delivered to your inbox weekly</p>
                    <form className="subscribe-form" onSubmit={handleSubscribe}>
                        <input 
                            type="email" 
                            placeholder="Enter your email address" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <button type="submit">Subscribe Now</button>
                    </form>
                    <p className="sub-count">Join 50,000+ readers who trust us for reliable health information</p>
                </div>
                <div className="perks-row">
                    <div className="perk">
                        <div className="perk-icon">📊</div>
                        <h4>Evidence-Based</h4>
                        <p>All content reviewed by medical professionals</p>
                    </div>
                    <div className="perk">
                        <div className="perk-icon">🔒</div>
                        <h4>Privacy First</h4>
                        <p>Your data is safe and never shared</p>
                    </div>
                    <div className="perk">
                        <div className="perk-icon">✨</div>
                        <h4>Weekly Updates</h4>
                        <p>Fresh content every week</p>
                    </div>
                </div>
            </section>

            {/* Modal Overlay */}
            {selectedArticle && (
                <div className="blog-modal-overlay" onClick={() => setSelectedArticle(null)}>
                    <div className="blog-modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="close-blog-modal" onClick={() => setSelectedArticle(null)}>
                            &times;
                        </button>
                        {selectedArticle.image && (
                            <img src={selectedArticle.image} alt={selectedArticle.title} className="blog-modal-img" />
                        )}
                        <span className="blog-modal-cat">{selectedArticle.category}</span>
                        <h3>{selectedArticle.title}</h3>
                        <p>{selectedArticle.desc}</p>
                        
                        <div className="blog-modal-meta">
                            <span><strong>By:</strong> {selectedArticle.author}</span>
                            <span>{selectedArticle.date} • {selectedArticle.readTime}</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Blogs;