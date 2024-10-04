import React, { use } from 'react';
import StarRating from '../CustomerReview/StarRating';
import { Heart, ShoppingCart } from 'lucide-react';
import SideBar from './SideBar';
import { useTranslations } from 'next-intl';
import classNames from 'classnames';
import { useLocale } from "@/context/LocaleProvider";
import { useFavorites } from "@/context/favoriteProvider";
import { Button } from '@/components/ui/button';
import { AddToCart, addToWishList, removeProductFromWishList } from '@/axios/instance';
import useAuth from '@/hooks/useAuth';
import { useLocalCart } from '@/hooks/useLocalCart';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Toaster, toast } from 'sonner'

function Details({ productDetails, className }: any) {
    const { _id, price, name, brand, image, description, category: { slug }, stock } = productDetails || {};
    const { toggleFavorite, isProductFavorite } = useFavorites()
    const { locale, dir } = useLocale()
    const handleSetRating = (rating: number) => {
        console.log(`Rating set to: ${rating}`);
    };

    const t = useTranslations("Buttons");
    const { auth }: any = useAuth()

    //add to cart handler with API call
    const queryClient = useQueryClient()
    const AddToCartMutation = useMutation({
        mutationFn:(product: object) => AddToCart(product, auth),
        onSuccess:() => queryClient.invalidateQueries(),
        onError(error, variables, context) {
            toast.error("this product is out of stock")
        },
    })

    const addProductToWishListMutation = useMutation({
        mutationFn:(productId:any)=> addToWishList(productId,auth.userId),
        onSuccess: () => queryClient.invalidateQueries(),
    })

    const removeProductFromWishListMutation = useMutation({
        mutationFn: (productId) => removeProductFromWishList(auth.userId, productId),
        onSuccess: () => queryClient.invalidateQueries(),
    })
    const RemoveProductFromWishList = (productId: any) => removeProductFromWishListMutation.mutate(productId)

    //add to cart handler with localStorage
    const {addToLocalCartDispatch} = useLocalCart()

    return (
        <div className={classNames(
            'lg:sticky top-[125px] self-start w-full lg:w-2/3 space-y-6 p-6 bg-white border rounded-lg shadow-sm',
            className
        )}>
            <div className="space-y-3">
                <h3 className="text-sm text-gray-500 font-medium uppercase tracking-wider">
                    {brand?.name?.[locale] }
                </h3>
                <h2 className="text-3xl font-bold text-gray-900">
                    {name[locale as keyof typeof name]||""}
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

        

            <div className="space-y-4">
                <div className="flex items-center gap-3">
                    <Button
                    disabled={stock <= 0}
                        className="flex-grow bg-primaryColor hover:bg-primaryColor/90 text-white rounded-full transition-all duration-200 transform active:scale-95 flex items-center justify-center gap-2 disabled:scale-100 disabled:bg-gray-800 disabled:cursor-not-allowed"
                        onClick={() => auth && auth.userId ?  AddToCartMutation.mutate(productDetails) : addToLocalCartDispatch(productDetails)}
                    >
                        <ShoppingCart size={24} />
                        {stock > 0 ?  t("addToCart") : t('unAvailable')}

                    </Button>
                </div>
                <Button
                    variant="outline"
                    className={`group w-full active:scale-[.99] rounded-full flex items-center bg-white justify-center border border-gray-300 gap-3 transition-all shadow-sm duration-300 ${isProductFavorite(_id)
                        ? ' bg-red-100 text-red-700'
                        : 'text-gray-700 hover:text-red-500'
                        }`}
                        onClick={() => auth&&auth.userId? isProductFavorite(_id)? RemoveProductFromWishList(_id) : addProductToWishListMutation.mutate(_id) : toggleFavorite(productDetails) }
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
            <SideBar  />
        </div>
    );
}

export default Details;