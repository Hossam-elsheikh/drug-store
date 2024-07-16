'use client'
import { createContext, useContext, useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

interface LocaleContextProps {
    locale: string;
    dir: string;
    switchLanguage: (locale: string) => void;
}

const LocaleContext = createContext<LocaleContextProps | undefined>(undefined);

export const LocaleProvider: React.FC<{ initialLocale: string; children: React.ReactNode }> = ({ initialLocale, children }) => {
    const [locale, setLocale] = useState(initialLocale);
    const [dir, setDir] = useState('ltr'); 
    const router = useRouter();
    const pathName = usePathname();

    const switchLanguage = (newLocale: string) => {
        const newPath = pathName.replace(`/${locale}`, `/${newLocale}`);
        router.replace(newPath);
        setDocumentDir(newLocale);
        setLocale(newLocale);
    };

    const setDocumentDir = (locale: string) => {
        const RTL = 'ar';
        const direction = RTL.includes(locale) ? 'rtl' : 'ltr';
        document.documentElement.setAttribute('dir', direction);
        setDir(direction); 
    };

    useEffect(() => {
        setDocumentDir(locale);
    }, [locale]);

    return (
        <LocaleContext.Provider value={{ locale, dir,switchLanguage }}>
            {children}
        </LocaleContext.Provider>
    );
};

export const useLocale = () => {
    const context = useContext(LocaleContext);
    if (!context) {
        throw new Error('useLocale must be used within a LocaleProvider');
    }
    return context;
};
