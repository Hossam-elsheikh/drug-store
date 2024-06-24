'use client'
import { CirclePower, Cog, CreditCard, Heart, Map, PackageCheck, Undo2, UserCircleIcon } from 'lucide-react';
import React from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function ASidebar({ path, dir = 'ltr' }: { path: string, dir?: string }) {
    const t = useTranslations("AsideMenu");

    const links = [
        { href: `/en/userProfile`, icon: UserCircleIcon, key: 'profile' },
        { href: `/en/wishlist`, icon: Heart, key: 'wishList' },
        // { href: `/en/payments`, icon: CreditCard, key: 'payments' },
        { href: `/en/addresses`, icon: Map, key: 'addresses' },
        { href: `/en/orders`, icon: PackageCheck, key: 'orders' },
        { href: `/en/returns`, icon: Undo2, key: 'returns' },
        { href: `/en/settings`, icon: Cog, key: 'settings' },
        { href: `/en/logout`, icon: CirclePower, key: 'logOut' },
    ];

    return (
        <div className="md:sticky md:top-[120px] z-10 bg-gray-50 mb-4 md:mb-0">
            <div className="rounded-lg p-4 shadow-sm overflow-x-auto overflow-hidden md:overflow-x-visible">
                <ul className="flex flex-row md:flex-col space-x-2 md:space-x-0 md:space-y-2 min-w-max md:min-w-0">
                    {links.map(({ href, icon: Icon, key }) => (
                        <li key={href} className="flex-shrink-0">
                            <Link href={href} className={`group flex flex-col md:flex-row items-center p-2 md:p-3 rounded-lg transition-all active:scale-95 duration-300 md:gap-3 gap-1
                                ${path === href ? 'bg-gray-200' : 'hover:bg-gray-200 dark:hover:bg-gray-700'}
                            `}>
                                <Icon className="h-5 w-5 mb-1 md:mb-0 md:mr-3" />
                                <span className={`text-xs md:text-base ${path === href ? 'text-black' : 'group-hover:text-black'}`}>
                                    {t(key)}
                                </span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}