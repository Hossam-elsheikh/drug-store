'use client'
import { CirclePower, Cog, CreditCard, Heart, Map, PackageCheck, Undo2, UserCircleIcon } from 'lucide-react';
import React from 'react';
import Link from 'next/link';

export default function ASidebar({ path, dir = 'ltr' }: { path: string, dir?: string }) {


    const links = [
        { href: '/en/userProfile', icon: UserCircleIcon, label: 'Profile' },
        { href: '/en/wishlist', icon: Heart, label: 'Wish List' },
        { href: '/en/payments', icon: CreditCard, label: 'Payments' },
        { href: '/en/addresses', icon: Map, label: 'Addresses' },
        { href: '/en/orders', icon: PackageCheck, label: 'Orders' },
        { href: '/en/returns', icon: Undo2, label: 'Returns' },
        { href: '/en/settings', icon: Cog, label: 'Settings' },
        { href: '/en/logout', icon: CirclePower, label: 'Log Out' },
    ];

    return (
        <div className={`rounded-lg h-fit w-full max-w-[15rem] p-4 shadow-md bg-gray-50  sticky top-[120px]  overflow-y-auto `}>
            <div  className="mb-2 p-4">
                <h1></h1>
            </div>
            <ul className="space-y-2">
                {links.map(({ href, icon: Icon, label }) => (
                    <li key={href}>
                        <Link href={href} className={`group gap-3 flex items-center p-3 rounded-lg transition-all active:scale-95 duration-300 
                            ${path === href ? 'bg-gray-200' : 'hover:bg-gray-200 dark:hover:bg-gray-700 '}
                        `}>
                            <Icon className="h-5 w-5 " />
                            <span className={`flex-grow ${path === href ? 'text-black' : 'group-hover:text-black'}  `}>
                                {label}
                            </span>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

