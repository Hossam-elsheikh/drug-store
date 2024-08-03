import React from 'react'
import Label from "@/components/Checkout/RadioLabel/Label";
import { CreditCard, HandCoins, Store, Truck } from 'lucide-react';
import SectionTitle from './SectionTitle';

type DataTypes = {
    setDeliveryMethod: any,
    setShipmentMethod: any,
}

function RadioLabel({ setDeliveryMethod, setShipmentMethod }: DataTypes) {

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
                    // checked={}
                    setDeliveryMethod={setDeliveryMethod}
                    setShipmentMethod={setShipmentMethod}
                />
                <hr />
                <Label
                    method="delivery"
                    methodValue="pickup-in-store"
                    methodName="Pickup in Store"
                    icon={<Store />}
                    isFirst={false}
                    isLast={true}
                    // checked={}
                    setDeliveryMethod={setDeliveryMethod}
                    setShipmentMethod={setShipmentMethod}
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
                    // checked={}
                    setDeliveryMethod={setDeliveryMethod}
                    setShipmentMethod={setShipmentMethod}
                />
                <hr />
                <Label
                    method="payment"
                    methodValue="paying-with-visa"
                    methodName="paying with visa"
                    icon={<CreditCard />}
                    isFirst={false}
                    isLast={true}
                    // checked={}
                    setDeliveryMethod={setDeliveryMethod}
                    setShipmentMethod={setShipmentMethod}
                />
            </SectionTitle>
        </>
    )
}

export default RadioLabel