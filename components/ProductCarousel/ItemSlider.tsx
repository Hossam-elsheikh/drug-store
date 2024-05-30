'use client'

import Image from 'next/image'
import React from 'react'
import { SwiperSlide } from 'swiper/react'

type PharmacyCategory = {
    item: PharmacyItems;
};

type PharmacyItems = {
    name: string;
    image: string;
};

function ItemSlider({ item }: PharmacyCategory) {
    return (
      
            <div className='w-full h-1/2 p-1 text-center mb-9'>
                <Image
                    className='rounded-lg'
                    quality={80}
                    src={item.image}
                    alt={item.name}
                    width={400}
                    height={200}
                />
                <div className='text-center mt-2'>
                    <h2 className='font-bold text-lg'>{item.name}</h2>
                </div>
            </div>
     
    )
}

export default ItemSlider
