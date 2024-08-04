import Image from 'next/image'
import React from 'react'

function Order({cartItem}:any) {
    
    return (
        <div className=" flex space-x-4 rounded-lg border-b py-4">

            <div className="flex-shrink-0">
                <Image
                    width={90}
                    height={90}
                    className="rounded-md object-cover"
                    src={`http://localhost:4000/uploads/photos/${cartItem.productId.image}`}
                    alt={cartItem.productId.name.en}
                />
            </div>

            <div className="flex flex-1 flex-col">

                <div className="flex items-start justify-between ">
                    <h3 className="text-sm font-medium text-gray-900 line-clamp-2">
                        {cartItem.productId.name.en}
                    </h3>
                </div>

                <div className="space-y-5 my-auto pt-3 w-full flex justify-between">
                    <p >
                        <span className="text-sm">Quantity</span> {cartItem.quantity}
                    </p>
                    <p>
                        <span className="font-semibold text-lg ">{cartItem.productId.price}</span> <span className="font-medium text-xs">KWD</span>
                    </p>
                </div>

            </div>

        </div>

    )
}

export default Order