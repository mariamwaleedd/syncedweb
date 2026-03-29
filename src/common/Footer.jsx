import React, { useEffect, useState } from 'react';
import './Footer.css';
import { supabase } from '../Supabase';
import { useGlobal } from '../context/GlobalContext';

const Footer = () => {
    const { isAr, isDark } = useGlobal();
    const [brandData, setBrandData] = useState(null);
    const [productLinks, setProductLinks] = useState([]);
    const [companyLinks, setCompanyLinks] = useState([]);
    const [copyrightData, setCopyrightData] = useState(null);

    useEffect(() => {
        const fetchFooterData = async () => {
            const { data, error } = await supabase
                .from('footer')
                .select('*')
                .order('order_index', { ascending: true });
            
            if (data) {
                setBrandData(data.find(i => i.type === 'brand'));
                setProductLinks(data.filter(i => i.category === 'Product'));
                setCompanyLinks(data.filter(i => i.category === 'Company'));
                setCopyrightData(data.find(i => i.type === 'copyright'));
            }
        };
        fetchFooterData();
    }, []);

    if (!brandData) return null;

    return (
        <footer className="footer">
            <div className="footer-overlay">
                <div className="footer-top">
                    <div className="footer-brand">
                        <img 
                            src={brandData.logo_url} 
                            alt="Logo" 
                            className="footer-top-logo" 
                            style={{ filter: isDark ? 'none' : 'invert(1)' }}
                        />
                        <p>{isAr ? brandData.desc_ar : brandData.desc_en}</p>
                    </div>

                    <div className="footer-links-container">
                        <div className="footer-col">
                            <h4>{isAr ? "المنتجات" : "PRODUCT"}</h4>
                            <ul>
                                {productLinks.map((link, idx) => (
                                    <li key={idx}>{isAr ? link.title_ar : link.title_en}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="footer-col">
                            <h4>{isAr ? "الشركة" : "COMPANY"}</h4>
                            <ul>
                                {companyLinks.map((link, idx) => (
                                    <li key={idx}>{isAr ? link.title_ar : link.title_en}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <div className="footer-branding-full">
                        <img 
                            src={brandData.full_logo_url} 
                            alt="Synced Full Logo" 
                            style={{ filter: isDark ? 'none' : 'invert(1)' }}
                        />
                    </div>
                    <p className="footer-copyright">
                        {isAr ? copyrightData?.desc_ar : copyrightData?.desc_en}
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;