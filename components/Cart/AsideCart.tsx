"use client";
import React from 'react'
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useTranslations } from 'next-intl';

function AsideCart({ totalPrice, cartItems }: { totalPrice: any, cartItems: any }) {
    const c = useTranslations("CartPage");

    // Check if totalPrice and cartItems are defined and have data
    // const totalPrice = (cartItem.productId.price * cartItem.quantity).toFixed(2)
    const price = (totalPrice?.data?.cartTotalPrice).toFixed(2) || 0;
    const itemCount = cartItems?.data?.length || 0;

    return (
        <div className="lg:col-span-1">
            <div className="bg-white shadow-md rounded-lg p-6 sticky top-24">
                <h2 className="font-medium text-xl mb-4 text-center">
                    {c('orderSummary')}
                </h2>
                <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-600">{c('total')}</span>
                    <span className="font-semibold">{price} KWD</span>
                </div>
                <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-600">{c('items')}</span>
                    <span>{itemCount}</span>
                </div>
                <Link
                    href="/en/checkout"
                    className="w-full text-center text-white justify-center gap-2 font-medium py-3 px-4  bg-primaryColor rounded-full hover:bg-[#45486e] transition duration-300 flex group"
                >
                    {c('proceedToCheckout')}
                    <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
            </div>
        </div>
    )
}

export default AsideCart