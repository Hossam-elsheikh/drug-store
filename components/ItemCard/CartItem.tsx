"use client";

import { Heart, Trash2, X } from "lucide-react";
import Image from "next/image";
import Counter from "./Counter";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { cancelItemCart, cancelOrder } from "@/axios/instance";
import useAuth from "@/hooks/useAuth";
import useRemoveItemCart from "@/hooks/removeItemCart";

type CartProps = {
    price?: number;
    image?: string;
    title?: string;
    description?: string;
};

function CartItem({ cartItem, removeItemCartMutation, calculateCartMutation }: any) {
    const { auth }: any = useAuth();

    const removeItemCart = ()=> useRemoveItemCart({auth,cartItem,removeItemCartMutation,calculateCartMutation})

    return (
        <div className="relative flex items-center space-x-4 rounded-lg bg-white p-4 shadow-sm">
            <div className="flex-shrink-0">
                <Image
                    width={120}
                    height={120}
                    className="rounded-md object-cover"
                    src={`http://localhost:4000/uploads/photos/${cartItem.productId.image}`}
                    alt={cartItem.productId.name.en}
                />
            </div>

            <div className="flex flex-1 flex-col">

                <div className="flex items-start justify-between">
                    <h3 className="text-md font-semibold text-gray-900 line-clamp-2">
                        {cartItem.productId.name.en}
                    </h3>

                    <button
                        type="button"
                        className="ml-4 text-gray-400 hover:text-gray-500 "
                    >
                        <X className="h-7 w-7"
                            onClick={removeItemCart}
                        />
                    </button>
                </div>

                <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                    {/* {orderItem.description || "mqrq3ro/a, Apple M3 Retina 4.5K, 8GB, SSD 256GB, 10-core GPU"} */}
                </p>

                <div className="mt-2 flex items-center justify-between">
                    <div className="flex space-x-3 ">
                        <Counter
                            cartItem={cartItem}
                            itemQuantity={cartItem.quantity}
                            calculateCartMutation={calculateCartMutation}
                        />
                    </div>
                    <div className="space-y-5 mt-10">
                        <p className="  text-center text-gray-900">
                            <span className="font-semibold text-lg">{cartItem.productId.price}</span> <span className="font-medium text-xs">KWD</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CartItem;
