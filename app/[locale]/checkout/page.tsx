import BreadCrumb from "@/components/Breadcrumb/BreadCrumb";
import CheckoutForm from "@/components/CheckoutForm/CheckoutForm";
import CartItemsCheckout from "@/components/UserProfile/cartItems/CartItemsCheckout";
import CheckOutSummary from "@/components/UserProfile/cartItems/CheckOutSummary";
import React from "react";

const Checkout = () => {
    return (
        <div className="bg-gray-50 min-h-dvh">
            <BreadCrumb />
            <div className="max-w-[1500px] mx-auto sm:px-2 py-4">
                <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-12">
                    {/* Cart Items and Summary */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="bg-white rounded-lg shadow overflow-hidden">
                            <div className="p-3 space-y-4">
                                <CartItemsCheckout />
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-4">
                        <div className="bg-white rounded-lg shadow overflow-hidden">
                            <div className="p-3">
                                <h2 className="text-lg font-medium text-gray-900 mb-4">
                                    Checkout Information
                                </h2>
                                <CheckoutForm />
                            </div>
                        </div>
                    </div>
                    <div className="lg:col-span-4">
                        <div className="bg-white rounded-lg shadow overflow-hidden">
                            <div className="p-3">
                                <h2 className="text-lg font-medium text-gray-900 mb-4">
                                    Checkout Information
                                </h2>
                                <CheckOutSummary
                                    subtotal={220}
                                    shipping={50}
                                    taxes={10}
                                    promoCode={20}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
