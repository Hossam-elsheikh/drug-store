// RadioLabel.tsx
import React from 'react'
import Label from "@/components/Checkout/RadioLabel/Label";
import { CreditCard, HandCoins, Store, Truck } from 'lucide-react';
import SectionTitle from './SectionTitle';
import { useLocale } from '@/context/LocaleProvider';

type DataTypes = {
    setDeliveryMethod: any,
    setPaymentMethod: any,
    deliveryMethod: any,
    paymentMethod: any,
    formErrors: any,
    setFormErrors: any,
}

function RadioLabel({ setDeliveryMethod, setPaymentMethod, deliveryMethod, paymentMethod, formErrors, setFormErrors }: DataTypes) {
    const { locale }: any = useLocale();
    return (
        <>
            <SectionTitle 
            title={locale === "en" ? "Delivery" : "التوصيل"}
            >
                <Label
                    method="delivery"
                    methodValue="ship"
                    methodName={locale === "en" ? "Ship to Address" : "الشحن علي عنوان التوصيل"}
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
                    methodName={locale === "en" ? "Pickup in Store" : "الاستلام في المتجر"}
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
            {formErrors?.deliveryMethod && <p className="text-[#ef4444] mt-2">{formErrors.deliveryMethod}</p>}
            <SectionTitle 
            title={locale === "en" ? "Payment" : "طريقة الدفع"}
            
            >
                <Label
                    method="payment"
                    methodValue="cash-on-delivery"
                    methodName={locale === "en" ? "Cash on Delivery" : "الدفع عند الاستلام"}
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
                    methodName={locale === "en" ? "Pay with Visa" : "الدفع باستخدام فيزا"}
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
            {formErrors?.paymentMethod && <p className="text-[#ef4444] mt-2">{formErrors.paymentMethod}</p>}
        </>
    )
}

export default RadioLabel