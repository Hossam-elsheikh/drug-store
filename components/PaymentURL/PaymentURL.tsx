'use client'
import React, { useEffect, useState } from 'react'
import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import useAuth from '@/hooks/useAuth';
import { getUserAllOrders } from '@/axios/instance';
import Link from 'next/link';

function PaymentURL() {

    const axiosPrivate = useAxiosPrivate();
    const { auth }: any = useAuth();

    const {
        data: orders,
        isLoading: ordersLoading,
        error: ordersError,

    } = useQuery({
        queryFn: () => getUserAllOrders({ axiosPrivate, userId: auth.userId }),
        queryKey: ['orders'],
        enabled: !!auth.userId
    });

    if (ordersLoading) return <p>loading...</p>;

    return (
        <>
            {orders?.map((order: any) => (
                order.paymentStatus === "Pending" && order.paymentMethod === "paying-with-visa" && (
                    <div key={order._id}>
                        <p>Order ID: {order._id}</p>
                        <p>Order Price: {order.orderPrice}</p>
                        <a href={order.paymentURL}>
                            <button className="btn">Complete Your Order</button>
                        </a>
                    </div>
                )
            ))}
        </>
    );
}

export default PaymentURL;