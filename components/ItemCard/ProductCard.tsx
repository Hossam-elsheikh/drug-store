"use client";
import Image from "next/image";
import React, { useState } from "react";
import { Heart, ShoppingCart } from "lucide-react";
import Modal from "./Modal";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { instancePrivate } from "@/axios/instance";
import useAuth from "@/hooks/useAuth";

const QuickAccess = ({ setIsModalOpen }) => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{
            opacity: 1,
            transition: { duration: 0.45 },
        }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 z-20 flex justify-center items-center rounded-lg bg-[#282a3f]/[0.2]"
    >
        <motion.div
            initial={{ y: 10 }}
            animate={{ y: 0 }}
            exit={{ y: 10 }}
            transition={{ duration: 0.35 }}
            className="flex flex-col gap-3"
        >
            <button
                onClick={() => setIsModalOpen(true)}
                className="bg-white px-5 py-3 hover:scale-105 duration-300 text-sm rounded-full text-primaryColor hover:bg-secColor hover:text-slate-100 font-medium"
            >
                View more
            </button>
        </motion.div>
    </motion.div>
);

const ProductCard = ({ details, mode = "default" }) => {
    const router = useRouter();
    const [quickAccess, setQuickAccess] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { auth } = useAuth();

    const handleMouseEnter = () => {
        if (!isModalOpen) {
            setQuickAccess(true);
        }
    };

    const handleMouseLeave = () => {
        if (!isModalOpen) {
            setQuickAccess(false);
        }
    };

    const addToCart = async (product) => {
        try {
            const response = await instancePrivate.post('/order', {
                cart: [{
                    id: product.id,
                    title: product.name.en,
                    quantity: 1,
                    unitPrice: product.price,
                    netPrice: product.price
                }],
                customerId: auth.userId,
            });
            console.log(response);
        } catch (err) {
            console.error('error while adding to cart', err);
        }
    };

    return (
        <div className="flex border transition flex-col max-w-52 rounded-lg shadow-sm pb-1">
            <div
                className="bg-slate-100 w-full overflow-hidden cursor-pointer h-56 flex relative justify-center"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <img src={`http://localhost:4000/uploads/photos/${details.image}`} alt={details.name?.en} className="w-full h-full object-cover rounded-lg" />
                <AnimatePresence>
                    {quickAccess && (
                        <QuickAccess setIsModalOpen={setIsModalOpen} />
                    )}
                </AnimatePresence>
            </div>

            <div className="flex flex-col p-3 gap-3">
                <div>
                    <h2 className="font-medium text-md truncate hover:text-secColor">
                        {details.name?.en}
                    </h2>
                    <p className="font-semibold text-start text-secColor">
                        {details.price} <span className="font-light">KWD</span>
                    </p>
                </div>
                <div className="flex items-center justify-between">
                    <Heart className="cursor-pointer hover:text-red-500 transition" />
                    {mode === "default" ? (
                        <button
                            onClick={() => addToCart(details)}
                            className="flex bg-primaryColor px-3 py-2 rounded-md text-white text-sm font-medium duration-300 items-center gap-2 hover:bg-secColor transition-all cursor-pointer"
                        >Add to cart
                           
                            <ShoppingCart />
                        </button>
                    ) : (
                        <button className="flex bg-primaryColor px-3 py-2 rounded-md text-white items-center gap-2 hover:bg-secColor transition cursor-pointer">
                            Show more
                        </button>
                    )}
                </div>
            </div>
            {isModalOpen && (
                <Modal
                    details={details}
                    setIsModalOpen={setIsModalOpen}
                    setQuickAccess={setQuickAccess}
                />
            )}
        </div>
    );
};

export default ProductCard;