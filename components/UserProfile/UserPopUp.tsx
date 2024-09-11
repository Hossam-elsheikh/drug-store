'use client';

import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { User2Icon, CirclePower, Heart, PackageCheck, UserCircleIcon, ChevronDownIcon } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useLocale } from "@/context/LocaleProvider";
import useSignOut from "@/hooks/useSignOut";
import { useRouter } from 'next/navigation';
import classNames from 'classnames';
import { useMemo } from 'react';
import { useUser } from '@/context/UserProvider';

export default function UserPopUp() {
    const { userInfo, isLoading } = useUser();
    const t = useTranslations("AsideMenu");
    const { locale } = useLocale();
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
        <Popover className="relative">
            {({ open }) => (
                <>
                    <PopoverButton
                        className={classNames(
                            "hidden md:flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-full shadow-sm hover:bg-gray-50 focus:outline-none duration-200",

                        )}
                    >
                        <User2Icon className="w-5 h-5" />
                        <span className="hidden sm:inline">{userInfo?.name}</span>
                        <ChevronDownIcon className="w-4 h-4 ml-1" aria-hidden="true" />
                    </PopoverButton>
                    <AnimatePresence>
                        {open && (
                            <PopoverPanel
                                as={motion.div}
                                static
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="absolute right-0 z-10 mt-2 rounded-lg w-40 bg-white shadow-lg focus:outline-none"
                            >
                                <div className="py-1">
                                    {links.map(({ href, icon: Icon, key }) => (
                                        <div key={href} className="px-1 space-x-2">
                                            {key === 'logOut' ? (
                                                <button
                                                    onClick={signOut}
                                                    className='w-full text-left px-4 py-2 text-sm text-red-700 hover:bg-red-100 hover:text-red-900 rounded-lg flex items-center gap-2'
                                                >
                                                    <Icon size={20} />
                                                    <span>{t(key)}</span>
                                                </button>
                                            ) : (
                                                <Link
                                                    href={href}
                                                    className={' px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg hover:text-gray-900 flex items-center gap-2'}
                                                >
                                                    <Icon size={20} />
                                                    <span>{t(key)}</span>
                                                </Link>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </PopoverPanel>
                        )}
                    </AnimatePresence>
                </>
            )}
        </Popover>
    );
}