'use client'
import { MapPin, Phone, Mail, Headset, LineChart, Shield, Handshake, Info } from 'lucide-react';
import React, { useContext } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import FooterIcons from './FooterIcons';
import { useLocale } from '@/context/LocaleProvider';
import WebsiteProfileCtx from '@/context/WebsiteProfileContext';

type SubObject = {
    icon: React.ReactNode;
    content: string;
    path?: string;
};

type Section = {
    mainTitle: string;
    subObjects: SubObject[];
};

export const footerData: Section[] = [
    {
        mainTitle: "Keep Reaching Us",
        subObjects: [
            {
                icon: <MapPin />,
                content: "1234 Main St, Anytown, USA"
            },
            {
                icon: <Phone />,
                content: "+1 (555) 123-4567"
            },
            {
                icon: <Mail />,
                content: "contact@company.com"
            }
        ]
    },
    {
        mainTitle: "Legal",
        subObjects: [
            {
                icon: <Info />,
                content: 'About Us',
                path: 'aboutUs' // Path for About Us
            },
            {
                icon: <Handshake />,
                content: `Terms & Conditions`,
                path: '/terms' // Path for Terms & Conditions
            }
        ]
    }
];

const Footer = () => {
    const { locale } = useLocale();
    const { logo } = useContext(WebsiteProfileCtx)

    return (
        <footer className="bg-gray-50 border flex dark:bg-gray-900">
            <div className="mx-auto flex flex-col w-full max-w-screen-xl p-4 py-4 lg:py-6">
                <div className="md:flex md:justify-between">
                    <div className="relative w-72 p-4 md:mb-0 md:w-40 self-center">
                        <a href="/" className="flex items-center self-center">
                            <Image
                                src={logo}
                                width={120}
                                height={120}
                                className="w-full h-auto object-contain"
                                alt="Logo"
                            />
                        </a>
                    </div>

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                        {footerData.map((section, sectionIndex) => (
                            <div key={sectionIndex}>
                                <h2 className="mb-2 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                                    {section.mainTitle}
                                </h2>
                                <ul className="text-gray-500 dark:text-gray-400 font-medium">
                                    {section.subObjects.map((item, itemIndex) => (
                                        <li key={itemIndex} className="hover:text-black flex gap-2 items-center p-2 rounded-lg hover:shadow-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200">
                                            {item.path ? (
                                                <Link className="gap-3 flex" href={`/${locale}/${item.path}`}>
                                            <span >
                                                {item.icon}
                                            </span>
                                                 {item.content}
                                                </Link>
                                            ) : (
                                                    <div className="flex gap-3"> <span >
                                                        {item.icon}
                                                    </span>{item.content}</div>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                <FooterIcons />
            </div>
        </footer>
    );
};

export default Footer;
