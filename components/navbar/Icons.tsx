'use client';
import React, { useEffect } from 'react';
import LanguageSwitcher from '../LanguageSwitcher';
import DrawerWrapper from '../Drawers/DrawerWrapper';
import { useLocale } from "@/context/LocaleProvider";
import useAuth from "@/hooks/useAuth";
import Link from "next/link";
import UserPopUp from '../UserProfile/UserPopUp';
import { usePathname } from "next/navigation";
import { ShoppingCart } from 'lucide-react';
import { useTranslations } from 'next-intl';

const Icons = () => {
    
    const { locale } = useLocale();
    const { auth }: any = useAuth();
    const pathName: string = usePathname();
    const t = useTranslations("DrawerWrapper");

    useEffect(() => {

    }, [auth, pathName]);

    return (
        <>
            <div className="flex items-center gap-5 font-semibold text-primaryColor">
                {/* <Link
                    className="hover:text-secColor transition hidden md:block text-nowrap"
                    href={`/${locale}/aboutUs`}
                >
                    About us
                </Link> */}
            </div>
            <div className='flex items-center gap-5'>

                {auth?.userId && !(pathName === `/${locale}/sign-in` || pathName === `/${locale}/sign-up`) && (
                    <UserPopUp />
                )}

                {!auth?.userId && !(pathName === `/${locale}/sign-in` || pathName === `/${locale}/sign-up`) && (
                    <DrawerWrapper showSec='signInForm' />
                )}


                {pathName === `/${locale}/checkout` ?
                    <Link href={`/${locale}/cart`} className="flex items-center bg-secColor p-2 px-4 hover:bg-primaryColor hover:scale-105 cursor-pointer transition-all duration-200 rounded-3xl text-white gap-2 ">
                        <p className="font-semibold">{t("cart")}</p>
                        <ShoppingCart />
                    </Link>
                    : <DrawerWrapper showSec='cart' />}
                <DrawerWrapper showSec='Favorites' />
                <LanguageSwitcher classes='hidden md:block' />

            </div>
        </>
    );
};

export default Icons;
