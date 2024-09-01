import React, { useEffect, useState } from "react";
import { Minus, Plus } from "lucide-react";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { cartItemQuantity } from "@/axios/instance";
import useAuth from "@/hooks/useAuth";

function Counter({ itemQuantity, cartItem, calculateCartMutation }: any) {

    const [quantity, setQuantity] = useState(itemQuantity);

    const axiosPrivate = useAxiosPrivate();
    const { auth }: any = useAuth();

    useEffect(() => {
        setQuantity(itemQuantity)
        // alert('new state quantity have been updated !');
    }, [itemQuantity])

    const updateQuantity = async (newQuantity: number) => {
        try {
            const userId = auth.userId;
            const productId = cartItem.productId._id;
            await cartItemQuantity(axiosPrivate, userId, productId, newQuantity);
            setQuantity(newQuantity);
            calculateCartMutation.mutate()
        } catch (error) {
            console.error('error while updating quantity', error);
        }
    }

    const quantityPlus = async () => {
        try {
            const newQuantity = quantity + 1;
            updateQuantity(newQuantity)
        } catch (error) {
            console.error("error happened while increment quantity of the product", error);
        }
    };

    const quantityMinus = async () => {
        try {
            const newQuantity = quantity - 1;
            if (newQuantity <= 0) return
            updateQuantity(newQuantity)
        } catch (error) {
            console.error("error happened while decreasing quantity of the product", error);
        }
    };

    return (
        <div className="flex items-center ">
            <button
                type="button"
                // disabled={ quantity >= cartItem.productId.stock}
                onClick={quantityPlus}
                className="inline-flex px-[4px] py-0.5 shrink-0 items-center justify-center text-slate-100 rounded-full bg-secColor hover:opacity-75 focus:outline-none  active:scale-90 duration-200 disabled:bg-gray-300 "
            >
                <Plus className="w-5" />
            </button>

            <input
                type="text"
                id="counter-input"
                className="w-7 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0 dark:text-white"
                placeholder=""
                value={quantity}
                required
            />
            <button
                type="button"
                disabled={quantity <= 1}
                onClick={quantityMinus}
                className="inline-flex px-[4px] py-0.5 shrink-0 items-center justify-center rounded-full text-white   bg-gray-500 hover:opacity-75 focus:outline-none disabled:bg-gray-300  active:scale-90 duration-200 "
            >
                <Minus className="w-5" />
            </button>
        </div>
    );
}

export default Counter;
