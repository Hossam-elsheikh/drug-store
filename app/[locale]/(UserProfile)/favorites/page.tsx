'use client'
import Image from 'next/image'
import React from 'react'
import addImage from '@/public/undraw_add_files_re_v09g.svg'
import { useTranslations } from 'next-intl';
import ProductCard from '@/components/ItemCard/ProductCard';
import { useFavorites } from '@/context/favoriteProvider';
import useAuth from '@/hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { getWishList } from '@/axios/instance';
import { AlertCircle } from 'lucide-react';

export default function Favorites() {
    const { favoriteProducts } = useFavorites()
    const t = useTranslations("Favorites");
    const { auth }: any = useAuth();

    const {
        data: wishList,
        isLoading: wishListIsLoading,
        error: wishListError,
    } = useQuery({
        queryFn: () => getWishList(auth.userId),
        queryKey: ['wishList'],
        enabled: !!auth?.userId
    })

    if (wishListIsLoading) {
        return (
            <div className="p-4 space-y-4">
                <div className="h-20 w-full bg-gray-200 animate-pulse rounded"></div>
                <div className="h-20 w-full bg-gray-200 animate-pulse rounded"></div>
                <div className="h-20 w-full bg-gray-200 animate-pulse rounded"></div>
                <div className="h-10 w-1/2 bg-gray-200 animate-pulse rounded"></div>
            </div>
        )
    }

    const wishListProducts = auth?.userId ? wishList?.products : favoriteProducts;

    if (wishListError) {
        return (
            <div className="p-4 bg-red-100 border-l-4 text-red-700">
                <div className="flex items-center">
                    <AlertCircle className="h-5 w-5 mr-2" />
                    <p className="font-bold">Error</p>
                </div>
                <p className="mt-2">
                    Failed to load wish list items.
                    Please try again later.
                </p>
            </div>
        );
    }

    return (
        <>
            <h1 className="text-2xl p-3 md:text-3xl font-base mb-4 md:mb-0">{t('favorites')}</h1>

            <section className='mt-5'>
                {wishListProducts.length === 0 ? (
                    <div className='items-center flex flex-col h-fit w-full'>
                        <div className="w-full max-w-md">
                            <Image src={addImage} layout="responsive" width={100} height={100} alt="No items in the Favorites" />
                        </div>
                        <h1 className='text-lg'>{t('noItems')}</h1>
                    </div>
                ) : (
                    <div className="flex flex-wrap gap-4 justify-center">
                        {wishListProducts?.map((item:any, i:any) => (
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