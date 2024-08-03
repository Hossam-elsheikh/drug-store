"use client";

import {
  calcCart,
  fetchCartItems,
} from "@/axios/instance";
import CartItem from "@/components/ItemCard/CartItem";
import OderSummaryInfo from "@/components/OderSummaryInfo/OderSummaryInfo";
import useCalcCartMutation from "@/hooks/calcCartMutation";
import removeItemMutation from "@/hooks/removeItemCartMutation";
import useAuth from "@/hooks/useAuth";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import React from "react";

const Cart = () => {

  const axiosPrivate = useAxiosPrivate();
  const { auth }: any = useAuth();

  const {
    data: cartItems,
    isLoading: isCartLoading,
    error: cartError,
  } = useQuery({
    queryFn: () => fetchCartItems(axiosPrivate, auth),
    queryKey: ["cartItems"],
  });

  const calculateCartMutation = useCalcCartMutation({axiosPrivate,auth})

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
      <div className="flex justify-center p-6 w-full items-center bg-[#f7f7fa]">
        <div className="w-full md:[85%]  align-middle  p-5 grid grid-cols-1 lg:grid-cols-4 justify-center gap-4">
          <div className="flex flex-col gap-4 col-span-3">
            {cartItems.data.length > 0 ?
              <>
                <div className="flex justify-between">
                  <h2 className="font-medium text-2xl">Cart <span className="text-sm text-[#7e859b]">({cartItems.data?.length})</span></h2>
                  {/* <p className="pr-8 pt-5">Price</p> */}
                </div>
              </>
              :
              <></>
            }
            <div className="flex flex-col gap-3">
              {cartItems.data.length > 0 ?
                cartItems.data.map((cartItem: any) =>
                  <div id={cartItem._id}>
                    <CartItem
                      cartItem={cartItem}
                      removeItemCartMutation={removeItemCartMutation}
                      calculateCartMutation={calculateCartMutation}
                    />
                  </div>
                )
                :
                <></>
              }
            </div>
          </div>

          {cartItems.data.length > 0 ?
            <div className="border border-[#dcdcdc]  rounded-lg flex flex-col px-4">
              <h2 className="font-medium text-xl py-4">Order Summary</h2>
              <div className="space-y-4">
                <div className="relative">
                  <input className=" w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:shadow-md" type="search" placeholder="add a Coupon" />
                  <Link href="/en/checkout" className="absolute top-0 m-0 right-0 p-3 flex items-center text-center text-white font-medium bg-[#5ac5e7] rounded-r-md hover:bg-[#198ab0] transition-all" >APPLY</Link>
                </div>
                <OderSummaryInfo
                  title='Subtotal'
                  price={totalPrice.data.cartTotalPrice}
                />
                <OderSummaryInfo
                  title='Coupon'
                  price={totalPrice.data.cartTotalPrice}
                />
                <OderSummaryInfo
                  title='Shipping Fee'
                  price={totalPrice.data.cartTotalPrice}
                />
                <hr className="border border-[#dcdcdc]" />
                <div className="font-semibold text-xl">
                  <OderSummaryInfo
                    title='Total'
                    price={totalPrice.data.cartTotalPrice}
                  />
                </div>
              </div>
              <Link href="/en/checkout" className=" p-4 text-center text-white font-medium my-4 bg-[#5ac5e7] rounded-md hover:bg-[#198ab0] transition-all" >CHECKOUT</Link>
            </div>
            :
            <></>
          }
        </div>
      </div>
      {cartItems.data.length <= 0 ?
        <div className="justify-center flex text-center bg-[#f7f7fa] ">
          <div className="space-y-5">
            <ShoppingCart className="mx-auto sm:h-[200px] sm:w-[200px]" />
            <p className="  font-semibold text-3xl px-3">Your Cart Is Empty</p>
            <p className="px-3">Add some Products to Your Cart</p>
            <button className="mx-auto border p-4  rounded-md text-white font-medium bg-[#5ac5e7] hover:bg-[#198ab0] transition-all">Return to Home</button>
          </div>
        </div>
        :
        <></>
      }
    </>
  );
};

export default Cart;