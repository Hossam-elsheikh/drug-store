"use client";
import Image from "next/image";
import React, { useState } from "react";
import { Heart, ShoppingCart } from "lucide-react";
import Link from "next/link";
import Modal from "./Modal";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import { instancePrivate } from "@/axios/instance";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";

const QuickAccess = ({ setIsModalOpen }: any) => (
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
            <button className="bg-white px-5 py-3 rounded-full font-medium text-sm">
                Show more
            </button>
        </motion.div>
    </motion.div>
);

const ProductCard = ({ details, mode = "default" }) => {
    const router = useRouter();
    // const navigate = (path: string) => {
    //     const normalizedPath = path.startsWith("/") ? path : `/${path}`;
    //     const parts = currentLoc.split("/").filter(Boolean);
    //     const langCode =
    //         parts.length > 0 && parts[0].length === 2 ? parts[0] : "";
    //     const newPath = 
    //         ? `/${langCode}${normalizedPath}`
    //         : normalizedPath;
    //     router.push(newPath);
    // };

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

    const { auth }: any = useAuth()
    const axiosPrivate = useAxiosPrivate()

    const addToCart = async(productId,)=>{
        try{
            const response = await axiosPrivate.post('/user/cart',{
                userId:auth.userId,
                productId: productId,
                quantity:1
            })
            console.log(response);
            return response
        }catch(error){
            console.error('error while adding product to cart',error);
        }
    }

    // const addToCart = async (product: any) => {
    //     console.log(product);
        
    //     try {
    //         const response = await axiosPrivate.post('/order', {
    //             cart: [{
    //                 id: product._id,
    //                 title: product.name.en,
    //                 image:product.image,
    //                 quantity: 1,
    //                 unitPrice: product.price,
    //                 netPrice: product.price
    //             }],
    //             customerId: auth.userId,
    //         });
    //         console.log(response);
    //     } catch (err) {
    //         console.error('error while adding to cart', err);
    //     }
    // }

    return (
        <div className="flex border transition flex-col max-w-52 rounded-lg shadow-sm pb-1">
            <div
                className="bg-slate-100 w-full overflow-hidden cursor-pointer h-56 flex relative justify-center"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <Image src={`http://localhost:4000/uploads/photos/${details.image}`} alt= {details.name?.en} fill />
                <AnimatePresence>
                    {quickAccess && (
                        <QuickAccess setIsModalOpen={setIsModalOpen} />
                    )}
                </AnimatePresence>
            </div>

            <div className="flex flex-col p-3 gap-3">
                <div>
                    {/* <Link href={details.src}> */}
                    <h2 className="font-medium text-md truncate hover:text-secColor">
                        {details.name?.en}
                    </h2>
                    {/* </Link> */}
                    <p className="font-semibold text-start text-secColor">
                        {details.price} <span className="font-light">KWD</span>
                    </p>
                </div>
                <div className="flex items-center justify-between">
                    <Heart className="cursor-pointer hover:text-red-500 transition" />
                    <div onClick={() => addToCart(details._id)} className="flex bg-primaryColor px-3 py-2 rounded-md text-white items-center gap-2 hover:bg-secColor transition cursor-pointer">
                        <p className="text-sm font-medium hidden sm:block">
                            Add to cart
                        </p>

                    </div>
                    <div
                        className={`flex items-center  ${mode === "default"
                            ? "justify-between"
                            : "items-center justify-center"
                            }`}
                    >
                        <Heart className="cursor-pointer hover:text-red-500 transition" />
                        {mode === "default" && (
                            <button className="flex bg-primaryColor px-3 py-2 rounded-md text-white items-center gap-2 hover:bg-secColor transition cursor-pointer">
                                Add to cart
                                <ShoppingCart />
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
        </div>
    );
};

export default ProductCard;
