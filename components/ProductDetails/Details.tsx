import React from 'react';
import StarRating from '../CustomerReview/StarRating';
import { Heart, ShoppingCart } from 'lucide-react';
import SideBar from './SideBar';
import { useTranslations } from 'next-intl';
import classNames from 'classnames';
import { useLocale } from "@/context/LocaleProvider";
import { useFavorites } from "@/context/favoriteProvider";
import { Button } from '@/components/ui/button';
import { AddToCart } from '@/axios/instance';
import useAuth from '@/hooks/useAuth';

function Details({ productDetails, className }: { productDetails: Product, className: string }) {
    const { _id, price, name, brand, image, description, category: { slug }, stock } = productDetails || {};
    const { toggleFavorite, isProductFavorite } = useFavorites()
    const { locale, dir } = useLocale()
    const handleSetRating = (rating: number) => {
        console.log(`Rating set to: ${rating}`);
    };

    const t = useTranslations("Buttons");
    const { auth }: any = useAuth()
    const addToCart = (product: any) => AddToCart(product, auth)

    return (
        <div className={classNames(
            'lg:sticky top-[125px] self-start w-full lg:w-2/3 space-y-6 p-6 bg-white border rounded-lg shadow-sm',
            className
        )}>
            <div className="space-y-3">
                <h3 className="text-sm text-gray-500 font-medium uppercase tracking-wider">
                    {brand.name?.[locale] }
                </h3>
                <h2 className="text-3xl font-bold text-gray-900">
                    {name[locale as keyof typeof name]}
                </h2>
                <div className="flex items-center justify-between">

                    <h5 className="mt-1  flex gap-1  text-2xl font-semibold text-secColor">
                        <span className="font-medium text-sm">
                            KWD
                        </span>
                        {price}
                    </h5>
                    {stock && stock !== 0 ? (
                        <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">In Stock</span>
                    ) : (
                        <span className="inline-flex items-center rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-800">Out Of Stock</span>
                    )}
                </div>
            </div>

            <div className="flex items-center gap-3">
                <StarRating
                    mode="review"
                    maxRating={5}
                    defaultRating={4}
                    size={24}
                    onSetRating={handleSetRating}
                />
                <p className="text-sm font-medium text-gray-600">
                    4.0/5 (100 reviews)
                </p>
            </div>

            <div className="space-y-4">
                <div className="flex items-center gap-3">
                    <Button
                        className="flex-grow bg-primaryColor hover:bg-[#45486e] text-white rounded-full transition-all shadow-sm duration-200 transform active:scale-[.99] flex items-center justify-center gap-2"
                        onClick={() => {
                            addToCart(productDetails);
                        }}
                    >
                        <ShoppingCart size={24} />
                        {t("addToCart")}
                    </Button>
                </div>
                <Button
                    variant="outline"
                    className={`group w-full active:scale-[.99] rounded-full flex items-center bg-white justify-center border border-gray-300 gap-3 transition-all shadow-sm duration-300 ${isProductFavorite(_id)
                        ? ' bg-red-100 text-red-700'
                        : 'text-gray-700 hover:text-red-500'
                        }`}
                    onClick={() => toggleFavorite(productDetails)}
                >
                    <Heart size={24}
                        className={`transition-all duration-300 ${isProductFavorite(_id)
                            ? 'text-red-500 fill-red-500'
                            : 'text-gray-600 hover:text-red-500 group-hover:text-red-500'
                            }`}
                    />
                    {t('addToFavorite')}
                </Button>

            </div>



            <SideBar dir={dir} />
        </div>
    );
}

export default Details;