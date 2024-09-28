'use client'
import { applyCoupon, calcCart, createOrder, executePayment, fetchCartItems, getCoupon, getUser, updateUser } from "@/axios/instance";
import BreadCrumb from "@/components/Breadcrumb/BreadCrumb";
import CheckoutForm from "@/components/Checkout/CheckoutForm/CheckoutForm";
import Order from "@/components/Checkout/Order";
import RadioLabel from "@/components/Checkout/RadioLabel/RadioLabel";
import UserInfo from "@/components/Checkout/UserInfo/UserInfo";
import useAuth from "@/hooks/useAuth";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import React, { use, useEffect, useRef, useState } from "react";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Loader, X } from "lucide-react";

import OrderSummary from "@/components/Checkout/OrderSummary";
import { useUser } from "@/context/UserProvider";
import EmptyCart from "@/components/Cart/EmptyCart";
import Loading from "@/app/loading";
import { useLocale } from "@/context/LocaleProvider";
import { useLocalCart } from "@/hooks/useLocalCart";
import AuthForm from "@/components/Form/AuthForm";

const Checkout = () => {

    const [deliveryMethod, setDeliveryMethod] = useState('')
    const [paymentMethod, setPaymentMethod] = useState('')
    const [payWithCash, setPayWithCash] = useState('')
    const [paymentURL, setPaymentURL] = useState('')
    const [shippingAddress, setShippingAddress] = useState('')
    const [cartPrice, setCartPrice] = useState('')
    const [formErrors, setFormErrors] = useState('')

    const axiosPrivate = useAxiosPrivate();
    const { auth }: any = useAuth()
    const { locale }: any = useLocale();

    const couponFormik = useFormik(
        {
            initialValues: {
                couponCode: '',
            },
            onSubmit: async (values,) => {
                handleCouponSubmit(values);
            },
        },
    );

    const validateFields = () => {
        const errors: any = {};
        if (!deliveryMethod) errors.deliveryMethod = 'Delivery method is required';
        if (!paymentMethod) errors.paymentMethod = 'Payment method is required';
        if (!shippingAddress) errors.shippingAddress = 'Shipping Address is required';
        return errors;
    };

    const {
        data: userInfo,
        isLoading: userInfoLoading,
        error: userInfoError,
    } = useQuery({
        queryFn: () => getUser(auth.userId),
        queryKey: ['userInfo'],
        enabled: !!auth.userId
    })

    const {
        data: cartItems,
        isLoading: isCartLoading,
        error: cartError,
    } = useQuery({
        queryFn: () => fetchCartItems(axiosPrivate, auth),
        queryKey: ["cartItems", auth.userId],
        enabled: !!auth.userId,
    });
    //calling redux state to see if there a local cart items
    const { localCartSelector } = useLocalCart()

    const cartProducts = auth?.userId ? cartItems?.data : localCartSelector.localCartProducts;

    const {
        data: totalPrice,
        isLoading: isTotalPriceLoading,
        error: totalPriceError,
        isSuccess: isSuccessTotalPrice,
    } = useQuery({
        queryFn: () => calcCart({ axiosPrivate, auth }),
        queryKey: ['totalPrice'],
        enabled: !!cartItems,
    })

    const createOrderMutation = useMutation({
        mutationFn: () => createOrder(axiosPrivate, auth, deliveryMethod, paymentMethod, shippingAddress),
        onSuccess(data) {
            if (paymentMethod === "paying-with-visa") {
                const payload = {
                    InvoiceValue: cartPrice,
                    PaymentMethodId: 2,
                    CustomerName: userInfo.name,
                    CustomerEmail: userInfo.email,
                    MobileCountryCode: "+965",
                    CustomerMobile: userInfo.mobile,
                    CustomerReference: data.orderId,
                    CallBackUrl: `http://localhost:3000/${locale}/successfullorder`,
                    ErrorUrl: `http://localhost:3000/${locale}/error`,
                    Language: locale,
                    DisplayCurrencyIso: "KWD",
                    // InvoiceItem: cartItems?.data,
                    // CustomerAddress: user.addresses,
                }
                executePayMutation.mutate(payload)
            }
        },
        onError(error) {
            console.error('Order creation failed:', error);
        }
    })

    const executePayMutation = useMutation({
        mutationFn: (values: any) => executePayment(values),
        onSuccess: async (data) => {
            setPaymentURL(data?.Data.PaymentURL)
        },
        onError: (error) => {
            console.error('Payment execution failed', error);
        }
    })
    const applyCouponMutation = useMutation({
        mutationFn: () => applyCoupon(axiosPrivate, auth.userId, couponFormik.values.couponCode, totalPrice.data.cartTotalPrice),
        onSuccess: (data) => setCartPrice(data.data.finalPrice)
    })
    const applyCouponEvent = () => applyCouponMutation.mutate()

    const handleCouponSubmit = (event: any) => {
        event.preventDefault()
    }

    useEffect(() => {
        if (isSuccessTotalPrice === true && applyCouponMutation.isSuccess === false) {
            setCartPrice(totalPrice?.data?.cartTotalPrice)
        }
    }, [totalPrice?.data?.cartTotalPrice])

    useEffect(() => {
        if (applyCouponMutation.isSuccess === true && applyCouponMutation?.data?.data.finalPrice) {
            setCartPrice(applyCouponMutation?.data?.data.finalPrice)
        }
    }, [applyCouponMutation?.data?.data?.finalPrice])

    const order = async () => {
        if (userInfo) {
            if (paymentMethod === "paying-with-visa") {
                createOrderMutation.mutate()
            }
            if (paymentMethod === 'cash-on-delivery') {
                try {
                    createOrderMutation.mutate()
                    setPayWithCash('cash-on-delivery')
                } catch (error) {
                    console.error('order failed, please try again.', error);
                }
            }
        }
    }

    const handleCheckoutSubmit = async (event: any) => {
        event.preventDefault();
        const errors = validateFields();
        setFormErrors(errors)
        if (Object.keys(errors).length === 0) {
            order();
        }
    };

    if (userInfoLoading || isCartLoading || isTotalPriceLoading) return <Loading />

    if (userInfoError) return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
                <p className="font-bold">Error</p>
                <p>An error occurred while fetching user data. Please try again later.</p>
            </div>
        </div>
    );

    if (cartError) return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
                <p className="font-bold">Error</p>
                <p>An error occurred while fetching cart data. Please try again later.</p>
            </div>
        </div>
    );


    if (totalPriceError) return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
                <p className="font-bold">Error</p>
                <p>An error occurred while fetching total price. Please try again later.</p>
            </div>
        </div>
    );

    return (
        <>
            {(userInfo?.cart.length <= 0 || !auth?.userId && localCartSelector.localCartProducts.length <= 0) &&
                <>
                    <div className="justify-center flex text-center py-52 ">
                        <div className="space-y-10">
                            <p className="  font-semibold text-xl px-3">Your Cart is Empty, Add some Products First</p>
                            <p className="px-3"></p>
                            <Link href={'/'} className="mx-auto border p-4  rounded-md text-white font-medium bg-primaryColor hover:bg-[#45486e]transition-all">Return to Home</Link>
                        </div>
                    </div>
                </>
            }


            {(userInfo?.cart.length >= 1 || !auth?.userId && localCartSelector.localCartProducts.length >= 1) &&

                <div className="bg-gray-50 w-full mx-auto flex flex-col min-h-dvh">
                    <div className="grid  xl:grid-cols-2 md:grid-cols-1  bg-white ">
                        <div className="bg-white px-10 ">
                            {auth?.userId ?
                                <UserInfo
                                    shippingAddress={shippingAddress}
                                    setShippingAddress={setShippingAddress}
                                    formErrors={formErrors}
                                    setFormErrors={setFormErrors}
                                />
                                :
                                <div className="w-full pt-6">
                                    <p className="text-2xl font-bold text-gray-800 p-2 ">Please Sign first</p>
                                    <AuthForm Type="sign-up" variant='checkout' />
                                </div>
                            }

                            <h2 className="text-2xl font-bold text-gray-800 p-2 pt-5">Your Order</h2>
                            <div className="p-3 rounded-md border space-y-3 shadow-sm">
                                {cartProducts.length > 0 ?
                                    cartProducts.map((cartItem: any) =>
                                        <Order cartItem={cartItem} id={cartItem._id} />
                                    )
                                    :
                                    <>
                                        <EmptyCart />
                                    </>
                                }
                            </div>

                            <form onSubmit={handleCheckoutSubmit}>
                                <RadioLabel
                                    setDeliveryMethod={setDeliveryMethod}
                                    setPaymentMethod={setPaymentMethod}
                                    deliveryMethod={deliveryMethod}
                                    paymentMethod={paymentMethod}
                                    formErrors={formErrors}
                                    setFormErrors={setFormErrors}
                                />

                                <div className="block xl:hidden sm:mt-10 ">
                                    <OrderSummary
                                        couponFormik={couponFormik}
                                        applyCouponMutation={applyCouponMutation}
                                        applyCouponEvent={applyCouponEvent}
                                        totalPrice={totalPrice || localCartSelector.localCartTotal}
                                    />
                                </div>

                                <div className=" justify-center py-5">
                                    <button
                                        className={`
                                    flex justify-center gap-2  w-full p-4 text-center text-white font-medium bg-primaryColor 
                                    rounded-lg  hover:bg-[#45486e] transition-all 
                                    ${Object.keys(validateFields()).length > 0 || executePayMutation.isPending !== false ? 'disabled:bg-gray-300' : null}
                                    ${executePayMutation.isSuccess === true || payWithCash === 'cash-on-delivery' ? 'disabled:bg-green-400' : null}`
                                        }
                                        type="submit"
                                        disabled={executePayMutation.isPending !== false || executePayMutation.isSuccess === true || payWithCash === 'cash-on-delivery' || !auth?.userId}
                                    >
                                        {executePayMutation.isPending ? (
                                            <p>Processing</p>
                                            ) : executePayMutation.isSuccess || payWithCash === 'cash-on-delivery' ? (
                                                (window.location.href = payWithCash === 'cash-on-delivery' ? `http://localhost:3000/${locale}/successfullorder`
                                                    : executePayMutation.isSuccess ? paymentURL : ''),
                                                <p className="flex justify-center gap-2">Redirecting <Loader className="animate-spin" /></p>
                                        ) :
                                            <>
                                                {paymentMethod === 'cash-on-delivery' ? <p>Order Now</p> : <p>Pay Now</p>}
                                            </>
                                        }
                                        {executePayMutation.isPending !== false ? <Loader className="animate-spin" /> : null}
                                    </button>
                                    <p className="py-2">{executePayMutation.isError ? <p className="text-red-400 text-center">Error, please try again.</p> : null}</p>
                                    <div className="py-2">
                                        {!executePayMutation.isError && Object.values(formErrors).some((i) => i) && (
                                            <p className="text-red-400 text-center">
                                                Please make sure you have chosen all the options above.
                                            </p>
                                        )
                                        }
                                    </div>
                                </div>

                            </form>
                        </div>


                        <div className="hidden xl:block h-full bg-[#ffffff]">
                            <OrderSummary
                                couponFormik={couponFormik}
                                applyCouponMutation={applyCouponMutation}
                                applyCouponEvent={applyCouponEvent}
                                totalPrice={totalPrice || localCartSelector.localCartTotal}
                            />
                        </div>

                    </div>
                </div >
            }
        </>

    );
};

export default Checkout;