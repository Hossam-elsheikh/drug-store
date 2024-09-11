import React, { useEffect, useState } from "react";
import CartDrawerItem from "./CartDrawerItem";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { SheetClose } from "@/components/ui/sheet";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAuth from "@/hooks/useAuth";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { ShoppingCart } from "lucide-react";
import useCalcCartMutation from "@/hooks/calcCartMutation";
import { useLocale } from "@/context/LocaleProvider";
import CartSvg from '@/public/Add to Cart-amico.svg'
import Image from "next/image";
import Link from "next/link";
import { calcCart, fetchCartItems, transCartToAPI } from "@/axios/instance";
import removeItemMutation from "@/hooks/removeItemCartMutation";
import EmptyCart from "./EmptyCart";
import { useDispatch, useSelector } from "react-redux";
import { useLocalCart } from "@/hooks/useLocalCart";
import { useTransLocalCartAPI } from "@/hooks/useTransLocalCartAPI";

type Product = {
    productId: object,
    _id: string,
    name: string,
}

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
        enabled: !!auth.userId
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
    const { localCartSelector } = useLocalCart()

    useEffect(() => {
        const fetchingLocalStorageCart = JSON.parse(localStorage.getItem("products") || '[]');
        setLocalStorageCart(fetchingLocalStorageCart);
    }, [localCartSelector]);

    if (isCartLoading) return <p>cart items loading...</p>;
    if (cartError) return <h1>error while fetching cart</h1>
    if (isTotalPriceLoading) return <p>total price loading...</p>;
    if (totalPriceError) return <h1>error while fetching total price</h1>

    return (
        <>
            {auth.userId && cartItems.data.length >= 1 || !auth.userId && localStorageCart.length >= 1 ?
                <div className=" flex flex-col " dir={dir}>
                    <div className="h-2/3 overflow-auto overflow-x-hidden border-b-2">
                        {auth.userId && cartItems.data.length >= 1 ?
                            <>
                                {cartItems.data.map((cartItem: any, i: any) => (
                                    <CartDrawerItem
                                        cartItem={cartItem}
                                        key={i}
                                        auth={auth}
                                        removeItemCartMutation={removeItemCartMutation}
                                        calculateCartMutation={calculateCartMutation}
                                    />
                                ))}
                            </>
                            :
                            <>
                                {localStorageCart.map((cartItem: any, i: any) => (
                                    <CartDrawerItem
                                        cartItem={cartItem}
                                        key={i}
                                        auth={auth}
                                        removeItemCartMutation={removeItemCartMutation}
                                        calculateCartMutation={calculateCartMutation}
                                    />
                                ))}
                            </>
                        }
                    </div>

                    <div className="p-3  flex flex-col gap-4">
                        <div className="flex text-lg font-medium justify-between items-center">
                            <h3>{t("totalPrice")}</h3>
                            <p>
                                {/* {totalPrice.data.cartTotalPrice} <span className="text-sm font-light">{t("dinar")}</span> */}
                            </p>
                        </div>
                        <p className="text-xs bg-green-700 p-1 rounded-md text-white">
                            {t("taxes")}
                        </p>
                        <div className="flex flex-col items-center gap-3">
                            <SheetClose asChild >

                                <Link
                                    className=" flex justify-center w-full bg-primaryColor font-medium text-white py-2 rounded-full hover:opacity-80"
                                    href={`/${locale}/cart`}
                                >
                                    {t("expandCart")}
                                </Link>
                            </SheetClose>
                            <SheetClose asChild >

                                <Link
                                    href={`/${locale}/checkout`}
                                    className=" flex justify-center w-full bg-primaryColor font-medium text-white py-2 rounded-full hover:opacity-80"
                                >
                                    {t("checkout")}
                                </Link>
                            </SheetClose>
                        </div>
                    </div>
                </div>
                : null
            }
            {auth.userId && cartItems.data.length <= 0 ?
                <EmptyCart />
                :
                !auth.userId && localStorageCart.length <= 0 &&
                <EmptyCart />
            }
        </>
    );
}
export default CartDrawer