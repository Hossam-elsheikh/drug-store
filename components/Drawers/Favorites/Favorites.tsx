
import CartDrawerItem from "../cart/CartDrawerItem";
import Image from 'next/image';
import CartSvg from '@/public/Add to Cart-amico.svg'
import { useTranslations } from "next-intl";
import { useFavorites } from "@/context/favoriteProvider";
import useAuth from "@/hooks/useAuth";
import { getWishList, instancePrivate } from "@/axios/instance";
import { useQuery } from "@tanstack/react-query";
import { AlertCircle, Loader2 } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import SlideCardAnimation from "@/components/Animation/SlideCardAnimation";

export default function Favorites() {
    const t = useTranslations("Favorites");
    const { getTotalFavorites, favoriteProducts } = useFavorites()
    const totalFavorite = getTotalFavorites()
    const { auth }: any = useAuth();

    const {
        data: wishList,
        isLoading: wishListIsLoading,
        error: wishListError,
    } = useQuery({
        queryFn: () => getWishList(auth.userId),
        queryKey: ['wishList'],
        enabled: !!auth.userId
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

    const wishListProducts = auth?.userId ? wishList?.products : favoriteProducts;

    return (
        <div className="h-dvh overflow-auto overflow-x-hidden p-2 pb-20 space-y-2 border-b-2">

            {(!auth.userId && totalFavorite === 0) || (auth?.userId && (wishList?.products.length === 0 || wishList?.length === 0)) ?
                <div className='flex justify-center items-center h-full flex-col '>
                    <Image src={CartSvg} width={200} height={200} alt="cartSvg" />
                    <h1 className='font-semibold md:text-xl text-lg pt-5'>{t('addToFavorites')}</h1>
                </div>
                :
                (
                    <AnimatePresence>
                        {wishListProducts?.map((prod: any, i: number) => (
                            <div key={prod._id || i}>
                                <SlideCardAnimation key={prod._id || i}>
                                    <CartDrawerItem
                                        mode="Favorites"
                                        details={prod}
                                        auth={auth}
                                        removeItemCartMutation={null}
                                        calculateCartMutation={null}
                                        cartItem={null}
                                    />
                                </SlideCardAnimation>
                            </div>
                        ))}
                    </AnimatePresence>
                )
            }

        </div>
    );
}
