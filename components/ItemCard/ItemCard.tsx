'use client'

import { Heart, Trash2 } from 'lucide-react'
import Image from 'next/image'
import Counter from './Counter'

type CartProps = {
    Price?: number,
    image?: string,
    Title?: string,
    Description?: string,
    direction?: 'ltr' | 'rtl'
}

function CartItem({ Price = 1499, image, Title = "PC system All in One APPLE iMac (2023) mqrq3ro/a, Apple M3 Retina 4.5K, 8GB, SSD 256GB, 10-core GPU, Keyboard layout INT", Description, direction = 'ltr' }: CartProps) {

    return (
        <div className={`rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800 md:p-3 shadow-md ${direction === 'rtl' ? 'flex-row-reverse' : ''}`} dir={direction}>
            <div className="space-y-2 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                <a href="#" className="shrink-0 md:order-1">
                    <Image width={210} height={210} className="w-full object-cover rounded-lg" src={image || "https://t3.ftcdn.net/jpg/01/02/12/28/240_F_102122850_fj76MXJcEDP4OzO2y918KarKygSeFmZk.jpg"} alt="product image" />
                </a>

                <label htmlFor="counter-input" className="sr-only">Choose quantity:</label>
                <div className="flex items-center justify-between md:order-3 md:justify-end">
                    <Counter />
                    <div className="text-end md:order-4 md:w-32">
                        <p className="text-base font-bold text-gray-900 dark:text-white">${Price.toFixed(2)}</p>
                    </div>
                </div>

                <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                    <a href="#" className="text-base font-medium text-gray-900 hover:underline dark:text-white">{Title}</a>

                    <div className="flex items-center gap-4">
                        <button type="button" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 hover:underline dark:text-gray-400 dark:hover:text-white">
                            <Heart className='mr-2' />
                            Add to Favorites
                        </button>

                        <button type="button" className="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500">
                            <Trash2 className='mr-2' />
                            Remove
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartItem
