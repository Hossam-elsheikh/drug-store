"use client";
import Image from "next/image";
import React, { useState } from "react";
import { Heart, ShoppingCart } from "lucide-react";
import Link from "next/link";
import Modal from "./Modal";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";

const QuickAccess = ({ setIsModalOpen }) => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{
            opacity: 1,
            transition: { duration: 0.45 },
        }}
        exit={{ opacity: 0,  }}
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
            <button className="bg-white px-5 py-3 rounded-full font-medium text-sm">
                Show more
            </button>
        </motion.div>
    </motion.div>
);

const ProductCard = ({ details }) => {
    const router = useRouter();
    const navigate = (path: string) => {
        const normalizedPath = path.startsWith('/') ? path : `/${path}`;
        const parts = currentLoc.split('/').filter(Boolean);
        const langCode = parts.length > 0 && parts[0].length === 2 ? parts[0] : '';
        const newPath = langCode ? `/${langCode}${normalizedPath}` : normalizedPath;
        router.push(newPath);
    };

    const [quickAccess, setQuickAccess] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

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

    return (
        <div className="flex border transition flex-col max-w-52 rounded-lg shadow-sm pb-1">
            <div
                className="bg-slate-100 w-full overflow-hidden cursor-pointer h-56 flex relative justify-center"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <Image src={details.image} alt={details.title} fill />
                <AnimatePresence>
                    {quickAccess && <QuickAccess setIsModalOpen={setIsModalOpen} />}
                </AnimatePresence>
            </div>

            <div className="flex flex-col p-3 gap-3">
                <div>
                    <Link href={details.src}>
                        <h2 className="font-medium text-md truncate hover:text-secColor">
                            {details.title}
                        </h2>
                    </Link>
                    <p className="font-semibold text-start text-secColor">
                        {details.price} <span className="font-light">KWD</span>
                    </p>
                </div>
                <div className="flex items-center justify-between">
                    <Heart className="cursor-pointer hover:text-red-500 transition" />
                    <div className="flex bg-primaryColor px-3 py-2 rounded-md text-white items-center gap-2 hover:bg-secColor transition cursor-pointer">
                        <p className="text-sm font-medium hidden sm:block">
                            Add to cart
                        </p>
                        <p className="text-xl font-medium block sm:hidden">+</p>
                        <ShoppingCart />
                    </div>
                </div>
            </div>
            {isModalOpen && (
                
                <Modal
                    setIsModalOpen={setIsModalOpen}
                    setQuickAccess={setQuickAccess}
                />
            )}
        </div>
    );
};

export default ProductCard;