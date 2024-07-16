'use client'
import React from 'react';
import CategoriesDrawer from '../Drawers/menu/CategoriesDrawer';
import Link from 'next/link';
import SearchMed from "./Search";
import { useLocale } from "@/context/LocaleProvider";
import Image from 'next/image';
import logo from "@/public/logo.svg";

export default function LogoAndSearch() {
    const { locale } = useLocale();
    return (
        <div className="flex items-center gap-5">
            <CategoriesDrawer classes="block md:hidden" />
            <Link href={`/${locale}`}>
                <Image width="140" height="140" alt="logo" src={logo} />
            </Link>
            <div className="hidden sm:block">
                <SearchMed />
            </div>
        </div>
    );
}
