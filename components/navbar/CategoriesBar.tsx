'use client'
import React from 'react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import CategoriesDrawer from '../Drawers/menu/CategoriesDrawer'
import { useLocale } from '@/context/LocaleProvider'
import { useQuery } from '@tanstack/react-query'
import { getCategories } from '@/axios/instance'
import { Category } from '@/types'

const CategoriesBar = () => {
    const t = useTranslations('categories')
    const { locale } = useLocale()
    const categoryQuery = useQuery({
        queryKey: ['cats'],
        queryFn: getCategories,
    })
    return (
        <nav className="md:flex items-center gap-4 px-5 shadow-md py-2 text-primaryColor bg-gray-100 hidden ">
            <section className="flex w-full justify-between gap-5 items-center">
                <ul className="flex gap-4 items-center">
                    <CategoriesDrawer />
                    {categoryQuery?.data?.slice(0, 10).map((cat: Category) => {
                        return (
                            <Link
                            key={cat._id}
                                className="font-medium hover:text-secColor"
                                href={{
                                    pathname: `/${locale}/${cat.slug}`,
                                    query: {
                                        ref: cat._id,
                                         name:cat.name[locale as keyof typeof cat.name] || ''
                                    },
                                }}
                            >
                                {cat.name[locale as keyof typeof cat.name] ||
                                    ''}
                            </Link>
                        )
                    })}
                </ul>
            </section>
        </nav>
    )
}

export default CategoriesBar
