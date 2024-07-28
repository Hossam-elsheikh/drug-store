"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import categoryPlaceholder from '@/lib/placeholders/category-placeholder.png'
type PharmacyCategory = {
	item: PharmacyItems;
};

type PharmacyItems = {
    name: {en:string,ar:string};
    image: string;
    slug: string;
};

function ItemSlider({ item }: PharmacyCategory) {
    return (
        <Link
            href={item.slug || "#"}
            className="flex flex-col gap-5 justify-center items-center p-1 my-8  hover:scale-110 transition duration-300"
        >
            <div className="">
                <Image
                    quality={100}
                    width={150}
                    height={150}
                    src={item.image || categoryPlaceholder}
                    alt={item.name.en}
                
                />
            </div>
            <div className="text-center mt-2 md:mt-1">
                <h2 className="font-medium  text-md">{item.name.en}</h2>
            </div>
        </Link>
    );
}

export default ItemSlider;
