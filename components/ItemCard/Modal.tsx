'use client'
import Image from 'next/image'
import Link from 'next/link'
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { X, Eye, Heart } from 'lucide-react'
import { useFavorites } from '@/context/favoriteProvider'
import { useRouter } from 'next/navigation'

function Modal({ setIsModalOpen, setQuickAccess, details, locale }) {
    let [isOpen, setIsOpen] = useState(true)
    const { toggleFavorite, isProductFavorite } = useFavorites()
    const router = useRouter()
    useEffect(() => {
        setIsModalOpen(isOpen)
        setQuickAccess(isOpen)
    }, [isOpen, setIsModalOpen, setQuickAccess])

    const closeModal = () => {
        setIsOpen(false)
    }

    const {
        _id,
        price,
        name,
        brand,
        image,
        description,
        category: { slug },
    } = details

    const imagePath = process.env.NEXT_PUBLIC_IMAGE_PATH
    return (
        <>
            {isOpen && (
                <Dialog
                    static
                    open={isOpen}
                    onClose={closeModal}
                    className="relative z-50"
                >
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, transition: { duration: 0.3 } }}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
                    />
                    <div className="fixed inset-0 flex items-center justify-center p-4">
                        <DialogPanel
                            as={motion.div}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                                transition: { duration: 0.3 },
                            }}
                            exit={{
                                opacity: 0,
                                scale: 0.95,
                                transition: { duration: 0.3 },
                            }}
                            className="w-full max-w-3xl bg-white rounded-2xl overflow-hidden shadow-2xl relative"
                        >
                            <button
                                onClick={closeModal}
                                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors duration-200 z-10"
                            >
                                <X size={24} />
                            </button>
                            <div className="flex flex-col md:flex-row">
                                <div className="w-full md:w-1/2 relative h-64 md:h-[400px]">
                                    <Image
                                        src={`${imagePath}${image}`}
                                        alt={name?.en}
                                        layout="fill"
                                        objectFit="cover"
                                        className="duration-[2s] transition-all hover:scale-105"
                                    />
                                </div>

                                <div className="w-full md:w-1/2 p-8 space-y-6">
                                    <DialogTitle className="text-2xl font-bold text-gray-800">
                                        <h1 className="font-base text-sm">
                                            {brand?.name?.[locale]}
                                        </h1>
                                        <Link
                                            href={`/${locale}/${slug}/${_id}`}
                                            className="hover:text-secColor transition-colors duration-200"
                                        >
                                            {name?.[locale]}
                                        </Link>
                                    </DialogTitle>

                                    <p className="text-gray-600 leading-relaxed">
                                        {description?.[locale]}
                                    </p>

                                    <div className="space-y-2">
                                    
                                            <p className="mt-1 text-secColor font-semibold flex gap-1 text-2xl">
                                                            <span className="font-medium text-sm">
                                                                KWT
                                                            </span>
                                                            {price}
                                                        </p>
                                    </div>

                                    <div className="flex gap-4 pt-6">
                                        {/* <button
                                            className="flex-1 px-6 py-3 bg-secColor text-white rounded-full hover:bg-opacity-90 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2"
                                        >
                                            <ShoppingCart size={20} />
                                            Add to Cart
                                        </button> */}
                                        <button
                                            className="flex-1 px-6 py-3 bg-secColor text-white rounded-full hover:bg-opacity-90 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2"
                                            onClick={() =>
                                                router.push(
                                                    `/${locale}/${slug}/${_id}`
                                                )
                                            }
                                        >
                                            Show more
                                            <Eye className="w-5 h-5" />
                                        </button>
                                        <button
                                            className="p-3 border border-gray-300 rounded-full hover:bg-gray-100 active:scale-95 transition-all duration-200"
                                            onMouseDown={() =>
                                                toggleFavorite(details)
                                            }
                                        >
                                            <Heart
                                                size={20}
                                                className={` transition-all duration-300 delay-400 ${
                                                    isProductFavorite(_id)
                                                        ? 'text-red-500 fill-red-500'
                                                        : 'text-gray-600 hover:text-red-500'
                                                }`}
                                            />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </DialogPanel>
                    </div>
                </Dialog>
            )}
        </>
    )
}

export default Modal
