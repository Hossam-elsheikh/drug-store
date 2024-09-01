"use client";
import React, { useEffect, useState } from "react";
import { Filter, Heart, Menu, ShoppingCart, User2Icon } from "lucide-react";

import { useTranslations } from "next-intl";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "../ui/sheet";
import FilterDrawer from "../FilterDrawer/FilterDrawer";
import AuthForm from "../Form/AuthForm";

import CartDrawer from "./cart/CartDrawer";

import { useFavorites } from "@/context/favoriteProvider";
import Favorites from "./Favorites/Favorites";
import Image from "next/image";
import image from "@/public/logo.svg";

import { motion, AnimatePresence } from "framer-motion";


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
    const { getTotalFavorites } = useFavorites();
    const t = useTranslations("DrawerWrapper");
    const totalFavorite = getTotalFavorites();

    useEffect(() => {
        if (totalFavorite > 0) {
            setAnimateBounce(true)
            setTimeout(() => {
                setAnimateBounce(false)
            }, 600)
        }
    }, [totalFavorite])


    return (

        <Sheet>
            <SheetTrigger className="flex items-center gap-2 font-semibold text-nowrap hover:bg:gray-50 rounded-lg">
                {showSec === "categories" ? (
                    <Menu />
                ) : showSec === "signInForm" ? (

                    <User2Icon className="cursor-pointer hidden md:block" />
                ) : showSec === "Favorites" ? (
                    <>
                        {totalFavorite > 0 ? (
                            <AnimatePresence>
                                <motion.div

                                    className="relative inline-block"
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
                    <button className=" md:flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-full shadow-sm hover:bg-gray-50 focus:outline-none transition-all duration-200 group">
                        <ShoppingCart className="w-5 h-5 text-gray-600 group-hover:text-primaryColor" />
                        <span className="hidden sm:inline group-hover:text-primaryColor">{t("cart")}</span>
                    </button>
                ) : showSec === "filter" ? (
                    <div className="flex gap-2">
                        {t("filter")}
                        <Filter className="cursor-pointer shadow-sm active:scale-95 scale-115 hover:bg-gray-50 rounded-md duration-300" />
                    </div>
                ) : null}
            </SheetTrigger>
            <SheetContent
                className="w-[300px] flex flex-col h-dvh p-2"
           
            >
                <SheetHeader className="items-center p-5 mt-5 ">
                    <SheetHeader className="items-center ">
                        <Image
                            src={image}
                            alt="logo"
                            width={100}
                            height={100}
                        />
                        <h2 className="text-lg text-primaryColor font-medium w-full text-center border-b-2">
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
