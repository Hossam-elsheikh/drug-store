'use client'
import Image from 'next/image'
import React from 'react'
import addImage from '@/public/undraw_add_files_re_v09g.svg'
import { useTranslations } from 'next-intl';
import ProductCard from '@/components/ItemCard/ProductCard';
import { useFavorites } from '@/context/favoriteProvider';



export default function Favorites() {
    const { favoriteProducts } = useFavorites()
    const t = useTranslations("Favorites");

    return (
        <>
            <h1 className="text-2xl p-3 md:text-3xl font-base mb-4 md:mb-0">{t('favorites')}</h1>

            <section className='mt-5'>
                {favoriteProducts.length === 0 ? (
                    <div className='items-center flex flex-col h-fit w-full'>
                        <div className="w-full max-w-md">
                            <Image src={addImage} layout="responsive" width={100} height={100} alt="No items in the Favorites" />
                        </div>
                        <h1 className='text-lg'>{t('noItems')}</h1>
                    </div>
                ) : (
                    <div className="flex flex-wrap gap-4 justify-center">
                        {favoriteProducts?.map((item, i) => (
                            <div key={i} className="flex">
                                <ProductCard details={item} index={item._id} mode='wishlist' />
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </>
    );
}