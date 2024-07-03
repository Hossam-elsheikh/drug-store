"use client";
import Image from "next/image";
import Link from "next/link";
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

function Modal({ setIsModalOpen, setQuickAccess, details }) {
    let [isOpen, setIsOpen] = useState(true);

    useEffect(() => {
        setIsModalOpen(isOpen);
        setQuickAccess(isOpen);
    }, [isOpen, setIsModalOpen, setQuickAccess]);

    const closeModal = () => {
        setIsOpen(false);
    };

    return (
        <>
            {isOpen && (
                <Dialog static open={isOpen} onClose={closeModal} className="relative z-50">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, transition: { duration: 0.3 } }}
                        className="fixed inset-0 bg-black/30"
                    />
                    <div className="fixed inset-0 flex items-center justify-center p-4">
                        <DialogPanel
                            as={motion.div}
                            initial={{ opacity: 0, scale: 0.85 }}
                            animate={{ opacity: 1, scale: 1, transition: { duration: 0.3 } }}
                            exit={{ opacity: 0, scale: 0.80, transition: { duration: 0.3 } }}
                            className="w-full max-w-2xl bg-white rounded-lg overflow-hidden shadow-xl relative"
                        >
                            <button
                                onClick={closeModal}
                                className="absolute top-2 right-2 text-gray-500  p-1  hover:text-gray-700 z-10"
                            >
                                <X size={24} />
                            </button>
                            <div className="flex p-5">
                                <div className="w-1/2 relative size-[300px] p-10">
                                    <Image
                                        src={details.image || "https://images.unsplash.com/photo-1547489432-cf93fa6c71ee?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                                        alt={details.title || "Image"}
                                        layout="fill"
                                        objectFit="cover"
                                        className=" duration-[2s] transition-all"
                                       
                                    />
                                </div>

                                <div className="w-1/2 p-6 space-y-4">
                                    <DialogTitle className="text-xl font-bold">
                                        <Link href={details.src} className="hover:text-secColor">
                                            {details.title}
                                        </Link>
                                    </DialogTitle>

                                    <p className="text-gray-600">
                                        {details.description || "Product description goes here. This is a placeholder text."}
                                    </p>

                                    <div className="space-y-2">
                                        <p className="font-semibold">Price: ${details.price || "N/A"}</p>
                                        <p>Availability: {details.availability || "In Stock"}</p>
                                    </div>

                                    <div className="flex gap-4 pt-4">
                                        <button
                                            className="px-4 py-2 bg-secColor text-white rounded hover:bg-opacity-90 active:scale-95 transition"
                                        >
                                            Add to Cart
                                        </button>
                                        <button
                                            onClick={closeModal}
                                            className="px-4 py-2 border border-gray-300 rounded active:scale-95  hover:bg-gray-100 transition"
                                        >
                                            Close
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </DialogPanel>
                    </div>
                </Dialog>
            )}
        </>
    );
}

export default Modal;