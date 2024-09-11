import Image from 'next/image'
import React from 'react'

function Order({ cartItem }: any) {
    const { productId: { image, name, price }, quantity, } = cartItem
    const imagePath = process.env.NEXT_PUBLIC_IMAGE_PATH

    return (
        <div className=" flex space-x-4 rounded-lg border shadow-sm p-2 hover:shadow-md duration-300  py-4">

            <div className="flex-shrink-0">
                <Image
                    width={90}
                    height={90}
                    className="rounded-md object-cover"
                    src={`${imagePath}${image}`}
                    alt={name?.en}
                />
            </div>

            <div className="flex flex-1 flex-col">

                <div className="flex items-start justify-between ">
                    <h3 className="text-sm font-medium text-gray-900 line-clamp-2">
                        {name?.en}
                    </h3>
                </div>

                <div className="space-y-5 my-auto pt-3 w-full flex justify-between">
                    <p >
                        <span className="text-sm">Quantity :</span> {quantity}
                    </p>
                    <p>
                        <span className="font-semibold text-lg ">{(price.toFixed(2))}</span> <span className="font-medium text-xs">KWD</span>
                    </p>
                </div>

            </div>

        </div>

    )
}

export default Order