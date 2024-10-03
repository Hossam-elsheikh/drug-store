"use client";
import React, { useContext, useEffect, useState } from "react";
import { Filter, Heart, Menu, ShoppingCart, User2Icon } from "lucide-react";
import { useTranslations } from "next-intl";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "../ui/sheet";
import FilterDrawer from "../FilterDrawer/FilterDrawer";
import AuthForm from "../Form/AuthForm";

import CartDrawer from "./cart/CartDrawer";
import { useFavorites } from "@/context/favoriteProvider";
import Favorites from "./Favorites/Favorites";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale } from "@/context/LocaleProvider";
import useAuth from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { fetchCartItems } from "@/axios/instance";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { useLocalCart } from "@/hooks/useLocalCart";
import WebsiteProfileCtx from "@/context/WebsiteProfileContext";
import EmptyCart from "./cart/EmptyCart";


function SignInForm() {


    return (
        <>
            <AuthForm Type="sign-in" variant="drawer" />

        </>
    );
}

type Props = {
    showSec: string;
};

function DrawerWrapper({ showSec }: Props) {
    const [animateBounce, setAnimateBounce] = useState(false)
    const [animateBounceCart, setAnimateBounceCart] = useState(false)
    const { logo } = useContext(WebsiteProfileCtx)

    const { dir } = useLocale();
    const { auth }: any = useAuth();
    const { getTotalFavorites } = useFavorites();
    const t = useTranslations("DrawerWrapper");
    const totalFavorite = getTotalFavorites();
    const axiosPrivate = useAxiosPrivate();

    const {
        data: cartItems,
        isLoading: isCartLoading,
        error: cartError,
    } = useQuery({
        queryFn: () => fetchCartItems(axiosPrivate, auth),
        queryKey: ["cartItems"],
        enabled: !!auth.userId
    });
    
    const { localCartSelector } = useLocalCart()

    
    useEffect(() => {
        if (totalFavorite > 0) {
            setAnimateBounce(true)
            const timer = setTimeout(() => {
                setAnimateBounce(false)
            }, 600)
            return () => clearTimeout(timer);
        }
   
    }, [totalFavorite, cartItems?.data?.length, localCartSelector?.length])

    useEffect(() => {
        if (cartItems?.data?.length > 0 ||localCartSelector.localCartProducts.length>0 ) {
            setAnimateBounceCart(true)
            const timer = setTimeout(() => {
                setAnimateBounceCart(false)
            }, 600)
            return () => clearTimeout(timer);
        }},[cartItems?.data?.length,localCartSelector.localCartProducts.length])
    if (isCartLoading) null

    return (

        <Sheet>
            <SheetTrigger className={`${showSec === 'filter' ? 'px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-full shadow-sm hover:bg-gray-50 focus:outline-none transition-all duration-200 group ' : ''}`}>
                {showSec === "categories" ? (
                    <Menu />
                ) : showSec === "signInForm" ? (

                    <User2Icon className="cursor-pointer" />
                ) : showSec === "Favorites" ? (
                    <>
                        {totalFavorite > 0 ? (

                            <AnimatePresence>
                                <motion.div

                                    className="relative "
                                    whileHover="hover"
                                >
                                    <motion.span
                                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                                        initial={{ opacity: 0 }}
                                        animate={{
                                            opacity: 1,
                                            scale: animateBounce ? [1, 1.01, 0.9, 1] : 1
                                        }}
                                        exit={{ opacity: 0 }}
                                        transition={{
                                            duration: 0.6,
                                            ease: 'easeInOut'
                                        }}

                                    >
                                        {totalFavorite}
                                    </motion.span>
                                    <Heart className="cursor-pointer hover:text-red-500 transition-colors duration-200" />
                                </motion.div>
                            </AnimatePresence>


                        ) : (
                            <Heart className="cursor-pointer hover:text-red-500 transition-colors duration-200" />
                        )}
                    </>
                ) : showSec === "cart" ? (

                    <>
                        {(cartItems?.data?.length > 0 ||localCartSelector.localCartProducts.length>0 ) ? (
                            <AnimatePresence>
                                <motion.div className="relative" whileHover="hover">
                                    <motion.span
                                        className="absolute -top-1.5 -right-3 bg-[#3ea9f4] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                                        initial={{ opacity: 0 }}
                                        animate={{
                                            opacity: 1,
                                            scale: animateBounceCart ? [1, 1.01, 0.9, 1] : 1,
                                        }}
                                        exit={{ opacity: 0 }}
                                        transition={{
                                            duration: 0.6,
                                            ease: 'easeInOut',
                                        }}
                                    >
                                        {cartItems?.data?.length||localCartSelector.localCartProducts.length}
                                    </motion.span>
                                    <ShoppingCart className="w-7 h-7  hover:text-[#3ea9f4] transition-colors duration-200" />
                                </motion.div>
                            </AnimatePresence>
                            )
                            :
                            <>
                                <ShoppingCart className="w-7 h-7  hover:text-[#3ea9f4] transition-colors duration-200" />

                            </>
                        }

                    </>
                ) : showSec === "filter" ? (
                    <div className="flex gap-3">
                        {t("filter")}
                        <Filter className="cursor-pointer shadow-sm active:scale-[.99] scale-115 hover:bg-gray-50 rounded-md duration-300" />
                    </div>
                ) : null}
            </SheetTrigger>

            <SheetContent className="w-[300px] flex flex-col h-full  p-2">
                <SheetHeader className="items-center p-5 ">
                    <SheetHeader className="items-center ">
                        <Image
                            src={logo}
                            alt="logo"
                            width={100}
                            height={100}
                        />
                        <h2 className="text-lg text-primaryColor font-medium w-full text-center border-b-2 mt-5">
                            {showSec === "categories" ? null : t(showSec)}
                        </h2>
                    </SheetHeader>
                </SheetHeader>
                {showSec === "signInForm" ? (
                    <SignInForm />
                ) : showSec === "Favorites" ? (
                    <Favorites />
                ) : showSec === "cart" ? (
                    <CartDrawer />
                ) : showSec === "filter" ? (
                    <FilterDrawer />
                ) : null}
            </SheetContent>
        </Sheet>

    );
}

export default DrawerWrapper;
