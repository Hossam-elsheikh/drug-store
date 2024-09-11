import { ShoppingCart } from 'lucide-react'
import React from 'react'

function EmptyCart() {
    return (
        <div className=" h-full  flex text-center">
            <div className="my-auto space-y-5 ">
                <ShoppingCart className="mx-auto h-[130px] w-[130px]" />
                <p className="  font-semibold text-3xl px-3">Your Cart Is Empty</p>
                <p className="px-3">Add some Products to Your Cart</p>
            </div>
        </div>
    )
}

export default EmptyCart;