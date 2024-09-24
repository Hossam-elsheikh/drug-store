"use client";

import { calcCart, fetchCartItems } from "@/axios/instance";
import BreadCrumb from "@/components/Breadcrumb/BreadCrumb";
import AsideCart from "@/components/Cart/AsideCart";
import EmptyCart from "@/components/Cart/EmptyCart";
import CartItem from "@/components/ItemCard/CartItem";
import useAuth from "@/hooks/useAuth";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { useLocalCart } from "@/hooks/useLocalCart";
import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2, } from "lucide-react";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";

const Cart = () => {
    const axiosPrivate = useAxiosPrivate();
    const { auth }: any = useAuth();
    const c = useTranslations("CartPage");

    const {
        data: cartItems,
        isLoading: isCartLoading,
        error: cartError,
    } = useQuery({
        queryFn: () => fetchCartItems(axiosPrivate, auth),
        queryKey: ["cartItems"],
        enabled:!!auth.userId
    });    

    const {
        data: totalPrice,
        isLoading: isTotalPriceLoading,
        error: totalPriceError,
    } = useQuery({
        queryFn: () => calcCart({ axiosPrivate, auth }),
        queryKey: ["totalPrice"],
        enabled: !!cartItems,
    });

    const [localStorageCart, setLocalStorageCart] = useState([]);
    const { localCartSelector } = useLocalCart()
    console.log(localStorageCart);
    
    useEffect(() => {
        const fetchingLocalStorageCart = JSON.parse(localStorage.getItem("products") || '[]');
        setLocalStorageCart(fetchingLocalStorageCart);
    }, [localCartSelector]);

    const cartProducts = auth?.userId ? cartItems?.data : localStorageCart;
    console.log(cartProducts);
    
    if (cartError || totalPriceError)
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
                    <p className="font-bold">Error</p>
                    <p>An error occurred while fetching cart data. Please try again later.</p>
                </div>
            </div>
        );

    return (
        <div className="bg-gray-50 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
            <BreadCrumb />
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">{c('shoppingCart')}</h1>

                {isCartLoading || isTotalPriceLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <Loader2 className="animate-spin h-12 w-12 text-gray-600" />
                    </div>
                ) : cartProducts?.length > 0 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        <div className="lg:col-span-3 space-y-6">
                            <AnimatePresence>
                                {cartProducts.map((cartItem: any) =>(
                                    <motion.div
                                        key={cartItem._id}
                                        layout
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <CartItem
                                            cartItem={cartItem}

                                        />
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>

                        <AsideCart totalPrice={totalPrice||localCartSelector} cartItems={cartProducts} />
                    </div>
                ) : (
                    <EmptyCart />
                )}
            </div>
        </div>
    );
};

export default Cart;