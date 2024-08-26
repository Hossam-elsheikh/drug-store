import { MapPin, Phone, Mail, Headset, LineChart, Shield, Handshake } from 'lucide-react';
import React from 'react';
import Image from 'next/image';
import logo from "@/public/logo.svg";
import Link from 'next/link';
import FooterIcons from './FooterIcons';

export const footerData = [
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
        mainTitle: "Additional Information",
        subObjects: [
            {
                icon: <Headset />,
                content: "support@company.com"
            },
            {
                icon: <LineChart />,
                content: "jobs@company.com"
            }
        ]
    },
    {
        mainTitle: "Legal",
        subObjects: [
            {
                icon: <Shield />,
                content: 'Privacy Policy'
            },
            {
                icon: <Handshake />,
                content: `Terms & Conditions`
            }
        ]
    }
];

const Footer = ({ direction = 'ltr' }) => {
    const textAlignClassName = direction === 'rtl' ? 'text-right' : 'text-left';

    return (
        <footer className="bg-gray-50 border flex  dark:bg-gray-900 ">
            <div className="mx-auto flex flex-col w-full max-w-screen-xl p-4 py-6 lg:py-8">
                <div className="md:flex md:justify-between">
                    <div className="mb-6 m-2 md:mb-0 relative size-40">
                        <a href="/" className="flex items-center">
                            <Image src={logo} width={140} height={140} className="w-full me-3" alt="Logo" />
                        </a>
                    </div>
                    <div className="grid grid-cols-1 gap-8 sm:gap-6 items-center sm:grid-cols-3">
                        {footerData.map((section, sectionIndex) => (
                            <div key={sectionIndex}>
                                <h2 className="mb-3 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                                    {section.mainTitle}
                                </h2>
                                <ul className="text-gray-500 dark:text-gray-400 font-medium">
                                    {section.subObjects.map((item, itemIndex) => (
                                        <Link href='/' key={itemIndex}>
                                            <li className="hover:text-black flex items-center p-3 rounded-lg hover:shadow-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200">
                                                <div className={`mr-3 ${direction === 'rtl' ? 'ml-4' : ''}`}>
                                                    {item.icon}
                                                </div>
                                                <div className="flex flex-col ">
                                                    <p className="mt-1">{item.content}</p>
                                                </div>
                                            </li>
                                        </Link>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
                <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                <FooterIcons />
            </div>
        </footer>
    );
};

export default Footer;
