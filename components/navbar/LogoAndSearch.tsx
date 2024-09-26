'use client'
import React, { useContext } from 'react'
import CategoriesDrawer from '../Drawers/menu/CategoriesDrawer'
import Link from 'next/link'
import SearchMed from './Search'
import { useLocale } from '@/context/LocaleProvider'
import Image from 'next/image'
import WebsiteProfileCtx from '@/context/WebsiteProfileContext'

export default function LogoAndSearch() {

    const { logo } = useContext(WebsiteProfileCtx)
    const { locale } = useLocale()
    return (
        <div className="flex items-center gap-6">
            <CategoriesDrawer classes="block md:hidden" />
            <Link href={`/${locale}`}>
                <Image
                    width="140"
                    height="140"
                    alt="logo"
                    src={logo}
                />
            </Link>
            <div className="hidden sm:block">
                <SearchMed />
            </div>
        </div>
    )
}
