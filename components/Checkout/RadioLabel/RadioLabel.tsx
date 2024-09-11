// RadioLabel.tsx
import React from 'react'
import Label from "@/components/Checkout/RadioLabel/Label";
import { CreditCard, HandCoins, Store, Truck } from 'lucide-react';
import SectionTitle from './SectionTitle';

type DataTypes = {
    setDeliveryMethod: any,
    setPaymentMethod: any,
    deliveryMethod: any,
    paymentMethod: any,
    formErrors: any,
    setFormErrors: any,
}

function RadioLabel({ setDeliveryMethod, setPaymentMethod, deliveryMethod, paymentMethod, formErrors, setFormErrors }: DataTypes) {
    return (
        <>
            <SectionTitle title="Delivery">
                <Label
                    method="delivery"
                    methodValue="ship"
                    methodName="Ship to Address"
                    icon={<Truck className="h-6 w-6 text-gray-800" />}
                    isFirst={true}
                    isLast={false}
                    setDeliveryMethod={setDeliveryMethod}
                    setPaymentMethod={setPaymentMethod}
                    methodState={deliveryMethod}
                    formErrorPayment={() => {
                        if (formErrors.deliveryMethod) {
                            setFormErrors((errors: any) => ({
                                ...errors,
                                deliveryMethod: ''
                            }))
                        }
                    }} />
                <Label
                    method="delivery"
                    methodValue="pickup-in-store"
                    methodName="Pickup in Store"
                    icon={<Store className="h-6 w-6 text-gray-800" />}
                    isFirst={false}
                    isLast={true}
                    setDeliveryMethod={setDeliveryMethod}
                    setPaymentMethod={setPaymentMethod}
                    methodState={deliveryMethod}
                    formErrorPayment={() => {
                        if (formErrors.deliveryMethod) {
                            setFormErrors((errors: any) => ({
                                ...errors,
                                deliveryMethod: ''
                            }))
                        }
                    }}
                />
            </SectionTitle>
            {formErrors?.deliveryMethod && <p className="text-red-800 mt-2">{formErrors.deliveryMethod}</p>}
            <SectionTitle title="Payment">
                <Label
                    method="payment"
                    methodValue="cash-on-delivery"
                    methodName="Cash on Delivery"
                    icon={<HandCoins className="h-6 w-6 text-gray-800" />}
                    isFirst={true}
                    isLast={false}
                    setDeliveryMethod={setDeliveryMethod}
                    setPaymentMethod={setPaymentMethod}
                    methodState={paymentMethod}

                    formErrorPayment={() => {
                        if (formErrors.paymentMethod) {
                            setFormErrors((errors: any) => ({
                                ...errors,
                                paymentMethod: ''
                            }))
                        }
                    }}
                />
                <Label
                    method="payment"
                    methodValue="paying-with-visa"
                    methodName="Pay with Visa"
                    icon={<CreditCard className="h-6 w-6 text-gray-800" />}
                    isFirst={false}
                    isLast={true}
                    setDeliveryMethod={setDeliveryMethod}
                    setPaymentMethod={setPaymentMethod}
                    methodState={paymentMethod}
                    formErrorPayment={() => {
                        if (formErrors.paymentMethod) {
                            setFormErrors((errors: any) => ({
                                ...errors,
                                paymentMethod: ''
                            }))
                        }
                    }}
                />
            </SectionTitle>
            {formErrors?.paymentMethod && <p className="text-red-800 mt-2">{formErrors.paymentMethod}</p>}
        </>
    )
}

export default RadioLabel