'use client'
import {
    MapPin,
    Phone,
    Mail,
    Headset,
    LineChart,
    Shield,
    Handshake,
    Info,
    MessageCircleMore,
} from 'lucide-react'
import React, { useContext, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import FooterIcons from './FooterIcons'
import { useLocale } from '@/context/LocaleProvider'
import WebsiteProfileCtx from '@/context/WebsiteProfileContext'

type SubObject = {
    icon: React.ReactNode
    content: string
    path?: string
}

type Section = {
    mainTitle: string
    subObjects: SubObject[]
}

export const footerData: Section[] = [
    {
        mainTitle: 'Keep Reaching Us',
        subObjects: [
            {
                icon: <MapPin />,
                content: '1234 Main St, Anytown, USA',
            },
            {
                icon: <Phone />,
                content: '+1 (555) 123-4567',
            },
            {
                icon: <Mail />,
                content: 'contact@company.com',
            },
        ],
    },
    {
        mainTitle: 'Legal',
        subObjects: [
            {
                icon: <Info />,
                content: 'About Us',
                path: 'aboutUs', // Path for About Us
            },
            {
                icon: <Handshake />,
                content: `Terms & Conditions`,
                path: '/terms', // Path for Terms & Conditions
            },
        ],
    },
]

const Footer = () => {
    const {dir, locale } = useLocale()
    const { logo, businessEmail, businessWhatsapp,websiteName, businessNumber } =
        useContext(WebsiteProfileCtx)

        useEffect(()=>{

        },[businessNumber])
    return (
        <footer dir={dir} className="bg-gray-50 border flex dark:bg-gray-900">
            <div className="mx-auto grid grid-cols-1 gap-4 md:grid-cols-5 w-full max-w-screen-xl p-4 py-4 lg:py-6">
                <div className="flex flex-col  gap-3">
                    <div className="relative w-40  md:mb-0 md:w-50 ">
                        <a href="/" className="flex items-center self-center">
                            <Image
                                src={logo}
                                width={150}
                                height={150}
                                className="w-full h-auto object-contain"
                                alt="Logo"
                            />
                        </a>
                    </div>
                    <FooterIcons />
                </div>
                <div className="col-span-2 flex flex-col gap-3">
                    <h1 className='font-bold '>{locale === 'en' ? 'Reach us' : 'تواصل معنا'}</h1>
                    <div className='flex hover:text-secColor items-center gap-2'>
                        <Phone />
                        <a className='font-medium ' href={`tel:${businessNumber}`}>{businessNumber}</a>
                    </div>
                    <div className='flex hover:text-secColor items-center gap-2'>
                        <Mail />
                        <a className='font-medium ' href={`mailto:${businessEmail}`}>{businessEmail}</a>
                    </div>
                    <div className='flex hover:text-secColor items-center gap-2'>
                    <MessageCircleMore />
                        <a className='font-medium ' href={`mailto:${businessWhatsapp}`}>{businessWhatsapp}</a>
                    </div>
                </div>
                <div className="col-span-2 flex flex-col gap-3">
                    <h1 className='font-bold '>{websiteName && websiteName[locale]}</h1>
                    <div className='flex hover:text-secColor items-center gap-2'>
                        <Info />
                        <a className='font-medium ' href={`/${locale}/aboutUs`}>
                            {locale === 'en' ? 'About us' : 'المزيد عنا'}
                        </a>
                    </div>
                    <div className='flex hover:text-secColor items-center gap-2'>
                        <Handshake />
                        <a className='font-medium 'href={`/${locale}/terms`}>
                        {locale === 'en' ? 'Terms and Conditions' : 'السياسات والشروط'}

                        </a>
                    </div>
                  
                </div>
            </div>
        </footer>
    )
}

export default Footer
