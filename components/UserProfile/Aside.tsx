'use client';

import { CirclePower, Heart, PackageCheck, UserCircleIcon } from 'lucide-react';
import React, { useMemo } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useLocale } from "@/context/LocaleProvider";
import useSignOut from "@/hooks/useSignOut";
import { useRouter } from 'next/navigation';
import classNames from 'classnames';
import { SheetClose } from '@/components/ui/sheet'

export default function ASidebar({ path, mode }: { path?: string, mode?: string }) {
    const t = useTranslations("AsideMenu");
    const { locale, dir } = useLocale();
    const signOutHook = useSignOut();
    const router = useRouter();

    const links = useMemo(() => [
        { href: `/${locale}/userProfile`, icon: UserCircleIcon, key: 'profile' },
        { href: `/${locale}/favorites`, icon: Heart, key: 'favorites' },
        { href: `/${locale}/orders`, icon: PackageCheck, key: 'orders' },
        { href: `/${locale}/logout`, icon: CirclePower, key: 'logOut' },
    ], [locale]);

    const signOut = async () => {
        try {
            await signOutHook();
            router.push(`/${locale}/sign-in`);
        } catch (error) {
            console.error("Error during sign out:", error);
        }
    };

    return (
        <div dir={dir}
            className={classNames(
                mode === 'userProfile' && 'border border-gray-200 rounded-lg shadow-md p-4',
                mode === 'drawer' && 'rounded-lg ',
            )}
        >
            <ul className={classNames(
                mode === 'userProfile' && "flex flex-row p-1 justify-around md:flex-col space-x-4 md:space-x-0 md:space-y-2 overflow-x-auto md:overflow-x-visible",
                mode === 'drawer' && 'flex flex-col space-y-4'
            )}>                    {links.map(({ href, icon: Icon, key }) => (
                <li key={href} className="flex-shrink-0  ">
                    {key === 'logOut' ? (
                        <button
                            onClick={signOut}
                            className='w-full flex flex-row items-center gap-2 md:justify-start p-2 md:p-3 rounded-lg transition-all duration-300 text-red-600 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50'
                        >
                            <Icon size={24} className=" mb-1 md:mb-0 md:mr-3" />
                            <span className="text-xs md:text-sm font-medium">{t(key)}</span>
                        </button>
                    ) : (
                        mode === 'drawer' ? (
                            <SheetClose asChild>
                                <Link
                                    href={href}
                                    className={classNames(
                                        'flex flex-row gap-2 items-center md:justify-start p-2 md:p-3 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50',
                                        {
                                            'bg-indigo-50 text-indigo-700': path === href,
                                            'text-gray-700 hover:bg-gray-50': path !== href
                                        }
                                    )}
                                >
                                    <Icon
                                        size={24}
                                        className={classNames(" mb-1 md:mb-0 md:mr-3", {
                                            'text-indigo-500': path === href,
                                            'text-gray-400': path !== href
                                        })}
                                    />
                                    <span
                                        className={classNames(
                                            "font-medium",
                                            mode === 'drawer' ? 'text-sm' : 'text-xs md:text-sm'
                                        )}
                                    >
                                        {t(key)}
                                    </span>
                                </Link>
                            </SheetClose>
                        ) : (
                            <Link
                                href={href}
                                className={classNames(
                                    'flex flex-row gap-2 items-center md:justify-start p-2 md:p-3 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50',
                                    {
                                        'bg-indigo-50 text-indigo-700': path === href,
                                        'text-gray-700 hover:bg-gray-50': path !== href
                                    }
                                )}
                            >
                                <Icon
                                    size={24}
                                    className={classNames(" mb-1 md:mb-0 md:mr-3", {
                                        'text-indigo-500': path === href,
                                        'text-gray-400': path !== href
                                    })}
                                />
                                <span
                                    className={classNames(
                                        "font-medium",
                                        mode === 'drawer' ? 'text-sm' : 'text-xs md:text-sm'
                                    )}
                                >
                                    {t(key)}
                                </span>
                            </Link>

                        ))}
                </li>
            ))}
            </ul>
        </div>
    );
}