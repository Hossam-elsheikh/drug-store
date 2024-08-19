import React from 'react'
import Label from "@/components/Checkout/RadioLabel/Label";
import { CreditCard, HandCoins, Store, Truck } from 'lucide-react';
import SectionTitle from './SectionTitle';

type DataTypes = {
    setDeliveryMethod: any,
    setShipmentMethod: any,
    deliveryMethod: any,
    shipmentMethod: any,
    CheckoutFormik: any,
}

function RadioLabel({ setDeliveryMethod, setShipmentMethod, deliveryMethod, shipmentMethod, CheckoutFormik }: DataTypes) {

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
                    setShipmentMethod={setShipmentMethod}
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
                    setShipmentMethod={setShipmentMethod}
                    methodState={deliveryMethod}
                />
            </SectionTitle>
            {CheckoutFormik.errors.deliveryMethod && (
                <div style={{ color: 'red' }}>{CheckoutFormik.errors.deliveryMethod}</div>
            )}

            <SectionTitle title="Payment">
                <Label
                    method="payment"
                    methodValue="cash-on-delivery"
                    methodName="Cash on Delivery"
                    icon={<HandCoins />}
                    isFirst={true}
                    isLast={false}
                    setDeliveryMethod={setDeliveryMethod}
                    setShipmentMethod={setShipmentMethod}
                    methodState={shipmentMethod}

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
                    setShipmentMethod={setShipmentMethod}
                    methodState={shipmentMethod}

                />

            </SectionTitle>
            {CheckoutFormik.errors.shipmentMethod && (
                <div style={{ color: 'red' }}>{CheckoutFormik.errors.shipmentMethod}</div>
            )}
        </>
    )
}

export default RadioLabel