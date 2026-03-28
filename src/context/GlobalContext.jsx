import React, { createContext, useState, useContext, useEffect } from 'react';

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
    const [isAr, setIsAr] = useState(false);
    const [isDark, setIsDark] = useState(true);

    const toggleLang = () => setIsAr(!isAr);
    const toggleTheme = () => setIsDark(!isDark);

    useEffect(() => {
        const dir = isAr ? 'rtl' : 'ltr';
        document.documentElement.setAttribute('dir', dir);
        document.documentElement.setAttribute('lang', isAr ? 'ar' : 'en');
        document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    }, [isAr, isDark]);

    return (
        <GlobalContext.Provider value={{ isAr, toggleLang, isDark, toggleTheme }}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobal = () => useContext(GlobalContext);