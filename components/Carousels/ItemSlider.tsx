"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

type PharmacyCategory = {
    item: PharmacyItems;
};

type PharmacyItems = {
    name: string;
    image: string;
    src: string;
};

function ItemSlider({ item }: PharmacyCategory) {
    return (
        <Link
            href={item.src || "#"}
            className="flex flex-col gap-5 justify-center items-center p-1 my-8  hover:scale-110 transition duration-300"
        >
            <div className="">
                <Image
                    quality={100}
                    width={150}
                    height={150}
                    src={item.image}
                    alt={item.name}
                    className="opacity-0 duration-[2s] transition-all"
                    onLoadingComplete={(image) =>
                        image.classList.remove("opacity-0")
                    }
                // layout="fill"
                // objectFit="cover"
                />
            </div>
            <div className="text-center mt-2 md:mt-1">
                <h2 className="font-medium  text-md">{item.name}</h2>
            </div>
        </Link>
    );
}

export default ItemSlider;
