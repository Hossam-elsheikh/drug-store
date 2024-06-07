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
        <div className='flex flex-col gap-5 justify-center items-center p-1 my-8'>
            <div className=''> 
                <Image
                    className=''
                    quality={100}
                    width={200}
                    height={200}
                    src={item.image}
                    alt={item.name}
                    // layout="fill" 
                    // objectFit="cover" 
                />
            </div>
            <div className='text-center mt-2 md:mt-1'>
                <h2 className='font-semibold  text-sm'>{item.name}</h2>
            </div>
        </div>
    )
}

export default ItemSlider
