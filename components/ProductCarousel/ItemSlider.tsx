'use client'

import Image from 'next/image'
import React from 'react'

type PharmacyCategory = {
    item: PharmacyItems;
};

type PharmacyItems = {
    name: string;
    image: string;
};

function ItemSlider({ item }: PharmacyCategory) {
    return (
        <div className='w-full p-1 text-center mb-9'>
            <div className='relative w-full h-48'> 
                <Image
                    className='rounded-lg'
                    quality={80}
                    src={item.image}
                    alt={item.name}
                    layout="fill" 
                    objectFit="cover" 
                />
            </div>
            <div className='text-center mt-2'>
                <h2 className='font-semibold text-lg'>{item.name}</h2>
            </div>
        </div>
    )
}

export default ItemSlider
