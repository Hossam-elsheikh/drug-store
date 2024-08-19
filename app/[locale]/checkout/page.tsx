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
import React, { use, useEffect, useState } from "react";
import { useFormik } from 'formik';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import LabelName from "@/components/Checkout/newAddressForm/LabelName";
import Input from "@/components/Checkout/newAddressForm/Input";
import * as Yup from 'yup';
import { DialogClose } from "@radix-ui/react-dialog";
import { Loader, X } from "lucide-react";
import { RadioGroup, RadioButton } from 'react-radio-buttons';

const Checkout = () => {

    const [deliveryMethod, setDeliveryMethod] = useState('')
    const [shipmentMethod, setShipmentMethod] = useState('')
    // const [paymentMethodId, setPaymentMethodId] = useState(Number)
    // console.log(paymentMethodId);
    const [paymentURL, setPaymentURL] = useState('')
    const [shippingAddress, setShippingAddress] = useState('')
    const [cartPrice, setCartPrice] = useState('')
    // console.log(cartPrice);

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
            validationSchema: validationSchema,
            onSubmit: async (values,) => {
                handleCouponSubmit(values);
            },
        },
    );
    const CheckoutFormik = useFormik(
        {
            initialValues: {
                deliveryMethod,
                shipmentMethod,
                shippingAddress,
            },
            validationSchema: Yup.object({
                deliveryMethod: Yup.string().required('delivery method is required'),
                shipmentMethod: Yup.string().required('Payment method is required'),
                shippingAddress: Yup.string().required('Shipping Address is required'),
            }),
            onSubmit: async (values,) => {
                handleCheckoutSubmit(values);
            },
        },
    );

    const validateFields = () => {
        const errors: any = {};
        if (!deliveryMethod) errors.deliveryMethod = 'Delivery method is required';
        if (!shipmentMethod) errors.shipmentMethod = 'Payment method is required';
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
    // console.log(isSuccessTotalPrice);


    const executePayMutation = useMutation({
        mutationFn: (values: any) => executePayment(values),
        onSuccess(data) {
            setPaymentURL(data.Data.PaymentURL)
        },
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
            setCartPrice(totalPrice.data.cartTotalPrice)
        }
    }, [totalPrice])
    // console.log(totalPrice.data.cartTotalPrice);
    // console.log(typeof(totalPrice.data.cartTotalPrice));

    useEffect(() => {
        if (applyCouponMutation?.data?.data.finalPrice) {
            setCartPrice(applyCouponMutation?.data?.data.finalPrice)
        }
    }, [applyCouponMutation?.data?.data.finalPrice])
    // console.log(applyCouponMutation?.data?.data.finalPrice);
    // console.log(typeof (applyCouponMutation?.data?.data.finalPrice));

    const order = async () => {
        if (!cartPrice) {
            console.error("Cart price is not set!");
            return;
        }
        if (user && shipmentMethod === "paying-with-visa") {
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
                CustomerAddress: user.addresses,
            }
            try {
                await createOrder(axiosPrivate, auth, deliveryMethod, shipmentMethod, shippingAddress)
                executePayMutation.mutate(payload)
            } catch (error) {
                console.error(error);
            }
        } else {
            console.error("User or shipment method missing");
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
        <div className="bg-gray-50 w-[80%] mx-auto flex flex-col min-h-dvh">
            {/* <BreadCrumb /> */}
            <div className="grid  xl:grid-cols-2 md:grid-cols-1  bg-white ">
                {/* <div className="max-w-[1500px] sm:px-2 py-4"> */}

                <form onSubmit={handleFormAddressSubmit}>

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


                                        <div className="self-end">
                                            <Dialog >
                                                <DialogTrigger asChild>
                                                    <button className="text-[#4fb4d3]">Add New Address</button>
                                                </DialogTrigger>
                                                <DialogContent className="sm:max-w-[425px]">
                                                    <DialogHeader >
                                                        <div className="flex justify-between">
                                                            <DialogTitle>Add New Address</DialogTitle>
                                                            <DialogClose><X /></DialogClose>
                                                        </div>
                                                    </DialogHeader>
                                                    <form className="grid gap-4" onSubmit={handleFormAddressSubmit}>

                                                        <div className="flex items-center ">
                                                            <LabelName
                                                                labelName='State'
                                                            />
                                                            <Input
                                                                formikValue={formik.values.state}
                                                                handleChange={formik.handleChange}
                                                                placeholder="enter state"
                                                                name="state"
                                                                formik={formik}
                                                            />
                                                        </div>

                                                        <div className="flex items-center  ">
                                                            <LabelName
                                                                labelName='City'
                                                            />
                                                            <Input
                                                                formikValue={formik.values.city}
                                                                handleChange={formik.handleChange}
                                                                placeholder="enter city name"
                                                                name="city"
                                                                formik={formik}
                                                            />
                                                        </div>

                                                        <div className="flex items-center">
                                                            <LabelName
                                                                labelName='Street'
                                                            />
                                                            <Input
                                                                formikValue={formik.values.street}
                                                                handleChange={formik.handleChange}
                                                                placeholder="enter street"
                                                                name="street"
                                                                formik={formik}
                                                            />
                                                        </div>

                                                        <button
                                                            className={`flex justify-center gap-3 p-3 text-center text-white font-medium 
                                                        ${Object.keys(formik.errors).length > 0 || addUserAddressMutation.isPending !== false ? 'disabled:bg-gray-300' : 'bg-[#5ac5e7]'}
                                                        rounded-md hover:bg-[#198ab0] transition-all `}
                                                            type="submit"
                                                            disabled={Object.keys(formik.errors).length > 0 || addUserAddressMutation.isPending !== false}
                                                        >
                                                            {addUserAddressMutation.isPending !== false ? <p>Submitting</p> : <p>Submit</p>}
                                                            {addUserAddressMutation.isPending !== false ? <Loader className="animate-spin" /> : null}
                                                        </button>
                                                        {addUserAddressMutation?.data?.addresses ? <p className="text-green-400 text-center">new address added successfully !</p> : addUserAddressMutation?.data?.response.status === 404 ? <p className="text-red-400 text-center">request failed, please try again</p> : null}
                                                    </form>
                                                </DialogContent>
                                            </Dialog>
                                        </div>
                                    </div>
                                    <UserInfo user={user} shippingAddress={shippingAddress} setShippingAddress={setShippingAddress} CheckoutFormik={CheckoutFormik} />
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
                            deliveryMethod={deliveryMethod}
                            shipmentMethod={shipmentMethod}
                            CheckoutFormik={CheckoutFormik}
                        />



                        {/* {shipmentMethod === "paying-with-visa" ?
                        <>
                            <p className="font-medium text-xl pt-5 pb-3">Payment Method</p>
                            <AvailablePayment setPaymentMethodId={setPaymentMethodId}/>
                        </>
                        :
                        null
                    } */}

                        <div className="flex justify-center py-5">
                            <button
                                // href={`${paymentURL}`}
                                className={`
                                    w-full p-4 text-center text-white font-medium bg-[#5ac5e7] 
                                    rounded-md hover:bg-[#198ab0] transition-all 
                                    ${Object.keys(validateFields()).length > 0 ? 'disabled:bg-gray-200' : null}`
                                    //اعمل اللودينج
                                }
                                // onClick={order}
                                type="submit"
                                disabled={Object.keys(validateFields()).length > 0}
                            >
                                Pay Now
                            </button>
                        </div>

                    </div>
                </form>


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
                                    <form onSubmit={couponFormik.handleSubmit} className="relative">
                                        <input
                                            className={`w-full p-3 border-2 focus:border-[#5ac5e7] ${couponFormik.touched.couponCode && couponFormik.errors.couponCode ? 'border-red-500 ' : 'border-gray-300'} rounded-lg focus:outline-none focus:shadow-md`}
                                            type="text"
                                            placeholder="add a Coupon"
                                            value={couponFormik.values.couponCode}
                                            onChange={couponFormik.handleChange}
                                            onBlur={couponFormik.handleBlur}
                                            name="couponCode"
                                            disabled={applyCouponMutation.data?.data}
                                        />
                                        <button
                                            type="submit"
                                            disabled={applyCouponMutation.data?.data}
                                            onClick={applyCouponEvent}
                                            className="absolute top-0 m-0 right-0 p-[13.9px] flex items-center text-center text-white font-medium bg-[#5ac5e7] disabled:bg-gray-300 rounded-r-md hover:bg-[#198ab0] transition-all"
                                        >
                                            {applyCouponMutation.data?.data ? 'APPLIED' : 'APPLY'}
                                        </button>
                                        {couponFormik.touched.couponCode && applyCouponMutation?.data?.response?.data?.message ? (
                                            <p className="text-[13px] pt-1 font-medium text-red-500">{applyCouponMutation?.data?.response?.data?.message}</p>
                                        ) : null}
                                    </form>
                                    <OderSummaryInfo
                                        title='Subtotal'
                                        price={totalPrice.data.cartTotalPrice}
                                        styling={null}
                                    />
                                    {applyCouponMutation.data?.data ?
                                        <>
                                            <OderSummaryInfo
                                                title='Coupon'
                                                price={applyCouponMutation.data.data.discount}
                                                styling={'font-semibold text-[#38ae04]'}
                                            />
                                        </>
                                        :
                                        null
                                    }
                                    <OderSummaryInfo
                                        title='Shipping Fee'
                                        price={totalPrice.data.cartTotalPrice}
                                        styling={null}
                                    />
                                    <hr className="border border-[#dcdcdc]" />
                                    <div className="font-semibold text-xl">

                                        {applyCouponMutation.data?.data ?
                                            <>
                                                <OderSummaryInfo
                                                    title='Total'
                                                    price={applyCouponMutation.data.data.finalPrice}
                                                    styling={null}
                                                />
                                            </>
                                            :
                                            <>
                                                <OderSummaryInfo
                                                    title='Total'
                                                    price={totalPrice.data.cartTotalPrice}
                                                    styling={null}
                                                />
                                            </>
                                        }
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
