'use client';
import React, { useEffect } from 'react';
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

    }, [auth, pathName]);

    return (
        <>

            {auth?.userId ? <div className='flex items-center gap-5'>

                {auth?.userId && !(pathName === `/${locale}/sign-in` || pathName === `/${locale}/sign-up`) && (
                    <UserPopUp />
                )}

                {pathName === `/${locale}/checkout` ? null : <DrawerWrapper showSec='cart' />}

                <DrawerWrapper showSec='Favorites' />
                <LanguageSwitcher classes='hidden md:block' />

            </div> : <>

                <DrawerWrapper showSec='signInForm' />
            </>
            }

        </>
    );
};

export default Icons;
