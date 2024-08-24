'use client'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import ASidebar from '@/components/UserProfile/Aside'
import { useLocale } from '@/context/LocaleProvider'
import useAuth from '@/hooks/useAuth'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useMemo } from 'react'

export default function Menu() {
    const { locale, dir } = useLocale()
    const { auth }: any = useAuth()
    const pathName: string = usePathname()

    useEffect(() => { }, [auth, pathName])

    const c = useTranslations('categories')
    const links = useMemo(
        () => [
            { href: `/${locale}`, label: 'home' },
            { href: `/${locale}/category/allProducts`, label: 'allProducts' },
            {
                href: `/${locale}/category/ourCollections`,
                label: 'ourCollections',
            },
            { href: `/${locale}/category/shopByBrand`, label: 'shopByBrand' },
            { href: `/${locale}/category/Offers`, label: 'Offers' },
            { href: `/${locale}/aboutUs`, label: 'aboutUs' },
            { href: `/${locale}/contactUs`, label: 'contactUs' },
        ],
        [locale]
    )

    return (
        <div className="p-2">
            {auth?.userId &&
                <ASidebar mode="drawer" />}

            <div dir={dir}>
                <ul className="py-2 space-y-1">
                    {links.map(({ href, label }, index) => (
                        <li key={index}>
                            <Link
                                className="block px-4 py-2  font-medium text-primaryColor hover:text-secColor hover:bg-gray-100 rounded-md hover:font-bold duration-300 transition-all"
                                href={href}
                            >
                                {c(label)}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
            <div className=" top-20 relative items-center flex justify-center">
                <LanguageSwitcher classes="block" />
            </div>
        </div>
    )
}
