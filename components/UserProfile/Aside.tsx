'use client'
import { CirclePower, Cog, CreditCard, Heart, Map, PackageCheck, Undo2, UserCircleIcon } from 'lucide-react';
import React from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';

export default function ASidebar({ path, dir = 'ltr' }: { path: string, dir?: string }) {
    const t = useTranslations("AsideMenu");

    const links = [
        { href: `/en/userProfile`, icon: UserCircleIcon, key: 'profile' },
        { href: `/en/wishlist`, icon: Heart, key: 'wishList' },
        { href: `/en/payments`, icon: CreditCard, key: 'payments' },
        { href: `/en/addresses`, icon: Map, key: 'addresses' },
        { href: `/en/orders`, icon: PackageCheck, key: 'orders' },
        { href: `/en/returns`, icon: Undo2, key: 'returns' },
        { href: `/en/settings`, icon: Cog, key: 'settings' },
        { href: `/en/logout`, icon: CirclePower, key: 'logOut' },
    ];

    return (
        <div className={`rounded-lg h-fit w-full max-w-[15rem] p-4 shadow-sm bg-gray-50 sticky top-[120px] overflow-y-auto`}>
            <ul className="space-y-2">
                {links.map(({ href, icon: Icon, key }) => (
                    <li key={href}>
                        <Link href={href} className={`group gap-3 flex items-center p-3 rounded-lg transition-all active:scale-95 duration-300
                            ${path === href ? 'bg-gray-200' : 'hover:bg-gray-200 dark:hover:bg-gray-700'}
                        `}>
                            <Icon className="h-5 w-5" />
                            <span className={`flex-grow ${path === href ? 'text-black' : 'group-hover:text-black'}`}>
                                {t(key)}
                            </span>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}