import React, { createContext, useState, useContext, useEffect } from 'react';

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
    const [isAr, setIsAr] = useState(false);
    const [isDark, setIsDark] = useState(true);

    const toggleLang = () => setIsAr(!isAr);
    const toggleTheme = () => setIsDark(!isDark);

    useEffect(() => {
        document.documentElement.dir = isAr ? 'rtl' : 'ltr';
        document.documentElement.lang = isAr ? 'ar' : 'en';
    }, [isAr]);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    }, [isDark]);

    return (
        <GlobalContext.Provider value={{ isAr, toggleLang, isDark, toggleTheme }}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobal = () => useContext(GlobalContext);