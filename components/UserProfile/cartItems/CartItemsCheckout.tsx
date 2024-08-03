'use client'
import { getOrders } from '@/axios/instance'
import UserInfo from '@/components/Checkout/UserInfo/UserInfo'
import CartItem from '@/components/ItemCard/CartItem'
import useAuth from '@/hooks/useAuth'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

export default function CartItemsCheckout() {
    // const { orders }: any = useCart()
    // console.log(orders);

    const axiosPrivate = useAxiosPrivate()
    // getOrders(axiosPrivate)

    // // if (auth) {
    // const getOrders = async () => {
    //   const response = await instancePrivate.get('/order', {
    //     withCredentials: true
    //   })
    //   return response
    // }
    const { auth }: any = useAuth()
    const { data: orders, error } = useQuery({
        queryKey: ['orders'],
        queryFn:()=>getOrders(axiosPrivate)
        ,
        // enabled: !!auth
    })
    if (error) {
        console.error(error);
    }

    return (
        <>
            <div className='flex gap-1 items-center'>
                <h2 className="font-medium text-lg">1- Review Your Order :</h2>
                <span className='text-light'>(Items: 3)</span>
            </div>

            <div className='space-y-2'>
                {orders && Array.isArray(orders.data) ? (
                    orders.data.map((order: any) => (
                        <div key={order.id}>
                            <CartItem orders={order} />
                        </div>
                    ))
                ) : (
                    <p>No orders found</p>
                )}

            </div>
            <hr className='p-1' />
            <div className='flex justify-between p-2'>
                <h3 className='text-medium' >Subtotal </h3>
                <h3 className='text-medium'> 3.500 (KWT)</h3>
            </div>
            <UserInfo orders={orders}/>
        </>
    )
}

