"use client";
import React, { useState } from "react";
import Image from "next/image";
import { ChevronsRight, Trash2, ShoppingCart, Heart } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Modal } from "./Modal";
import Counter from "./Counter";

type Props = {
    image?: string;
    isVertical?: boolean;
    title?: string;
    direction?: "ltr" | "rtl";
    cart?: boolean;
    price?: string;
};

export default function ItemCard({
    image,
    isVertical = true,
    title,
    direction = "ltr",
    cart,
}: Props) {
    const [ShowOverlay, setShowOverlay] = useState(false);

    const content = (
        <div className="mt-2 p-2 flex-grow">
            <div dir={direction}>
                <a href="#">
                    <h5 className="text-lg font-semibold tracking-tight text-start text-slate-900">
                        {title || "Nike Air MX Super 2500 - Red"}
                    </h5>
                </a>
                <div className="mt-1 mb-3 flex items-center justify-between">
                    <p>
                        <span className="text-2xl font-bold text-slate-900">
                            $449
                        </span>
                        <span className="text-xs text-slate-900 line-through">
                            $699
                        </span>
                    </p>
                </div>
            </div>

            {cart ? (
                <>
                    <div className='mb-2'>
                        <label htmlFor="counter-input" className="sr-only">Choose quantity:</label>
                        <div className="flex items-center justify-between md:order-3">
                            <Counter />
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button className="flex items-center justify-center rounded-md bg-green-900 px-2 py-2 text-center text-sm font-medium text-white hover:bg-green-700 hover:shadow-md outline-none active:scale-[0.98] duration-300">
                            Process to Checkout <ChevronsRight className="ml-2" />
                        </button>
                        <button className="flex items-center justify-center rounded-md bg-red-900 px-2 py-2 text-center text-sm font-medium text-white hover:bg-red-700 hover:shadow-md outline-none active:scale-[0.98] duration-300">
                            Remove <Trash2 className="ml-2" />
                        </button>
                    </div>
                </>
            ) : (
                <div className="flex gap-2">
                    <button className="group flex items-center justify-center rounded-md hover:bg-red-500  active:bg-red-600 px-2 py-2 text-center text-sm font-medium  hover:shadow-md outline-none duration-300 active:scale-[0.98]">
                        <Heart className='text-red-700 group-hover:text-white' />
                    </button>
                    <button className="flex items-center gap-4 justify-center rounded-md bg-slate-900 w-full px-2 py-2 text-center text-sm font-medium text-white hover:bg-gray-700 hover:shadow-md outline-none duration-300 active:scale-[0.98] ">
                        <span className="hidden md:block">Add to cart</span> <ShoppingCart />
                    </button>
                </div>
            )}
        </div>
    );

    return (
        <motion.div
            onHoverStart={() => setShowOverlay(true)}
            onHoverEnd={() => setShowOverlay(false)}
            className={`relative m-2 w-full   flex ${isVertical ? "max-w-72 md:max-w-60  h-96 flex-col" : "max-w-xs h-60 flex-row"
                } overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md ${!isVertical && direction === "rtl" ? "flex-row-reverse" : ""
                }`}
        >
            <a
                className={`relative flex ${isVertical ? "h-60 w-full" : "h-full w-1/3"
                    } overflow-hidden rounded-xl`}
                href="#"
            >
                <AnimatePresence>
                    {ShowOverlay && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{
                                opacity: 1,
                                transition: { duration: 0.45 },
                            }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 z-20 flex justify-center items-center bg-[#282a3f]/[0.5]"
                        >
                            <motion.div
                                initial={{ y: 10 }}
                                animate={{ y: 0 }}
                                exit={{ y: 10 }}
                                className="flex flex-col space-y-2"
                            >
                                <Modal buttonText="show" />
                                <button className="bg-white p-2">
                                    show more
                                </button>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
                <Image
                    layout="responsive"
                    width={400} height={400}
                    className="object-cover z-10"
                    src={
                        image ||
                        "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
                    }
                    alt="product image"
                />


            </a>
            {isVertical ? (
                content
            ) : (
                <div className="flex-grow flex items-center">{content}</div>
            )}
        </motion.div>
    );
}
