

'use client'
import React, { useState } from 'react'
import { Heart, ShoppingCart, Eye } from 'lucide-react'
import Modal from './Modal'
import { AnimatePresence, easeInOut, motion } from 'framer-motion'
import { AddToCart, instancePrivate } from '@/axios/instance'
import useAuth from '@/hooks/useAuth'
import Image from 'next/image'
import { useLocale } from '@/context/LocaleProvider'
import { useFavorites } from '@/context/favoriteProvider'
import Link from 'next/link'
const ProductCard = ({ details, mode = 'default', index }) => {
    
    const { toggleFavorite, isProductFavorite } = useFavorites()
    const { locale } = useLocale()
    const [quickAccess, setQuickAccess] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const { auth }: any = useAuth()

    const handleMouseEnter = () => {
        if (!isModalOpen) {
            setQuickAccess(true)
        }
    }

    const handleMouseLeave = () => {
        if (!isModalOpen) {
            setQuickAccess(false)
        }
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
    
    const addToCart = (product:any)=> AddToCart(product,auth)

    const variants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    }

    const imagePath = process.env.NEXT_PUBLIC_IMAGE_PATH
    return (
        <motion.div
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={{ delay: index * 0.1, ease: easeInOut, duration: 0.5 }}
            viewport={{ amount: 0 }}
            className="flex flex-col  w-[170px] md:w-[220px] h-[300px] md:h-[350px] rounded-xl shadow-lg overflow-hidden bg-white hover:shadow-xl transition-shadow duration-300"
        >
            <div
                className="relative w-full h-60 overflow-hidden"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <Image
                    src={`${imagePath}${image}`}
                    alt={name?.en}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-300 hover:scale-110 "
                />
                <AnimatePresence>
                    {quickAccess && (
                        <QuickAccess setIsModalOpen={setIsModalOpen} />
                    )}
                </AnimatePresence>
            </div>

            <div className="flex flex-col p-3 gap-3">
                <Link
                    className="cursor-pointer"
                    href={`/${locale}/${slug}/${_id}`}
                >
                    <div>
                        <h5 className="font-base text-xs md:text-sm">
                            {brand?.name?.[locale]}
                        </h5>
                        <h2 className="font-semibold text-md  truncate hover:text-secColor transition-colors duration-200">
                            {name?.[locale]}
                        </h2>
                      
                        <p className="mt-1 text-secColor font-semibold flex items-center gap-1 text-lg">
                            {price}
                            <span className="font-medium text-xs">KWD</span>
                        </p>
                    </div>
                </Link>
                <div className="flex items-center justify-around gap-4">
                    <button
                        className="p-2 rounded-full hover:bg-gray-100 transition-all duration-200 "
                        onClick={() => toggleFavorite(details)}
                    >
                        <Heart
                            className={`w-6 h-6 transition-all duration-300 delay-400 ${
                                isProductFavorite(_id)
                                    ? 'text-red-500 fill-red-500'
                                    : 'text-gray-600 hover:text-red-500'
                            }`}
                        />
                    </button>
                    {mode === 'default' ? (
                        <button
                            onClick={() => {
                                addToCart(details)
                            }}
                            className="flex bg-primaryColor px-4 py-2 rounded-full text-white text-sm font-medium items-center gap-2 hover:bg-secColor transition-all duration-200 transform hover:scale-105"
                        >
                            <p className='hidden md:block'>
                                Add to cart
                                </p>
                            <ShoppingCart className="w-5 h-5" />
                        </button>
                    ) : (
                        <button className="flex bg-primaryColor px-4 py-2 rounded-full text-white text-sm font-medium items-center gap-2 hover:bg-secColor transition-all duration-200 transform hover:scale-105">
                            Show more
                            <Eye className="w-5 h-5" />
                        </button>
                    )}
                </div>
            </div>
            {isModalOpen && (
                <Modal
                    locale={locale}
                    details={details}
                    setIsModalOpen={setIsModalOpen}
                    setQuickAccess={setQuickAccess}
                />
            )}
        </motion.div>
    )
}

export default ProductCard

const QuickAccess = ({ setIsModalOpen }) => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{
            opacity: 1,
            transition: { duration: 0.3 },
        }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 z-20 flex justify-center items-center bg-black bg-opacity-50 backdrop-blur-sm"
    >
        <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 10, opacity: 0 }}
            transition={{ duration: 0.2 }}
        >
            <button
                onClick={() => setIsModalOpen(true)}
                className="bg-white px-6 py-3 rounded-full text-primaryColor hover:bg-secColor hover:text-white font-medium transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-secColor focus:ring-opacity-50"
            >
                Quick View
            </button>
        </motion.div>
    </motion.div>
)

export const ProductCardSkeleton = () => (
    <div className="flex flex-col max-w-sm rounded-xl shadow-lg overflow-hidden bg-white animate-pulse">
        <div className="w-full h-64 bg-gray-300"></div>
        <div className="flex flex-col p-4 gap-3">
            <div className="h-6 bg-gray-300 rounded w-3/4"></div>
            <div className="h-8 bg-gray-300 rounded w-1/2"></div>
            <div className="flex items-center justify-between mt-2">
                <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                <div className="w-32 h-10 bg-gray-300 rounded-full"></div>
            </div>
        </div>
    </div>
)
