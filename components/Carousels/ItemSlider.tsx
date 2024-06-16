'use client'

import Image from 'next/image'
import Link from 'next/link';
import React from 'react'

type PharmacyCategory = {
    item: PharmacyItems;
};

type PharmacyItems = {
    name: string;
    image: string;
    src: string
};

function ItemSlider({ item }: PharmacyCategory) {
    return (
        <Link href={item.src ||"#"} className='flex flex-col gap-5 justify-center items-center p-1 my-8  hover:scale-110 transition duration-300'>
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
        </Link>
    )
}

export default ItemSlider
