"use client";
import React from "react";
import Image from "next/image";
import addImage from "@/public/undraw_add_files_re_v09g.svg";
import { useTranslations } from "next-intl";
import UserOrderInfo, { UserOrderSkeleton } from "@/components/UserProfile/order/UserOrderInfo";
import { useQuery } from "@tanstack/react-query";
import { getUserOrders } from "@/axios/instance";
import useAuth from "@/hooks/useAuth";
<<<<<<< HEAD
import PaymentURL from "@/components/PaymentURL/PaymentURL";
=======
import { useLocale } from "@/context/LocaleProvider";
>>>>>>> 2d33c3364548665658db4ef333f0fcf69c89c9bd

export default function Orders() {
    const { auth }: any = useAuth();
    const {dir,locale} = useLocale()
    const {
        data,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryFn:  () =>getUserOrders(auth.userId),
        queryKey: ["UserOrders"],
    });

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
                    <>
                        <div className="flex flex-col items-center justify-center h-full text-center p-4">

                            <h2 className="text-2xl font-semibold mb-2"> {t("error_loading_orders")}</h2>




                        </div>
                    </>
                ) : data?.orders?.length === 0 ? (
                    <div className='items-center flex flex-col h-fit w-full'>
                        <div className="w-full max-w-md">
                            <Image src={addImage} layout="responsive" width={100} height={100} alt="No items in the Favorites" />
                        </div>
                        <h1 className='text-lg'>
                            {locale === 'en' ? "No items in the Orders." : "لا يوجد طلبات بعد!"}
                        </h1>
                    </div>
                ) : (
                    data?.orders?.map((item: any) => (
                        <div key={item.id}>
                            <UserOrderInfo dir={dir} orderInfo={item} />
                        </div>
                    ))
                )}
            </div>
            <PaymentURL />

        </section>
    );
}
