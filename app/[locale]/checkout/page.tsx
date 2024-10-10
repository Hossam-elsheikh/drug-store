'use client'
import { applyCoupon, calcCart, createOrder, executePayment, fetchCartItems, getCoupon, getUser, setThePaymentURL, updateUser } from "@/axios/instance";
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
import { useTranslations } from "next-intl";

const Checkout = () => {

    const [deliveryMethod, setDeliveryMethod] = useState('')
    const [paymentMethod, setPaymentMethod] = useState('')
    const [payWithCash, setPayWithCash] = useState('')
    const [shippingAddress, setShippingAddress] = useState('')
    const [cartPrice, setCartPrice] = useState('')
    const [formErrors, setFormErrors] = useState('')
    const [paymentURL, setPaymentURL] = useState('')
    const [orderId, setOrderId] = useState('')

    const axiosPrivate = useAxiosPrivate();
    const { auth }: any = useAuth()
    const { locale, dir }: any = useLocale();
    const t = useTranslations("CheckOutPage")

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
        if (!deliveryMethod) errors.deliveryMethod = t("deliveryMethodRequired");
        if (!paymentMethod) errors.paymentMethod = t("paymentMethodRequired");
        if (!shippingAddress) errors.shippingAddress = t("shippingAddressRequired");
        return errors;
    };

    const {
        data: userInfo,
        isLoading: userInfoLoading,
        error: userInfoError,
    } = useQuery({
        queryFn: () => getUser(auth?.userId),
        queryKey: ['userInfo'],
        enabled: !!auth?.userId
    })

    const {
        data: cartItems,
        isLoading: isCartLoading,
        error: cartError,
    } = useQuery({
        queryFn: () => fetchCartItems(axiosPrivate, auth),
        queryKey: ["cartItems", auth?.userId],
        enabled: !!auth?.userId,
    });
    console.log(cartItems);

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
            setOrderId(data.data?.orderId)
            console.log(data.data.orderId);

            if (paymentMethod === "paying-with-visa") {
                const payload = {
                    InvoiceValue: cartPrice,
                    PaymentMethodId: 2,
                    CustomerName: userInfo.name,
                    CustomerEmail: userInfo.email,
                    MobileCountryCode: "+965",
                    CustomerMobile: userInfo.mobile,
                    CustomerReference: data.data?.orderId,
                    CallBackUrl: `${process.env.NEXT_PUBLIC_CLIENT_SIDE}/${locale}/successfullorder`,
                    ErrorUrl: `${process.env.NEXT_PUBLIC_CLIENT_SIDE}/${locale}/error`,
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

    const setPaymentURLMutation = useMutation({
        mutationFn: (paymentURL) => setThePaymentURL({ axiosPrivate, orderId, paymentURL }),
        onSuccess(data) {
            console.log(data);
        },
        onError(error) {
            console.error(error);
        },
    })

    const executePayMutation = useMutation({
        mutationFn: (values: any) => executePayment(values),
        onSuccess(data) {
            setPaymentURL(data?.Data.PaymentURL)
            setPaymentURLMutation.mutate(data?.Data.PaymentURL)
        },
        onError: (error) => {
            console.error('Payment execution failed', error);
        }
    })
    const applyCouponMutation = useMutation({
        mutationFn: () => applyCoupon(axiosPrivate, auth.userId, couponFormik.values.couponCode, totalPrice.data.cartTotalPrice),
        onSuccess(data) {
            if (data.finalPrice) {
                setCartPrice(data.finalPrice)
            }

        },
        onError(error) {
            console.error(error);
            console.error(error.message);
        },
    })

    const applyCouponEvent = () => applyCouponMutation.mutate()

    const handleCouponSubmit = (event: any) => {
        event.preventDefault()
    }

    useEffect(() => {
        if (isSuccessTotalPrice === true && !applyCouponMutation?.data?.finalPrice) {
            setCartPrice(totalPrice?.data?.cartTotalPrice)
        }
    }, [totalPrice?.data?.cartTotalPrice])

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
                <p className="font-bold">{t("error")}</p>
                <p>{t("userInfoError")}</p>
            </div>
        </div>
    );

    if (cartError) return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
                <p className="font-bold">{t("error")}</p>
                <p>{t("cartError")}</p>
            </div>
        </div>
    );


    if (totalPriceError) return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
                <p className="font-bold">{t("error")}</p>
                <p>{t("totalError")}</p>
            </div>
        </div>
    );

    return (
        <div className="mx-0 md:mx-20">
            {(userInfo?.cart.length <= 0 || !auth?.userId && localCartSelector.localCartProducts.length <= 0) &&
                <>
                    <div className="justify-center flex text-center py-52 ">
                        <div className="space-y-10">
                            <p className="  font-semibold text-xl px-3">{t("emptyCartDescription")}</p>
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
                                    <p className="text-2xl font-bold text-gray-800 p-2 ">{t("sign")}</p>
                                    <AuthForm Type="sign-up" variant='checkout' />
                                </div>
                            }

                            <h2 className="text-2xl font-bold text-gray-800 p-2 pt-5">{t("YourOrder")}</h2>
                            <div className="p-3 rounded-md border space-y-3 shadow-sm">
                                {cartProducts.length > 0 ?
                                    cartProducts.map((cartItem: any) =>
                                        <Order key={cartItem._id} cartItem={cartItem} id={cartItem._id} />
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
                                        totalPrice={cartPrice || localCartSelector.localCartTotal}
                                    />
                                </div>

                                <div className=" justify-center py-5">
                                    <button
                                        className={`
                                    flex justify-center gap-2  w-full p-4 text-center text-white font-medium bg-primaryColor 
                                    rounded-full  hover:bg-[#45486e] transition-all 
                                    ${Object.keys(validateFields()).length > 0 || executePayMutation.isPending !== false ? 'disabled:bg-gray-300' : null}
                                    ${executePayMutation.isSuccess === true || payWithCash === 'cash-on-delivery' ? 'disabled:bg-green-400' : null}`
                                        }
                                        type="submit"
                                        disabled={executePayMutation.isPending !== false || executePayMutation.isSuccess === true || payWithCash === 'cash-on-delivery' || !auth?.userId || cartProducts.some((item: any) => item.productId.stock === 0)}
                                    >
                                        {executePayMutation.isPending ? (
                                            <p>{t("processing")}</p>
                                        ) : (executePayMutation.isSuccess || payWithCash === 'cash-on-delivery') ? (
                                            (() => {
                                                if (payWithCash === 'cash-on-delivery') {
                                                    if (createOrderMutation.isSuccess) {
                                                        window.location.href = `${process.env.NEXT_PUBLIC_CLIENT_SIDE}/${locale}/successfullorder?orderId=${orderId}`;
                                                    } else if (createOrderMutation.isError) {
                                                        window.location.href = `${process.env.NEXT_PUBLIC_CLIENT_SIDE}/${locale}/error`;
                                                    }
                                                } else if (executePayMutation.isSuccess) {
                                                    window.location.href = paymentURL;
                                                }
                                                return (
                                                    <p className="flex justify-center gap-2">{t("Redirecting")} <Loader className="animate-spin" /></p>
                                                );
                                            })()
                                        ) : (
                                            <>
                                                {paymentMethod === 'cash-on-delivery' ? <p>{t("OrderNow")}</p> : <p>{t("PayNow")}</p>}
                                            </>
                                        )}
                                        {executePayMutation.isPending !== false ? <Loader className="animate-spin" /> : null}
                                    </button>
                                    <p className="py-2">{executePayMutation.isError ? <p className="text-[#ef4444] text-center">{t("ErrorHappened")}</p> : null}</p>
                                    <div className="py-2">
                                        {!executePayMutation.isError && Object.values(formErrors).some((i) => i) && (
                                            <p className="text-[#ef4444] text-center">
                                                {t("everyOption")}
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
        </div>

    );
};

export default Checkout;