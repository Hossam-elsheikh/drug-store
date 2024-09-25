'use client';
import React, { useEffect } from 'react';
import LanguageSwitcher from '../LanguageSwitcher';
import DrawerWrapper from '../Drawers/DrawerWrapper';
import { useLocale } from "@/context/LocaleProvider";
import useAuth from "@/hooks/useAuth";
import Link from "next/link";
import UserPopUp from '../UserProfile/UserPopUp';
import { usePathname } from "next/navigation";
import { ShoppingCart } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useTransLocalCartAPI } from '@/hooks/useTransLocalCartAPI';
import { useMutation } from '@tanstack/react-query';
import { transCartToAPI, transLocalWishListToAPI } from '@/axios/instance';
import { useFavorites } from '@/context/favoriteProvider';

const Icons = () => {

    const { locale } = useLocale();
    const { auth }: any = useAuth();
    const pathName: string = usePathname();
    const t = useTranslations("DrawerWrapper");

    // handle the transfer of the local storage cart to the API.
    // This mutation will be triggered after a successful user sign-in.
    const localStorageCart = JSON.parse(localStorage.getItem('products') || '[]')
    const transToAPI_Mutation = useMutation({
        mutationFn: () => transCartToAPI(auth.userId, localStorageCart),
        //on successful response the localStorage will be deleted
        onSuccess: () => localStorage.removeItem('products'),
        onError: (error) => console.log('error while mutation trans to cart api', error),
    })

    // handle the transfer of the local storage wishList to the API.
    // This mutation will be triggered after a successful user sign-in.
    const { favoriteProducts } = useFavorites()
    const transLocalWishListToAPI_Mutation = useMutation({
        mutationFn: () => transLocalWishListToAPI(favoriteProducts, auth.userId),
        onSuccess: () => { localStorage.removeItem('FavoriteItems'); console.log('wishlist products now are removed and moved successfully from local storage to api'); },
        onError: (error) => console.log('error while mutation trans wishlist to api', error),
    })

    useEffect(() => {
        if (localStorageCart.length >= 1 && auth?.userId) {
            transToAPI_Mutation.mutate()
        }
        if (favoriteProducts?.length > 0 && auth?.userId) {
            transLocalWishListToAPI_Mutation.mutate()
        }
    }, [auth?.userId, localStorageCart?.length, favoriteProducts?.length])


    useEffect(() => {

    }, [auth, pathName]);

    return (
        <>
            <div className='flex items-center gap-5'>

                {auth?.userId && !(pathName === `/${locale}/sign-in` || pathName === `/${locale}/sign-up`) && (
                    <UserPopUp />
                )}

                {!auth?.userId && !(pathName === `/${locale}/sign-in` || pathName === `/${locale}/sign-up`) && (
                    <DrawerWrapper showSec='signInForm' />
                )}


                {pathName === `/${locale}/sign-in` || pathName === `/${locale}/sign-up` ?
                    null
                    :
                    <>
                        {pathName === `/${locale}/checkout` ?
                            <Link href={`/${locale}/cart`} >
                                    <ShoppingCart className="w-7 h-7  hover:text-[#3ea9f4] transition-colors duration-200" />
                                    {/* <p className="font-medium my-auto">{t("cart")}</p> */}
                            </Link>
                            :
                            (
                                <DrawerWrapper showSec='cart' />
                            )
                        }
                    </>
                }
                {pathName === `/${locale}/sign-in` || pathName === `/${locale}/sign-up` ?
                    null
                    :
                    <DrawerWrapper showSec='Favorites' />
                }
                <LanguageSwitcher classes='hidden md:block' />
            </div>
        </>

    );
};

export default Icons;
