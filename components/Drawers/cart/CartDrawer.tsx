import React, { useState } from "react";
import CartDrawerItem from "./CartDrawerItem";
import { products } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { SheetClose } from "@/components/ui/sheet";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAuth from "@/hooks/useAuth";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { ShoppingCart } from "lucide-react";
import useCalcCartMutation from "@/hooks/calcCartMutation";
import { useLocale } from "@/context/LocaleProvider";
import CartSvg from '@/public/Add to Cart-amico.svg'
import Image from "next/image";
import Link from "next/link";
import { calcCart, fetchCartItems } from "@/axios/instance";
import removeItemMutation from "@/hooks/removeItemCartMutation";


const CartDrawer = () => {

    const { auth }: any = useAuth();
    const axiosPrivate = useAxiosPrivate();

    const t = useTranslations("cart");
    const router = useRouter();
    const { dir, locale } = useLocale();

    const {
        data: cartItems,
        isLoading: isCartLoading,
        error: cartError,
    } = useQuery({
        queryFn: () => fetchCartItems(axiosPrivate, auth),
        queryKey: ["cartItems"],
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

    if (isCartLoading) return <p>cart items loading...</p>;
    if (cartError) return <h1>error while fetching cart</h1>
    if (isTotalPriceLoading) return <p>total price loading...</p>;
    if (totalPriceError) return <h1>error while fetching total price</h1>

    return (
        <>
            {cartItems.data.length >= 1 ?
                <div className=" flex flex-col " dir={dir}>
                    <div className="h-2/3 overflow-auto overflow-x-hidden border-b-2">
                        {cartItems.data.map((cartItem, i) => (
                            <CartDrawerItem 
                                cartItem={cartItem}
                                key={i}
                                auth={auth}
                                removeItemCartMutation={removeItemCartMutation}
                                calculateCartMutation={calculateCartMutation}
                            />
                        ))}
                    </div>
                    <div className="p-3  flex flex-col gap-4">
                        <div className="flex text-lg font-medium justify-between items-center">
                            <h3>{t("totalPrice")}</h3>
                            <p>
                                {totalPrice.data.cartTotalPrice} <span className="text-sm font-light">{t("dinar")}</span>
                            </p>
                        </div>
                        <p className="text-xs bg-green-700 p-1 rounded-md text-white">
                            {t("taxes")}
                        </p>
                        <div className="flex flex-col items-center gap-3">
                            <SheetClose asChild >

                                <Link
                                    className=" flex justify-center w-full bg-primaryColor font-medium text-white py-2 rounded-full hover:opacity-80"
                                    // onClick={() => navigate(`/cart`)}
                                    href={'/en/cart'}
                                >
                                    {t("expandCart")}
                                </Link>
                            </SheetClose>
                            <SheetClose asChild >

                                <Link
                                    href={'/en/checkout'}
                                    className=" flex justify-center w-full bg-primaryColor font-medium text-white py-2 rounded-full hover:opacity-80"
                                // onClick={() => navigate(`/checkout`)}
                                >
                                    {t("checkout")}
                                </Link>
                            </SheetClose>
                        </div>
                    </div>
                </div>
                :
                <></>
            }
            {cartItems.data.length <= 0 ?
                <div className=" h-full  flex text-center">
                    <div className="my-auto space-y-5 ">
                        <ShoppingCart className="mx-auto h-[130px] w-[130px]" />
                        <p className="  font-semibold text-3xl px-3">Your Cart Is Empty</p>
                        <p className="px-3">Add some Products to Your Cart</p>
                    </div>
                </div>
                :
                <></>
            }
        </>
    );
}
export default CartDrawer