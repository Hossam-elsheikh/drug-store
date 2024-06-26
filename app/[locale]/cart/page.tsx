import CartItemsCheckout from "@/components/UserProfile/cartItems/CartItemsCheckout";
import React from "react";
const Cart = () => {
  return (
    <div className="flex justify-center py-4 w-full items-center">

    <div className="w-full md:[85%] align-middle  p-5 grid grid-cols-1 lg:grid-cols-4 justify-center gap-4">
      <div className="flex flex-col gap-4 col-span-3">
        <h2 className="font-medium text-xl">My Cart Items</h2>
        <div className="flex flex-col gap-3 rounded-lg p-3 border">
        <CartItemsCheckout/>
        </div>
      </div>
      <div className="border w-full  rounded-lg flex flex-col p-3">
        <h2 className="font-medium text-xl">Checkout Summary</h2>
      </div>
    </div>
    </div>

  );
};

export default Cart;
