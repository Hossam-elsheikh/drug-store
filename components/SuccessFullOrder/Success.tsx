'use client'
import { motion } from 'framer-motion'
import { Check, MoveRight } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import React from 'react'

function Success() {

    const router = useRouter()
    const t = useTranslations("Buttons");
    const s = useTranslations("SuccessPage");
    return (
        <section className=' w-full h-screen bg-gradient-to-b from-green-50 to-green-100 flex flex-col justify-center items-center p-4'>
            <div className='bg-white rounded-2xl shadow-lg max-w-lg w-full overflow-hidden'>
                <div className='bg-green-600 p-6 flex justify-center'>
                    <motion.span
                        className='p-3 bg-white bg-opacity-20 rounded-full'
                        whileHover={{
                            scale: [1, 1.1, 0.9, 1.05, 0.95, 1],
                            transition: {
                                duration: 0.6
                            }
                        }}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                            type: "spring",
                            stiffness: 260,
                            damping: 20,
                            delay: 0.4
                        }}
                    >
                        <Check className='text-white w-8 h-8' />
                    </motion.span>
                </div>
                <div className='p-8 space-y-6'>
                    <h1 className='text-3xl font-bold text-center text-gray-800'>
                        {s('thanksTitle')}
                    </h1>
                    <p className='text-center text-gray-600'>
                        We've received your order and will ship it in 5-7 business days.
                        Your order number is
                        <span className='font-semibold'>#B6CT3</span>.
                    </p>
                    <motion.button
                        onClick={() => router.push('/')}
                        className='w-full py-3 px-4 bg-green-600 hover:bg-green-700 transition-colors duration-300 rounded-full flex items-center justify-center gap-2 text-white font-semibold'
                        whileHover="hover"
                    >
                        {t('backToHome')}
                        <motion.span
                            variants={{
                                hover: { x: 10 }
                            }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                            <MoveRight className='w-5 h-5' />
                        </motion.span>
                    </motion.button>
                </div>
            </div>
        </section>
    )
}

export default Success