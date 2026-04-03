import React, { useEffect, useRef } from 'react';
import './Blogs.css';

import blogHero from '../imgs/blog.png';
import story1 from '../imgs/div.png';
import story2 from '../imgs/div-1.png';
import story3 from '../imgs/div-2.png';
import topic1 from '../imgs/clickaway.png';
import topic2 from '../imgs/Container.png';
import topic3 from '../imgs/Container-1.png';

const Blogs = () => {
    const sectionRefs = useRef([]);

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

    return (
        <div className="blog-page-container">
            <section className="blog-hero reveal-section" ref={addToRefs} style={{ backgroundImage: `url(${blogHero})` }}>
                <div className="blog-hero-overlay">
                    <div className="blog-hero-content">
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
                    <div className="story-card">
                        <div className="img-zoom-wrap"><img src={story1} alt="Fitness" /></div>
                        <div className="story-card-content">
                            <h3>Fitness Made Simple: Workouts for Every Level</h3>
                            <p>From beginner to advanced, find the perfect exercise routine to match your fitness goals.</p>
                            <div className="card-footer">
                                <span>Feb 23, 2026</span>
                                <span>7 min read</span>
                            </div>
                        </div>
                    </div>
                    <div className="story-card">
                        <div className="img-zoom-wrap"><img src={story2} alt="Nutrition" /></div>
                        <div className="story-card-content">
                            <h3>Nutrition Essentials: Building a Balanced Plate</h3>
                            <p>Expert nutritionists share their top tips for creating meals that nourish your body and mind.</p>
                            <div className="card-footer">
                                <span>Feb 24, 2026</span>
                                <span>6 min read</span>
                            </div>
                        </div>
                    </div>
                    <div className="story-card">
                        <div className="img-zoom-wrap"><img src={story3} alt="Mindfulness" /></div>
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
                    <div className="topic-card" style={{ backgroundImage: `url(${topic1})` }}>
                        <div className="topic-overlay">
                            <h3>Mental Wellness</h3>
                            <p>Strategies for emotional balance and psychological health</p>
                            <button className="topic-btn">42 articles</button>
                        </div>
                    </div>
                    <div className="topic-card" style={{ backgroundImage: `url(${topic2})` }}>
                        <div className="topic-overlay">
                            <h3>Heart Health</h3>
                            <p>Cardiovascular wellness and prevention</p>
                            <button className="topic-btn">38 articles</button>
                        </div>
                    </div>
                    <div className="topic-card" style={{ backgroundImage: `url(${topic3})` }}>
                        <div className="topic-overlay">
                            <h3>Medical Insights</h3>
                            <p>Latest research and medical breakthroughs</p>
                            <button className="topic-btn">56 articles</button>
                        </div>
                    </div>
                    <div className="topic-card" style={{ backgroundImage: `url(${story3})` }}>
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
                        <div className="news-card" key={index}>
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
                    <button className="view-all-btn">View All Articles</button>
                </div>
            </section>

            <section className="blog-section reveal-section" ref={addToRefs}>
                <div className="section-header">
                    <h2>Expert <i>Health</i> Tips</h2>
                    <p>Quick wellness advice from leading health professionals</p>
                </div>
                <div className="tips-grid">
                    <div className="tip-card">
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
                    <div className="tip-card">
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
                    <div className="tip-card">
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
                    <div className="tip-card">
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
                    <div className="subscribe-form">
                        <input type="email" placeholder="Enter your email address" />
                        <button>Subscribe Now</button>
                    </div>
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
        </div>
    );
};

export default Blogs;