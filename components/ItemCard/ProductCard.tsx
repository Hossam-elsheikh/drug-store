'use client'
import React, { useState } from 'react'
import { Heart, ShoppingCart, Eye } from 'lucide-react'
import Modal from './Modal'
import { AnimatePresence, easeInOut, motion } from 'framer-motion'
import {
    AddToCart,
    addToWishList,
    removeProductFromWishList,
} from '@/axios/instance'
import useAuth from '@/hooks/useAuth'
import Image from 'next/image'
import { useLocale } from '@/context/LocaleProvider'
import { useFavorites } from '@/context/favoriteProvider'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { useLocalCart } from '@/hooks/useLocalCart'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import QuickAccess from './QuickAccess'
import { useRouter } from 'next/navigation'
import { Toaster, toast } from 'sonner'
import { Product } from '@/types'
export const getColorClass = (percentage: number) => {
    if (percentage <= 5) return 'bg-indigo-100 text-indigo-800'
    if (percentage <= 10) return 'bg-blue-100 text-blue-800'
    if (percentage <= 15) return 'bg-amber-100 text-amber-800'
    if (percentage <= 20) return 'bg-teal-100 text-teal-800'
    if (percentage <= 25) return 'bg-green-100 text-green-800'
    if (percentage <= 30) return 'bg-lime-100 text-lime-800'
    if (percentage <= 35) return 'bg-yellow-100 text-yellow-800'
    if (percentage <= 40) return 'bg-amber-100 text-amber-800'
    if (percentage <= 45) return 'bg-orange-100 text-orange-800'
    if (percentage <= 50) return 'bg-red-100 text-red-800'
    if (percentage <= 55) return 'bg-rose-100 text-rose-800'
    if (percentage <= 60) return 'bg-pink-100 text-pink-800'
    return 'bg-purple-100 text-purple-800'
}

type DataType = {
    product: object
}

const ProductCard = ({
    details,
    mode = 'default',
    index,
}: {
    details: Product
    mode: string
    index: string
}) => {
    const { toggleFavorite, isProductFavorite } = useFavorites()
    const { locale, dir } = useLocale()
    const [quickAccess, setQuickAccess] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const router = useRouter()
    const { auth }: any = useAuth()
    const t = useTranslations('Buttons')
    const p = useTranslations('ProductCard')

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

    const variants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    }

    const { _id, price, name, brand, image, description, sale, stock, slug } =
        details

    //add to cart handler with API call
    const queryClient = useQueryClient()
    const AddToCartMutation = useMutation({
        mutationFn: (product: object) => AddToCart(product, auth),
        onSuccess: () => {
            queryClient.invalidateQueries()
            toast.success('product added to cart Successfully!')
        },
        onError(error, variables, context) {
            toast.error('this product is out of stock')
        },
    })

    //add to cart handler with localStorage
    const { addToLocalCartDispatch } = useLocalCart()

    //add to wishList handler with API call
    const addProductToWishListMutation = useMutation({
        mutationFn: (productId: any) => addToWishList(productId, auth.userId),
        onSuccess: () => {
            queryClient.invalidateQueries()
            toast.success('product added to wish list Successfully')
        },
    })

    const removeProductFromWishListMutation = useMutation({
        mutationFn: (productId) =>
            removeProductFromWishList(auth.userId, productId),
        onSuccess: () => {
            queryClient.invalidateQueries()
            toast.success('product removed from wish list Successfully')
        },
    })
    const RemoveProductFromWishList = (productId: any) =>
        removeProductFromWishListMutation.mutate(productId)

    const imagePath = process.env.NEXT_PUBLIC_IMAGE_PATH

    return (
        <motion.div
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={{
                delay: Number(index) * 0.1,
                ease: easeInOut,
                duration: 0.5,
            }}
            viewport={{ amount: 0 }}
            // className="flex flex-col w-[200px] md:w-[220px] h-[340px] md:h-[350px] rounded-xl shadow-lg overflow-hidden bg-white hover:shadow-xl"
            className="flex flex-col  w-[170px] md:w-[200px] h-[310px] md:h-[330px] rounded-xl shadow-lg overflow-hidden bg-white hover:shadow-xl transition-shadow duration-300"
        >
            <div
                className="relative w-full h-60 overflow-hidden"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                dir={dir}
            >
                {sale > 0 && (
                    <span
                        className={`absolute inline-flex items-center px-3 py-1 z-30 text-xs font-medium gap-1 ${getColorClass(
                            sale
                        )} ${
                            dir === 'ltr' ? 'rounded-br-xl' : 'rounded-bl-xl'
                        }`}
                    >
                        <span className="items-center">{p('save')}</span> {sale}
                        %
                    </span>
                )}

                <Image
                    src={`${imagePath}${image}`}
                    alt={name?.en}
                    layout="fill"
                    sizes="100"
                    objectFit="cover"
                    className="transition-transform duration-300 hover:scale-110"
                />
                <AnimatePresence>
                    {quickAccess && (
                        <QuickAccess t={t} setIsModalOpen={setIsModalOpen} />
                    )}
                </AnimatePresence>
            </div>

            <div dir={dir} className="flex flex-col p-3 gap-3">
                <Link
                    className="cursor-pointer"
                    href={`/${locale}/${slug}/${_id}`}
                >
                    <div>
                        <h5 className="font-base text-xs md:text-sm">
                            {brand?.name?.[locale]}
                        </h5>
                        <h2 className="font-semibold text-md truncate text-primaryColor hover:text-[#45486e] transition-colors duration-200">
                            {name[locale as keyof typeof name]
                                .split(' ')
                                .map(
                                    (word) =>
                                        word.charAt(0).toUpperCase() +
                                        word.slice(1).toLowerCase()
                                )
                                .join(' ')}
                        </h2>

                        <p className="mt-1 text-primaryColor font-semibold flex items-center gap-1 text-lg">
                            {price}
                            <span className="font-medium text-xs">
                                {p('currency')}
                            </span>
                        </p>
                    </div>
                </Link>
                <div className="flex items-center p-1 justify-between gap-1">
                    <button
                        className="p-2 rounded-full hover:bg-gray-100 transition-all duration-200"
                        onClick={() =>
                            auth && auth?.userId
                                ? isProductFavorite(_id)
                                    ? RemoveProductFromWishList(details._id)
                                    : addProductToWishListMutation.mutate(
                                          details._id
                                      )
                                : toggleFavorite(details)
                        }
                    >
                        <Heart
                            className={`w-6 h-6 transition-all duration-300 delay-400 active:scale-[.96] ${
                                isProductFavorite(_id)
                                    ? 'text-red-500 fill-red-500'
                                    : 'text-gray-600 hover:text-red-500'
                            }`}
                        />
                    </button>
                   
                        <button
                            onClick={() =>
                                auth && auth?.userId
                                    ? AddToCartMutation.mutate(details)
                                    : addToLocalCartDispatch(details)
                            }
                            disabled={stock <= 0}
                            className="flex bg-primaryColor px-5 py-2 rounded-full text-white text-sm font-medium items-center gap-2 hover:bg-secColor transition-all duration-200 transform hover:scale-105 disabled:scale-100 disabled:bg-gray-600 disabled:cursor-not-allowed"
                        >
                            {stock > 0 ? <ShoppingCart size={20} /> : ''}
                            <p className="text-sm md:block">
                                {stock > 0 ? t('addToCart') : t('unAvailable')}
                            </p>
                        </button>
                
                </div>
            </div>
            {isModalOpen && (
                <Modal
                    details={details}
                    setIsModalOpen={setIsModalOpen}
                    setQuickAccess={setQuickAccess}
                />
            )}
        </motion.div>
    )
}

export default ProductCard

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
