import React from 'react';
import StarRating from '../CustomerReview/StarRating';
import { Heart, ShoppingCart } from 'lucide-react';
import Counter from "../ItemCard/Counter";
import { Button } from '../ui/button';
import SideBar from './SideBar';
import { useTranslations } from 'next-intl';

type productDetailsProps = {
    brand?: string;
    details?: string;
    title?: string;
    price?: number;
    img?: string;
    stock?: number;
    dir?: string;
    className?: string;
};

function Details({ title, price, brand, stock, className }: productDetailsProps) {
    const handleSetRating = (rating: number) => {
        console.log(`Rating set to: ${rating}`);
    };

    const t = useTranslations("Buttons");
    return (
        <div className={`lg:sticky top-[120px] self-start w-full lg:w-2/3 space-y-3 p-5 bg-white border rounded-lg border-gray-100 order-1 block ${className}`}>
            <h3 className="text-xs text-gray-500 font-light">
                {brand ? brand : "Johnson"}
            </h3>
            <h3 className="text-3xl font-semibold">
                {title ? title : "Premium Blazer"}
            </h3>
            <h5 className="text-2xl text-gray-900">
                {price ? `$${price}` : "$1000"}
            </h5>
            {stock ? (
                <span className="inline-flex items-center rounded-lg bg-green-200 px-2 py-1 text-sm font-base text-green-800 ring-1 ring-inset ring-green-600/10">In Stock</span>
            ) : (
                <span className="inline-flex items-center rounded-lg bg-red-200 px-2 py-1 text-sm font-base text-red-800 ring-1 ring-inset ring-red-600/10">Out Of Stock</span>
            )}
            <div className="my-8 flex items-center gap-2">
                <StarRating
                    mode="rating"
                    maxRating={5}
                    defaultRating={4}
                    size={30}
                    onSetRating={handleSetRating}
                />
                <p className="text-sm font-bold text-gray-700">
                    4.0/5 (100 reviews)
                </p>
            </div>
            <div className="mb-4 flex w-full items-center gap-3">
                <Button className="">
                    <Heart className="h-6 w-6" />
                </Button>
                <Button className="bg-primaryColor gap-2 w-full">
                    {t("addToCart")}
                    <ShoppingCart />
                </Button>
                <Counter />
            </div>
            <SideBar dir="rtl" />
        </div>
    );
}

export default Details;
