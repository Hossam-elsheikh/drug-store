import React from 'react'
import Label from "@/components/Checkout/RadioLabel/Label";
import { CreditCard, HandCoins, Store, Truck } from 'lucide-react';
import SectionTitle from './SectionTitle';

type DataTypes = {
    setDeliveryMethod: any,
    setPaymentMethod: any,
    deliveryMethod: any,
    paymentMethod: any,
}

function RadioLabel({ setDeliveryMethod, setPaymentMethod, deliveryMethod, paymentMethod, }: DataTypes) {

    return (
        <>
            <SectionTitle title="Delivery">
                <Label
                    method="delivery"
                    methodValue="ship"
                    methodName="ship"
                    icon={<Truck />}
                    isFirst={true}
                    isLast={false}
                    setDeliveryMethod={setDeliveryMethod}
                    setPaymentMethod={setPaymentMethod}
                    methodState={deliveryMethod}
                />
                <hr />
                <Label
                    method="delivery"
                    methodValue="pickup-in-store"
                    methodName="Pickup in Store"
                    icon={<Store />}
                    isFirst={false}
                    isLast={true}
                    setDeliveryMethod={setDeliveryMethod}
                    setPaymentMethod={setPaymentMethod}
                    methodState={deliveryMethod}
                />
            </SectionTitle>

            <SectionTitle title="Payment">
                <Label
                    method="payment"
                    methodValue="cash-on-delivery"
                    methodName="Cash on Delivery"
                    icon={<HandCoins />}
                    isFirst={true}
                    isLast={false}
                    setDeliveryMethod={setDeliveryMethod}
                    setPaymentMethod={setPaymentMethod}
                    methodState={paymentMethod}
                />
                <hr />
                <Label
                    method="payment"
                    methodValue="paying-with-visa"
                    methodName="paying with visa"
                    icon={<CreditCard />}
                    isFirst={false}
                    isLast={true}
                    setDeliveryMethod={setDeliveryMethod}
                    setPaymentMethod={setPaymentMethod}
                    methodState={paymentMethod}
                />
            </SectionTitle>
        </>
    )
}

export default RadioLabel