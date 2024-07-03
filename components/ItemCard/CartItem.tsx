"use client";

import { X } from "lucide-react";
import Image from "next/image";
import Counter from "./Counter";

type CartProps = {
    price?: number;
    image?: string;
    title?: string;
    description?: string;
};

function CartItem({ price, image, title, description }: CartProps) {
    return (
        <div className="relative flex items-center space-x-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
            <div className="flex-shrink-0">
                <Image
                    width={80}
                    height={80}
                    className="rounded-md object-cover"
                    src={image || "https://t3.ftcdn.net/jpg/01/02/12/28/240_F_102122850_fj76MXJcEDP4OzO2y918KarKygSeFmZk.jpg"}
                    alt={title || "Product image"}
                />
            </div>

            <div className="flex flex-1 flex-col">
                <div className="flex items-start justify-between">
                    <h3 className="text-sm font-medium text-gray-900 line-clamp-2">
                        {title || "PC system All in One APPLE iMac (2023)"}
                    </h3>
                    <button
                        type="button"
                        className="ml-4 text-gray-400 hover:text-gray-500"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                    {description || "mqrq3ro/a, Apple M3 Retina 4.5K, 8GB, SSD 256GB, 10-core GPU"}
                </p>

                <div className="mt-2 flex items-center justify-between">
                    <Counter />
                    <p className="text-sm font-medium text-gray-900">
                        ${price?.toFixed(2) || "1,499.00"}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default CartItem;
