'use client'
import { calcCart, createOrder, executePayment, fetchCartItems, getUser } from "@/axios/instance";
import BreadCrumb from "@/components/Breadcrumb/BreadCrumb";
import AvailablePayment from "@/components/Checkout/AvailablePayment/AvailablePayment";
import CheckoutForm from "@/components/Checkout/CheckoutForm/CheckoutForm";
import Order from "@/components/Checkout/Order";
import RadioLabel from "@/components/Checkout/RadioLabel/RadioLabel";
import InputName from "@/components/Checkout/UserInfo/InputName";
import UserInfo from "@/components/Checkout/UserInfo/UserInfo";
import OderSummaryInfo from "@/components/OderSummaryInfo/OderSummaryInfo";
import CartItemsCheckout from "@/components/UserProfile/cartItems/CartItemsCheckout";
import CheckOutSummary from "@/components/UserProfile/cartItems/CheckOutSummary";
import UserProfileInfo from "@/components/UserProfile/userprofile/UserProfileInfo";
import useAuth from "@/hooks/useAuth";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Banknote, CreditCard, HandCoins, Store, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Checkout = () => {

    const axiosPrivate = useAxiosPrivate();
    const { auth }: any = useAuth()
    const [deliveryMethod, setDeliveryMethod] = useState('')
    const [shipmentMethod, setShipmentMethod] = useState('')
    const [paymentURL,setPaymentURL]=useState('')

    const {
        data: user,
        isLoading: userLoading,
        error: userError,
    } = useQuery({
        queryFn: () => getUser(auth.userId),
        queryKey: ['user'],
    })
    console.log(user);
    
    const {
        data: cartItems,
        isLoading: isCartLoading,
        error: cartError,
    } = useQuery({
        queryFn: () => fetchCartItems(axiosPrivate, auth),
        queryKey: ["cartItems"],
    });

    const {
        data: totalPrice,
        isLoading: isTotalPriceLoading,
        error: totalPriceError,
    } = useQuery({
        queryFn: () => calcCart({ axiosPrivate, auth }),
        queryKey: ['totalPrice'],
        enabled: !!cartItems,
    })

    const executePayMutation = useMutation({
        mutationFn: (values: any) => executePayment(values),
        onSuccess(data) {
            setPaymentURL(data.Data.PaymentURL)
        },
    })
    
    console.log(paymentURL);

    useEffect(() => {
        if (user && shipmentMethod === "paying-with-visa") {
            const payload = {
                InvoiceValue:totalPrice.data.cartTotalPrice,
                PaymentMethodId:1,
                CustomerName: user.name,
                CustomerEmail: user.email,
                MobileCountryCode: "+965",
                CustomerMobile: user.mobile,
                CallBackUrl: "http://localhost:3000/en",
                ErrorUrl: "http://localhost:3000/en/error",
                Language: "en",
                DisplayCurrencyIso: "KWD",
                InvoiceItem: cartItems.data,
                CustomerAddress: user.addresses,
            }
            executePayMutation.mutate(payload)
        }
    }, [shipmentMethod])

    const order = async () => await createOrder(axiosPrivate, auth, deliveryMethod, shipmentMethod)

    if (userLoading) return <h1>fetching user ...</h1>
    if (userError) return <h1>error while fetching user</h1>
    if (isCartLoading) return <p>cart items loading...</p>;
    if (cartError) return <h1>error while fetching cart</h1>
    if (isTotalPriceLoading) return <p>total price loading...</p>;
    if (totalPriceError) return <h1>error while fetching total price</h1>

    return (
        <div className="bg-gray-50 w-[80%] mx-auto flex flex-col min-h-dvh">
            {/* <BreadCrumb /> */}
            <div className="grid  xl:grid-cols-2 md:grid-cols-1  bg-white ">
                {/* <div className="max-w-[1500px] sm:px-2 py-4"> */}
                <div className="bg-white px-10 ">
                    {/* <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-8"> */}

                    {/* Cart Items and Summary */}
                    {/* <div className="lg:col-span-4 space-y-6">
                        <div className="bg-white rounded-lg shadow overflow-hidden">
                            <div className="p-3 space-y-4">
                                <CartItemsCheckout />
                            </div>
                        </div>
                    </div> */}

                    {auth.userId ?
                        (
                            <div className="pb-3">
                                <div className="flex justify-between ">
                                    <p className="font-medium text-xl pt-5 pb-3">Shipping Address</p>
                                    <Link href='/' className="text-[#4fb4d3] self-end pb-2">add new address</Link>
                                </div>
                                <UserInfo user={user} />
                            </div>
                        )
                        :
                        (
                            <>
                                <div className="">
                                    {/* <div className="lg:col-span-4"> */}
                                    <div className="overflow-hidden">
                                        {/* <div className="bg-white rounded-lg shadow overflow-hidden"> */}
                                        <div className="p-3">
                                            <h2 className="text-lg font-medium text-gray-900 mb-4">
                                                Shipping Info
                                            </h2>
                                            <CheckoutForm />
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}

                    <div className="">
                        <p className="text-xl pt-5 pb-3 font-medium">Your Order</p>
                        <div className="p-5 rounded-md border">
                            {cartItems.data.length > 0 ?
                                cartItems.data.map((cartItem: any) =>
                                    <div id={cartItem._id}>
                                        <Order cartItem={cartItem} />
                                    </div>
                                )
                                :
                                <>
                                    <p>Your cart is empty</p>
                                </>
                            }
                        </div>
                    </div>

                    <RadioLabel
                        setDeliveryMethod={setDeliveryMethod}
                        setShipmentMethod={setShipmentMethod}
                    />

                    <div>
                        <p className="font-medium text-xl pt-5 pb-3">Available Payments</p>
                        <AvailablePayment />
                    </div>

                    <div className="flex justify-center py-5">
                        <Link
                            href={`${paymentURL}`}
                            className="w-full p-4 text-center text-white font-medium bg-[#5ac5e7] rounded-md hover:bg-[#198ab0] transition-all"
                            onClick={order}
                        >
                            Pay Now
                        </Link>
                        {/* <Link href="/en/checkout" className=" p-4 text-center text-white font-medium my-4 bg-[#5ac5e7] rounded-md hover:bg-[#198ab0] transition-all" >PAYMENT</Link> */}
                    </div>

                </div>

                <div className=" h-full bg-[#ffffff]">
                    {/* <div className="lg:col-span-4"> */}
                    <div className=" rounded-md  overflow-hidden sticky top-28 self-start">
                        {/* <div className="bg-[#f5f5f5] rounded-lg shadow overflow-hidden"> */}
                        <div className="pt-5 px-10">
                            <h2 className="text-lg font-medium text-gray-900 mb-4">
                                Order Summary
                            </h2>
                            {/* <CheckOutSummary
                                subtotal={220}
                                shipping={50}
                                taxes={10}
                                promoCode={20}
                            /> */}
                            <div className="border border-[#dedede]  rounded-lg flex flex-col px-4">
                                {/* <h2 className="font-medium text-lg py-4">Order Summary</h2> */}
                                <div className="space-y-4 py-5">
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
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Checkout;
