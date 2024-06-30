import CartItemsCheckout from "@/components/UserProfile/cartItems/CartItemsCheckout";
import CheckOutSummary from "@/components/UserProfile/cartItems/CheckOutSummary";
import React from "react";

const Cart = () => {
    return (
        <div className="flex justify-center py-4 w-full items-center">
            <div className="w-full md:w-[85%] md:p-14 p-5 grid grid-cols-1 lg:grid-cols-4 gap-4">
                <div className="flex flex-col gap-4 lg:col-span-3">
                    <h2 className="font-medium text-2xl">My Cart Items</h2>
                    <div className="flex flex-col gap-3 rounded-lg p-3 border shadow-sm">
                        <CartItemsCheckout />
                    </div>
                </div>
                <div className="flex flex-col gap-4 lg:col-span-1">
                    <CheckOutSummary subtotal={220} shipping={50} taxes={10} promoCode={20} />
                </div>
            </div>
        </div>
    );
};

export default Cart;
