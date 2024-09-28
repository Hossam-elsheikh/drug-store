'use client'

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import categoryPlaceholder from '@/lib/placeholders/category-placeholder.png'
import { useLocale } from '@/context/LocaleProvider'
import { Category } from '@/types'



type ItemSliderProps = {
    item: Category;
};

function ItemSlider({ item }: ItemSliderProps) {
    const { locale } = useLocale()
    const imagePath = process.env.NEXT_PUBLIC_IMAGE_PATH || '';

    const { slug, name } = item;

    return (
        <Link
        href={{
            pathname: `/${locale}/${slug}`,
            query: { ref: item._id, name:name[locale as keyof typeof name] || ''},
        }}
            className="flex flex-col gap-5 justify-center items-center p-1 my-8  hover:scale-110 transition duration-300"
        >
            <div>
                <Image
                    quality={100}
                    width={150}
                    height={150}
                    src={item.image ? `${imagePath}${item.image}` : categoryPlaceholder}
                    alt={name[locale as keyof typeof name]}
                />
            </div>
            <div className="text-center mt-2 md:mt-1">
                <h2 className="font-medium text-md">{name[locale as keyof typeof name]}</h2>
            </div>
        </Link>
    )
}

export default ItemSlider
