"use client";
import React, { useState } from "react";
import Image from "next/image";
import { ChevronsRight, Minus, ShoppingCart, Trash2, Plus, Heart } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Modal } from "./Modal";
import Counter from "./Counter";

type Props = {
    image?: string;
    isVertical: boolean;
    title?: string;
    direction?: "ltr" | "rtl";
    cart?: boolean;
};

export default function ItemCard({
    image,
    isVertical,
    title,
    direction = "ltr",
    cart,
}: Props) {
    const [ShowOverlay, setShowOverlay] = useState(false);


    const content = (
        <div className="mt-4 p-3 flex-grow">
            <div dir={direction}>
                <a href="#">
                    <h5 className="text-xl tracking-tight text-slate-900">
                        {title || "Nike Air MX Super 2500 - Red"}
                    </h5>
                </a>
                <div className="mt-2 mb-5 flex items-center justify-between">
                    <p>
                        <span className="text-3xl font-bold text-slate-900">
                            $449
                        </span>
                        <span className="text-sm text-slate-900 line-through">
                            $699
                        </span>
                    </p>

                </div>
            </div>

            {cart ? (<>

                <div className='mb-4'>
                    <label htmlFor="counter-input" className="sr-only">Choose quantity:</label>
                    <div className="flex items-center justify-between md:order-3">
                        <Counter />
                    </div>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center justify-center rounded-md bg-green-900 px-3 py-2.5 text-center text-sm font-medium text-white hover:bg-green-700 focus:outline-none duration-300">
                        Process to Checkout <ChevronsRight className="ml-2" />
                    </button>
                    <button className="flex items-center justify-center rounded-md bg-red-900 px-3 py-2.5 text-center text-sm font-medium text-white hover:bg-red-700 focus:outline-none duration-300">
                        Remove <Trash2 className="ml-2" />
                    </button>
                </div>

            </>
            ) : (<div className="flex gap-3">
                <button className="flex items-center justify-center rounded-md hover:bg-red-500 active:bg-red-600 px-3 py-2.5 text-center text-sm font-medium  border-2 border-red-500   focus:outline-none duration-300">
                    <Heart className='text-red-700' />
                </button>
                <button className="flex items-center justify-center rounded-md bg-slate-900 w-full px-3 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none duration-300">
                    Add to cart <ShoppingCart className="ml-2" />
                </button>
            </div>
            )}
        </div>
    );

    return (
        <motion.div
            onHoverStart={() => setShowOverlay(true)}
            onHoverEnd={() => setShowOverlay(false)} // Keep overlay if modal is open
            className={`relative m-5 p-3 flex w-full ${isVertical ? "max-w-xs flex-col" : "max-w-2xl flex-row"
                } overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md ${!isVertical && direction === "rtl" ? "flex-row-reverse" : ""
                }`}
        >
            <a
                className={`relative flex h-60 ${isVertical ? "w-full" : "w-1/3"
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
                                className="flex flex-col space-y-4"
                            >
                                <Modal buttonText="show" />
                                <button className="bg-white p-3">
                                    show more
                                </button>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
                <Image
                    layout="fill"
                    className="object-cover z-10"
                    src={
                        image ||
                        "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
                    }
                    alt="product image"
                />

                <span className="absolute top-0 left-0 m-2 rounded-full bg-red-700 px-2 text-center text-sm font-medium text-white z-20">
                    39% OFF
                </span>
            </a>
            {isVertical ? (
                content
            ) : (
                <div className="flex-grow flex items-center">{content}</div>
            )}
        </motion.div>
    );
}
