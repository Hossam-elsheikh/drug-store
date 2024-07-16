'use client'
import React from 'react'
import LanguageSwitcher from '../LanguageSwitcher'
import DrawerWrapper from '../Drawers/DrawerWrapper'
import { useLocale } from "@/context/LocaleProvider";
import Link from "next/link";

const Icons = () => {
    const { locale } = useLocale()
    return (<>
        <div className="flex items-center gap-5 font-semibold text-primaryColor ">
            <Link
                className="hover:text-secColor transition hidden md:block text-nowrap"
                href={`/${locale}/aboutUs`}
            >
                About us
            </Link>

        </div>
        <div className='flex items-center gap-2'>
            <LanguageSwitcher classes='hidden md:block' />
            <DrawerWrapper showSec='signInForm' />
            <DrawerWrapper showSec='Favorites' />
            <DrawerWrapper showSec='cart' />

        </div>
    </>
    )
}

export default Icons