'use client'
import Image from 'next/image'
import Link from 'next/link'
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { X, Eye, Heart } from 'lucide-react'
import { useFavorites } from '@/context/favoriteProvider'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useLocale } from '@/context/LocaleProvider'
import { getColorClass } from '@/lib/utils'

function Modal({ setIsModalOpen, setQuickAccess, details }:any) {
    const { locale, dir } = useLocale()
    let [isOpen, setIsOpen] = useState(true)
    const { toggleFavorite, isProductFavorite } = useFavorites()
    const t = useTranslations("Buttons");
    const p = useTranslations("ProductCard");
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
        sale,
        category: { slug },
    } = details

    const imagePath = process.env.NEXT_PUBLIC_IMAGE_PATH

    const variants = {
        hidden: { opacity: 0, y: 20, scale: 0.95 },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: { duration: 0.3 }
        },
    };
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
                        initial={{ opacity: 0, }}
                        animate={{ opacity: 1, }}
                        exit={{ opacity: 0, transition: { duration: 0.3 } }}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
                    />
                    <div className="fixed inset-0 flex items-center justify-center p-4">
                        <DialogPanel
                            as={motion.div}
                            variants={variants}
                            initial='hidden'
                            animate='visible'
                            exit='hidden'
                            className="w-full max-w-3xl bg-white rounded-2xl overflow-hidden shadow-2xl relative"
                        >
                            <button
                                onClick={closeModal}
                                className="absolute top-4 right-4 text-gray-200 hover:text-gray-600 transition-all duration-200 z-10"
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
                                        className="duration-300 transition-all hover:scale-[1.02]"
                                    />
                                </div>

                                <div className="w-full md:w-1/2 p-8 justify-around flex flex-col">
                                    <DialogTitle className="flex flex-col space-y-4 text-2xl font-bold text-gray-800">
                                        <h1 className="font-base text-sm">
                                            {brand?.name?.[locale]}
                                        </h1>
                                        <Link
                                            href={`/${locale}/${slug}/${_id}`}
                                            className="text-primaryTextColor hover:text-[#45486e]  transition-colors duration-200"
                                        >
                                            {name[locale] || ''}
                                        </Link>
                                    </DialogTitle>


                                    <p className="text-gray-600 leading-relaxed">
                                        {description?.[locale]}
                                    </p>

                                    <div className="p-4 text-primaryTextColor hover:text-[#45486e]  font-semibold flex text-2xl gap-5 justify-around">
                                        <div>
                                            <span className="font-medium text-sm">
                                                KWT
                                            </span>
                                            {price}

                                        </div>
                                        {sale &&
                                            <span className={` inline-flex items-center px-3 py-1 z-30 text-xs font-medium gap-1 ${getColorClass(sale)} rounded-full`}>
                                                <span className='items-center'>{p('save')}</span> {sale}%
                                            </span>
                                        }
                                    </div>

                                    <div className="flex gap-4">

                                        <button
                                            className="flex-1 px-6 py-3 bg-primaryColor text-white rounded-full hover:bg-[#45486e]active:scale-[.99] transition-all duration-200 flex items-center justify-center gap-2"
                                            onClick={() =>
                                                router.push(
                                                    `/${locale}/${slug}/${_id}`
                                                )
                                            }
                                        >
                                            <Eye className="w-5 h-5" />
                                            {t('showMore')}
                                        </button>
                                        <button
                                            className={`group p-3 border border-gray-400 rounded-full hover:border-gray-500 hover:bg-gray-200 active:scale-[.96] transition-all duration-300  ${isProductFavorite(_id)
                                                ? ' bg-red-100 text-red-700'
                                                : 'text-gray-600 hover:text-red-500'}`}
                                            onMouseDown={() => toggleFavorite(details)}
                                        >
                                            <Heart
                                                size={20}
                                                className={` transition-all duration-300 delay-400 ${isProductFavorite(_id)
                                                    ? 'text-red-500 fill-red-500'
                                                    : 'text-gray-600 group-hover:text-red-500'
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
