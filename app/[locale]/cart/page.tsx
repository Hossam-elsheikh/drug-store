'use client'
import { instancePrivate } from "@/axios/instance";
import Container from "@/components/Container";
import CartItem from "@/components/ItemCard/CartItem";
import useAuth from "@/hooks/useAuth";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const Cart = () => {

  const axiosPrivate = useAxiosPrivate();
  const { auth }: any = useAuth()
  console.log(auth);

  // if (auth) {
  const getOrders = async () => {
    const response = await instancePrivate.get('/order', {
      withCredentials: true
    })
    return response
  }
  const { data: orders, error } = useQuery({
    queryKey: ['orders'],
    queryFn: getOrders,
    enabled: !!auth
  })
  console.log(orders);
  if (error) {
    console.error(error);
  }
  // }

  return (
    <div className="flex justify-center py-4 w-full items-center">
      <div className="w-full md:[85%] align-middle  p-5 grid grid-cols-1 lg:grid-cols-4 justify-center gap-4">
        <div className="flex flex-col gap-4 col-span-3">
          <h2 className="font-medium text-xl">My Cart Items</h2>
          <div className="flex flex-col gap-3 rounded-lg p-3 border">
          {orders && Array.isArray(orders.data) ? (
              orders.data.map((order: any) => ( 
                <div key={order.id}>
                  <CartItem orders={order} />
                </div>
              ))
            ) : (
              <p>No orders found</p>
            )}
          {/* </div> */}
          </div>
        </div>
        <div className="border w-full  rounded-lg flex flex-col p-3">
          <h2 className="font-medium text-xl">Checkout Summary</h2>
        </div>
      </div>
    </div>
  );
};

export default Cart;
