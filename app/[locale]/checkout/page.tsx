'use client'
import { applyCoupon, calcCart, createOrder, executePayment, fetchCartItems, getCoupon, getUser, updateUser } from "@/axios/instance";
import BreadCrumb from "@/components/Breadcrumb/BreadCrumb";
import AvailablePayment from "@/components/Checkout/AvailablePayment/AvailablePayment";
import CheckoutForm from "@/components/Checkout/CheckoutForm/CheckoutForm";
import Order from "@/components/Checkout/Order";
import RadioLabel from "@/components/Checkout/RadioLabel/RadioLabel";
import UserInfo from "@/components/Checkout/UserInfo/UserInfo";
import CustomInput from "@/components/Form/CustomInput";
import OderSummaryInfo from "@/components/OderSummaryInfo/OderSummaryInfo";
import useAuth from "@/hooks/useAuth";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import React, { use, useEffect, useRef, useState } from "react";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Loader, X } from "lucide-react";
import AddNewAddress from "@/components/Checkout/newAddressForm/AddNewAddress";
import OrderSummary from "@/components/Checkout/OrderSummary";
import { useRouter } from "next/router";
import AddNewAndEditAddresses from "@/components/Checkout/newAddressForm/AddNewAndEditAddresses";

const Checkout = () => {

    const [deliveryMethod, setDeliveryMethod] = useState('')
    const [paymentMethod, setPaymentMethod] = useState('')
    const [payWithCash, setPayWithCash] = useState('')
    const [paymentURL, setPaymentURL] = useState('')
    const [shippingAddress, setShippingAddress] = useState('')
    const [cartPrice, setCartPrice] = useState('')
    const [formErrors, setFormErrors] = useState('')

    console.log(cartPrice);

    const axiosPrivate = useAxiosPrivate();
    const { auth }: any = useAuth()

    const validationSchema = Yup.object({
        city: Yup.string().required('City is required'),
        state: Yup.string().required('State is required'),
        street: Yup.string().required('Street is required'),
    });

    const formik = useFormik(
        {
            initialValues: {
                city: '',
                state: '',
                street: ''
            },
            validationSchema: validationSchema,
            onSubmit: async (values,) => {
                handleFormAddressSubmit(values);
            },
        },
    );
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
        data: user,
        isLoading: userLoading,
        error: userError,
    } = useQuery({
        queryFn: () => getUser(auth.userId),
        queryKey: ['user'],
    })

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
        isSuccess: isSuccessTotalPrice,
    } = useQuery({
        queryFn: () => calcCart({ axiosPrivate, auth }),
        queryKey: ['totalPrice'],
        enabled: !!cartItems,
    })

    const executePayMutation = useMutation({
        mutationFn: (values: any) => executePayment(values),
        // onSuccess(data) {
        //     setPaymentURL(data.Data.PaymentURL)
        // },
    })
    const applyCouponMutation = useMutation({
        mutationFn: () => applyCoupon(axiosPrivate, auth.userId, couponFormik.values.couponCode, totalPrice.data.cartTotalPrice),
        // onSuccess: (data) => setCartPrice(data.data.finalPrice)
    })
    const applyCouponEvent = () => applyCouponMutation.mutate()
    // console.log(applyCouponMutation);


    const handleCouponSubmit = (event: any) => {
        event.preventDefault()
    }

    useEffect(() => {
        if (isSuccessTotalPrice === true && applyCouponMutation.isSuccess === false) {
            setCartPrice(totalPrice.data.cartTotalPrice)
        }
    }, [])

    useEffect(() => {
        if (applyCouponMutation?.data?.data.finalPrice) {
            setCartPrice(applyCouponMutation?.data?.data.finalPrice)
        }
    }, [])
    console.log(applyCouponMutation?.data?.data?.finalPrice);


    const order = async () => {
        if (user && paymentMethod === "paying-with-visa") {
            const payload = {
                InvoiceValue: cartPrice,
                PaymentMethodId: 2,
                CustomerName: user.name,
                CustomerEmail: user.email,
                MobileCountryCode: "+965",
                CustomerMobile: user.mobile,
                CallBackUrl: "http://localhost:3000/en",
                ErrorUrl: "http://localhost:3000/en/error",
                Language: "en",
                DisplayCurrencyIso: "KWD",
                InvoiceItem: cartItems.data,
                // CustomerAddress: user.addresses,
            }
            try {
                executePayMutation.mutate(payload, {
                    onSuccess: async () => {
                        setPaymentURL(executePayMutation.data.Data.PaymentURL)
                        await createOrder(axiosPrivate, auth, deliveryMethod, paymentMethod, shippingAddress);
                        if (executePayMutation?.data?.Data && executePayMutation?.data?.Data.PaymentURL) {
                            window.location.href = executePayMutation.data.Data.PaymentURL;
                        }
                    },
                    onError: (error) => {
                        console.error('Payment execution failed', error);
                    }
                })
            } catch (error) {
                console.error('Payment failed, please try again.', error);
            }
        }
        if (paymentMethod === 'cash-on-delivery') {
            try {
                await createOrder(axiosPrivate, auth, deliveryMethod, paymentMethod, shippingAddress)
                setPayWithCash('cash-on-delivery')
            } catch (error) {
                console.error('Payment failed, please try again.', error);
            }
        }
    }

    const userId = auth.userId
    const queryClient = useQueryClient()
    const addUserAddressMutation = useMutation({
        mutationFn: () => updateUser({
            userId,
            data: {
                newAddress: {
                    city: formik.values.city,
                    state: formik.values.state,
                    street: formik.values.street
                }
            }
        }),
        onSuccess: () => {
            queryClient.invalidateQueries()
            formik.resetForm()
        },
        onSettled: () => {
            setTimeout(() => {
                addUserAddressMutation.reset()
            }, 8000)
        },
        onError(error) {
            console.log(error);
        },
    })
    function handleFormAddressSubmit(event: any) {
        event.preventDefault()
        addUserAddressMutation.mutate()
    }
    const handleCheckoutSubmit = async (event: any) => {
        event.preventDefault();
        const errors = validateFields();
        setFormErrors(errors)
        if (Object.keys(errors).length === 0) {
            order();
        }
    };

    if (userLoading) return <h1>fetching user ...</h1>
    if (userError) return <h1>error while fetching user</h1>
    if (isCartLoading) return <p>cart items loading...</p>;
    if (cartError) return <h1>error while fetching cart</h1>
    if (isTotalPriceLoading) return <p>total price loading...</p>;
    if (totalPriceError) return <h1>error while fetching total price</h1>

    return (
        <>
            {user.cart.length === 0 ?
                <>
                    <div className="justify-center flex text-center py-52 ">
                        <div className="space-y-10">
                            <p className="  font-semibold text-xl px-3">Your Cart is Empty, Add some Products First</p>
                            <p className="px-3"></p>
                            <Link href={'/'} className="mx-auto border p-4  rounded-md text-white font-medium bg-[#282a3f] hover:bg-[#5d6195] transition-all">Return to Home</Link>
                        </div>
                    </div>
                </>

                :

                <div className="bg-gray-50 w-[80%] mx-auto flex flex-col min-h-dvh">
                    {/* <BreadCrumb /> */}
                    <div className="grid  xl:grid-cols-2 md:grid-cols-1  bg-white ">

                        <form onSubmit={handleCheckoutSubmit}>

                            <div className="bg-white px-10 ">

                                {auth.userId ?
                                    (
                                        <div className="pb-3">
                                            <div className="flex justify-between ">
                                                <p className="font-medium text-xl pt-5 pb-3">Shipping Address</p>

                                                <div className="self-end">
                                                    <AddNewAndEditAddresses
                                                        mode="edit"

                                                    />
                                                </div>
                                            </div>

                                            <UserInfo
                                                user={user}
                                                shippingAddress={shippingAddress}
                                                setShippingAddress={setShippingAddress}
                                                formErrors={formErrors}
                                                setFormErrors={setFormErrors}
                                            />

                                        </div>
                                    )
                                    :
                                    (
                                        <>
                                            <div className="">
                                                <div className="overflow-hidden">
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
                                    setPaymentMethod={setPaymentMethod}
                                    deliveryMethod={deliveryMethod}
                                    paymentMethod={paymentMethod}
                                    formErrors={formErrors}
                                    setFormErrors={setFormErrors}
                                />

                                {/* {shipmentMethod === "paying-with-visa" ?
                        <>
                            <p className="font-medium text-xl pt-5 pb-3">Payment Method</p>
                            <AvailablePayment setPaymentMethodId={setPaymentMethodId}/>
                        </>
                        :
                        null
                    } */}

                                <div className=" justify-center py-5">
                                    <button
                                        className={`
                                    flex justify-center gap-2  w-full p-4 text-center text-white font-medium bg-[#282a3f] 
                                    rounded-full hover:bg-[#5d6195] transition-all 
                                    ${Object.keys(validateFields()).length > 0 || executePayMutation.isPending !== false ? 'disabled:bg-gray-200' : null}
                                    ${executePayMutation.isSuccess === true || payWithCash === 'cash-on-delivery' ? 'disabled:bg-green-400' : null}`
                                        }
                                        type="submit"
                                        disabled={executePayMutation.isPending !== false || executePayMutation.isSuccess === true || payWithCash === 'cash-on-delivery'}
                                    // disabled={Object.keys(validateFields()).length > 0 || executePayMutation.isPending !== false || executePayMutation.isSuccess === true || payWithCash === 'cash-on-delivery'}
                                    >
                                        {executePayMutation.isPending ? (
                                            <p>Processing</p>
                                        ) : executePayMutation.isSuccess || payWithCash === 'cash-on-delivery' ? (
                                            (window.location.href = payWithCash === 'cash-on-delivery' ? 'http://localhost:3000/en' : executePayMutation.isSuccess ? paymentURL : ''),
                                            <p className="flex justify-center gap-2">Redirecting <Loader className="animate-spin" /></p>
                                        ) : (
                                            <p>Pay Now</p>
                                        )}
                                        {executePayMutation.isPending !== false ? <Loader className="animate-spin" /> : null}
                                    </button>
                                    <p className="py-2">{executePayMutation.isError ? <p className="text-red-400 text-center">Error, please try again.</p> : null}</p>
                                    {/* <div className="py-2">
                                        {executePayMutation.isError && (
                                            <p className="text-red-400 text-center">Error, please try again.</p>
                                        )}
                                        {!executePayMutation.isError && formErrors && (
                                            <p className="text-red-400 text-center">
                                                Please make sure you have chosen all the options above.
                                            </p>
                                        )}
                                    </div> */}
                                </div>

                            </div>
                        </form>


                        <div className=" h-full bg-[#ffffff]">
                            <div className=" rounded-md  overflow-hidden sticky top-28 self-start">
                                <div className="pt-5 px-10">
                                    <h2 className="text-lg font-medium text-gray-900 mb-4">
                                        Order Summary
                                    </h2>

                                    <OrderSummary
                                        couponFormik={couponFormik}
                                        applyCouponMutation={applyCouponMutation}
                                        applyCouponEvent={applyCouponEvent}
                                        totalPrice={totalPrice}
                                    />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            }
        </>

    );
};

export default Checkout;