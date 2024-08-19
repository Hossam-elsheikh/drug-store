"use client";
import React from "react";
import { Filter, Heart, Menu, ShoppingCart, User2Icon } from "lucide-react";

import { useTranslations } from "next-intl";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "../ui/sheet";
import FilterDrawer from "../FilterDrawer/FilterDrawer";
import AuthForm from "../Form/AuthForm";

import CartDrawer from "./cart/CartDrawer";
import { useLocale } from "@/context/LocaleProvider";
import { useFavorites } from "@/context/favoriteProvider";
import Favorites from "./Favorites/Favorites";
import Image from "next/image";
import image from "@/public/logo.svg";
import useAuth from "@/hooks/useAuth";


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
    const { dir } = useLocale();


    const t = useTranslations("DrawerWrapper");
    const { auth }: any = useAuth();
    const { getTotalFavorites } = useFavorites();

    const totalFavorite = getTotalFavorites();

    return (
        <div >
            <Sheet>
                <SheetTrigger className="flex items-center gap-2 font-semibold text-nowrap hover:bg:gray-50 rounded-lg">
                    {showSec === "categories" ? (
                        <Menu />
                    ) : showSec === "signInForm" ? (

                        <User2Icon className="cursor-pointer hidden md:block" />
                    ) : showSec === "Favorites" ? (
                        <>
                            {totalFavorite > 0 ? (
                                <span className="relative inline-block">
                                    <span className="absolute -top-2 -left-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                                        {totalFavorite}
                                    </span>
                                    <Heart className="cursor-pointer hover:text-red-500 transition-colors duration-200" />
                                </span>
                            ) : (
                                <Heart className="cursor-pointer hover:text-red-500 transition-colors duration-200" />
                            )}
                        </>
                    ) : showSec === "cart" ? (
                        <button className="flex items-center bg-secColor p-2 px-4 hover:bg-primaryColor hover:scale-105 cursor-pointer transition-all duration-200 rounded-3xl text-white gap-2 ">
                            <p className="font-semibold">{t("cart")}</p>
                            <ShoppingCart />
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
                    // side={dir === "rtl" ? "right" : "left"}
                >
                    <SheetHeader className="items-center p-5">
                        <SheetHeader className="items-center p-5">
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
        </div>
    );
}

export default DrawerWrapper;
