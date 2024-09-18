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
import { transCartToAPI } from '@/axios/instance';

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

    useEffect(() => {
        if (localStorageCart.length >= 1 && auth?.userId) {
            transToAPI_Mutation.mutate()
        }
    }, [auth?.userId, localStorageCart?.length])


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
                            <Link href={`/${locale}/cart`} className="flex items-center bg-secColor p-2 px-4 hover:bg-primaryColor hover:scale-105 cursor-pointer transition-all duration-200 rounded-3xl text-white gap-2 ">
                                <p className="font-semibold">{t("cart")}</p>
                                <ShoppingCart />
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
