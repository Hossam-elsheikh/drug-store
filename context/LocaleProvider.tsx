'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';

interface LocaleContextProps {
    locale: 'en' | 'ar';
    dir: string;
    switchLanguage: (locale: 'en' | 'ar') => void;
}

// Set the context type with an initial value of undefined for its properties
const LocaleContext = createContext<LocaleContextProps | undefined>(undefined);

interface LocaleProviderProps {
    initialLocale: 'en' | 'ar';
    children: ReactNode;
}

export const LocaleProvider: React.FC<LocaleProviderProps> = ({ initialLocale, children }) => {
    const [locale, setLocale] = useState<'en' | 'ar'>(initialLocale);
    const [dir, setDir] = useState<'ltr' | 'rtl'>('ltr');

    const router = useRouter();
    const pathName = usePathname();

    const switchLanguage = (newLocale: 'en' | 'ar') => {
        const newPath = pathName.replace(`/${locale}`, `/${newLocale}`);
        router.replace(newPath);
        setDocumentDir(newLocale);
        setLocale(newLocale);
    };

    const setDocumentDir = (locale: 'en' | 'ar') => {
        const RTL = 'ar';
        const direction = locale === RTL ? 'rtl' : 'ltr';
        document.documentElement.setAttribute('dir', direction);
        setDir(direction);
    };

    useEffect(() => {
        setDocumentDir(locale);
    }, [locale]);

    return (
        <LocaleContext.Provider value={{ locale, dir, switchLanguage }}>
            {children}
        </LocaleContext.Provider>
    );
};

export const useLocale = (): LocaleContextProps => {
    const context = useContext(LocaleContext);
    if (!context) {
        throw new Error('useLocale must be used within a LocaleProvider');
    }
    return context;
};
