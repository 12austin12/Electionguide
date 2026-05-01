import React, { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  const [language, setLanguage] = useState('en');
  const [isFirstTimeVoter, setIsFirstTimeVoter] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  const toggleLanguage = () => setLanguage((prev) => (prev === 'en' ? 'es' : 'en'));

  const saveApiKey = (key) => {
    setGeminiApiKey(key);
    localStorage.setItem('geminiApiKey', key);
  };

  const clearApiKey = () => {
    setGeminiApiKey('');
    localStorage.removeItem('geminiApiKey');
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        language,
        toggleLanguage,
        isFirstTimeVoter,
        setIsFirstTimeVoter,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
