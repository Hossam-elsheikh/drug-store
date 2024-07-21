'use client';
import React,{useEffect} from 'react';
import LanguageSwitcher from '../LanguageSwitcher';
import DrawerWrapper from '../Drawers/DrawerWrapper';
import { useLocale } from "@/context/LocaleProvider";
import useAuth from "@/hooks/useAuth";
import Link from "next/link";
import UserPopUp from '../UserProfile/UserPopUp';
import { usePathname } from "next/navigation";

const Icons = () => {
    const { locale } = useLocale();
    const { auth }: any = useAuth();
    const pathName: string = usePathname();

    useEffect(() => {
        
    }, [auth]);


    return (
        <>
            <div className="flex items-center gap-5 font-semibold text-primaryColor">
                <Link
                    className="hover:text-secColor transition hidden md:block text-nowrap"
                    href={`/${locale}/aboutUs`}
                >
                    About us
                </Link>
            </div>
            <div className='flex items-center gap-2'>
                <LanguageSwitcher classes='hidden md:block' />

                {auth?.userId && !(pathName === `/${locale}/sign-in` || pathName === `/${locale}/sign-up`) && (
                    <UserPopUp />
                )}

                {!auth?.userId && !(pathName === `/${locale}/sign-in` || pathName === `/${locale}/sign-up`) && (
                    <DrawerWrapper showSec='signInForm' />
                )}

                <DrawerWrapper showSec='Favorites' />
                <DrawerWrapper showSec='cart' />
            </div>
        </>
    );
};

export default Icons;
