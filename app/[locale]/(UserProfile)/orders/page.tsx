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
        <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
                <h1 className="text-2xl p-3 md:text-3xl font-base md:mb-0">
                    {t("orders")}
                </h1>
            </div>
            <div>
                <div className="grid grid-cols-1 gap-4">
                    {isLoading ? (
                        <UserOrderSkeleton />
                    ) : isError ? (
                        <div role="alert" className="text-red-500">
                            {t("error_loading_orders")} 
                        </div>
                    ) : OrdersInfo.length === 0 ? (
                        <div>
                            <Image src={addImage} width={200} height={200} alt="Add Image" />
                        </div>
                    ) : (
                        OrdersInfo.map((item: any) => (
                            <div key={item.id}>
                                <UserOrderInfo dir="ltr" orderInfo={item} />
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
