"use client";
import React from "react";
import Image from "next/image";
import addImage from "@/public/undraw_add_files_re_v09g.svg";
import { useTranslations } from "next-intl";
import UserOrderInfo, { UserOrderSkeleton } from "@/components/UserProfile/order/UserOrderInfo";
import { useQuery } from "@tanstack/react-query";
import { getUserOrders } from "@/axios/instance";
import useAuth from "@/hooks/useAuth";

export default function Orders() {
    const { auth }:any = useAuth();
    const {
        data: OrdersInfoResponse,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryFn: async () => {
            const response = await getUserOrders(auth.userId);
            return response?.data ?? [];
        },
        queryKey: ["UserOrders"],
    });

    const OrdersInfo: any[] = OrdersInfoResponse ?? [];
    const t = useTranslations("OrderPage");

    return (
        <section className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
                <h1 className="text-2xl p-3 md:text-3xl font-base md:mb-0">
                    {t("orders")}
                </h1>
            </div>
                <div className="grid grid-cols-1 gap-4 mt-5">
                    {isLoading ? (
                        <UserOrderSkeleton />
                    ) : isError ? (
                        <div role="alert" className="text-red-500">
                            {t("error_loading_orders")} 
                        </div>
                    ) : OrdersInfo.length === 0 ? (
                                <div className='items-center flex flex-col h-fit w-full'>
                                    <div className="w-full max-w-md">
                                        <Image src={addImage} layout="responsive" width={100} height={100} alt="No items in the Favorites" />
                                    </div>
                                    <h1 className='text-lg'>No items in the Orders.</h1>
                                </div>
                    ) : (
                        OrdersInfo.map((item: any) => (
                            <div key={item.id}>
                                <UserOrderInfo dir="ltr" orderInfo={item} />
                            </div>
                        ))
                    )}
                </div>
            </section>
    );
}
