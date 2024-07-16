import Image from 'next/image'
import React from 'react'
import addImage from '@/public/undraw_add_files_re_v09g.svg'
import { useTranslations } from 'next-intl';
import ProductCard from '@/components/ItemCard/ProductCard';
import { products } from '@/lib/utils';

export default function Favorites() {
    const dir = 'ltr'
    const t = useTranslations("Favorites");

    return (
        <div>
            <h1 className="text-2xl p-3 md:text-3xl font-base mb-4 md:mb-0">{t('Favorites')}</h1>

            <div>
                {products.length === 0 ? (
                    <div className='items-center flex flex-col h-fit w-full'>
                        <div className="w-full max-w-md">
                            <Image src={addImage} layout="responsive" width={100} height={100} alt="No items in the Favorites" />
                        </div>
                        <h1 className='text-lg'>No items in the Favorites.</h1>
                    </div>
                ) : (
                    <div className="flex flex-wrap gap-4 justify-center">
                        {products?.map((item, i) => (
                            <div key={i} className="flex">
                                <ProductCard details={item} index={i} mode='whishlist' />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}