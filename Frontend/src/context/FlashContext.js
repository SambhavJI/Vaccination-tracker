import React, { createContext, useState, useContext, useCallback } from 'react';

const FlashContext = createContext();

export const FlashProvider = ({ children }) => {
    const [flash, setFlash] = useState(null);

    const showFlash = useCallback((message, type = 'info', duration = 3000) => {
        setFlash({ message, type });
        setTimeout(() => {
            setFlash(null);
        }, duration);
    }, []);

    return (
        <FlashContext.Provider value={{ showFlash, flash }}>
            {children}
        </FlashContext.Provider>
    );
};

export const useFlash = () => {
    const context = useContext(FlashContext);
    if (!context) {
        throw new Error('useFlash must be used within a FlashProvider');
    }
    return context;
};
