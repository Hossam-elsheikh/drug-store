'use client'
import React, { useEffect, useState } from "react";
import CartDrawerItem from "./CartDrawerItem";
import { useTranslations } from "next-intl";
import { SheetClose } from "@/components/ui/sheet";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAuth from "@/hooks/useAuth";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { AlertCircle, ArrowRight, ShoppingCart } from "lucide-react";
import useCalcCartMutation from "@/hooks/calcCartMutation";
import { useLocale } from "@/context/LocaleProvider";
import Link from "next/link";
import { calcCart, fetchCartItems, transCartToAPI } from "@/axios/instance";
import removeItemMutation from "@/hooks/removeItemCartMutation";
import EmptyCart from "./EmptyCart";
import { useDispatch, useSelector } from "react-redux";
import { useLocalCart } from "@/hooks/useLocalCart";
import { useTransLocalCartAPI } from "@/hooks/useTransLocalCartAPI";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AnimatePresence } from "framer-motion";
import SlideCardAnimation from "@/components/Animation/SlideCardAnimation";
import { CartItem } from "@/types";

type Product = {
    productId: object,
    _id: string,
    name: string,
}

const CartDrawer = () => {

    const { auth }: any = useAuth();
    const axiosPrivate = useAxiosPrivate();

    const t = useTranslations("cart");
    const { dir, locale } = useLocale();

    const {
        data: cartItems,
        isLoading: isCartLoading,
        error: cartError,
    } = useQuery({
        queryFn: () => fetchCartItems(axiosPrivate, auth),
        queryKey: ["cartItems"],
        enabled: !!auth?.userId
    });

    const calculateCartMutation = useCalcCartMutation({ axiosPrivate, auth })
    const removeItemCartMutation = removeItemMutation(axiosPrivate)

    const {
        data: totalPrice,
        isLoading: isTotalPriceLoading,
        error: totalPriceError,
    } = useQuery({
        queryFn: () => calcCart({ axiosPrivate, auth }),
        queryKey: ['totalPrice'],
        enabled: !!cartItems,
    })

    const [localStorageCart, setLocalStorageCart] = useState([]);
    const { localCartSelector } = useLocalCart();

    useEffect(() => {
        const fetchingLocalStorageCart = JSON.parse(localStorage.getItem("products") || '[]');
        setLocalStorageCart(fetchingLocalStorageCart);
    }, [localCartSelector]);

    if (isCartLoading || isTotalPriceLoading) {
        return (
            <div className="p-4 space-y-4">
                <div className="h-20 w-full bg-gray-200 animate-pulse rounded"></div>
                <div className="h-20 w-full bg-gray-200 animate-pulse rounded"></div>
                <div className="h-20 w-full bg-gray-200 animate-pulse rounded"></div>
                <div className="h-10 w-1/2 bg-gray-200 animate-pulse rounded"></div>
            </div>
        )
    }
    if (cartError || totalPriceError) {
        return (
            <div className="p-4 bg-red-100 border-l-4 text-red-700">
                <div className="flex items-center">
                    <AlertCircle className="h-5 w-5 mr-2" />
                    <p className="font-bold">Error</p>
                </div>
                <p className="mt-2">
                    {cartError ? "Failed to load cart items." : "Failed to calculate total price."}
                    Please try again later.
                </p>
            </div>
        );
    }

    const cartProducts = auth?.userId ? cartItems.data : localStorageCart;

    return (
        <>
            {auth?.userId && cartItems.data.length >= 1 || !auth?.userId && localStorageCart.length >= 1 ?
                <section className="flex flex-col h-full " dir={dir}>
                    <>
                        <ScrollArea className="h-full max-h-[600px] overflow-hidden">
                            <AnimatePresence>
                                {cartProducts.length >= 1 &&
                                    cartProducts.map((cartItem: any, i:number) => (
                                        <div key={cartItem._id||i }>
                                            <SlideCardAnimation key={cartItem._id||i}>
                                                <CartDrawerItem
                                                    cartItem={cartItem}
                                                    auth={auth}
                                                    removeItemCartMutation={removeItemCartMutation}
                                                    calculateCartMutation={calculateCartMutation}
                                                    details={null}
                                                />
                                            </SlideCardAnimation>
                                        </div>
                                    ))}
                            </AnimatePresence>
                        </ScrollArea>
                        <div className="p-4 border-t">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-medium">{t("totalPrice")}</h3>
                                <p className="text-lg font-bold">
                                    {(totalPrice?.data.cartTotalPrice||localCartSelector.localCartTotal).toFixed(2)} <span className="text-sm font-normal">{t("dinar")}</span>
                                </p>
                            </div>
                            {/* <p className="text-[11px] bg-green-700 text-white p-2 rounded-md mb-4">
                                {t("taxes")}
                            </p> */}

                            <div className="space-y-3">
                                <SheetClose asChild >

                                    <Link
                                        className=" flex justify-center w-full bg-primaryColor gap-2  font-medium text-white py-2 rounded-full hover:bg-[#45486e] duration-300 transition-all group"
                                        href={`/${locale}/cart`}
                                    >
                                        {t("expandCart")}
                                        {/* <ShoppingCart size={22} className=" group-hover:translate-x-1 transition-transform" /> */}
                                    </Link>
                                </SheetClose>
                                <SheetClose asChild >

                                    <Link
                                        href={`/${locale}/checkout`}
                                        className=" flex justify-center w-full bg-primaryColor font-medium gap-2 text-white py-2 rounded-full hover:bg-[#45486e] duration-300 transition-all group"
                                    >
                                        {t("checkout")}
                                        <ArrowRight size={22} className=" group-hover:translate-x-1 transition-transform duration-200" />
                                    </Link>
                                </SheetClose>
                            </div>
                        </div>
                    </>
                </section>
                : null
            }

            {(auth?.userId && cartItems.data.length === 0) || (!auth?.userId && localStorageCart.length <= 0) ?

                <div className="flex flex-col items-center justify-center h-full text-center p-4">
                    <EmptyCart />

                    
                    <SheetClose asChild >

                        <Link
                            href={`/${locale}/`}
                            className="bg-primaryColor text-white py-2 px-4 rounded-full hover:bg-[#3a3c57] transition-colors duration-300"
                        >
                            {t("startShopping")}
                        </Link>
                    </SheetClose>
                </div>
                : null}

        </>
    );
}
export default CartDrawer