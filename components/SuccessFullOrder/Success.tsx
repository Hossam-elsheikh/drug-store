'use client'
import { getOrder, getUserOrders, paymentStatus, setOrderPaymentSuccessStatus } from '@/axios/instance'
import { useLocale } from '@/context/LocaleProvider'
import useAuth from '@/hooks/useAuth'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'
import { PaymentStatus, SetOrderPaymentStatus, UserAuth } from '@/types'
import { useMutation, useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { Check, MoveRight } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

function Success() {

    const t = useTranslations("Buttons");
    const s = useTranslations("SuccessPage");

    const searchParams = useSearchParams()
    const paymentId = searchParams.get('paymentId')
    const orderId = searchParams.get('orderId')
    const { auth }: any = useAuth()
    const router = useRouter()
    const {locale}:any=useLocale()

    const paymentStatusMutation = useMutation({
        mutationFn: (Key: any) => paymentStatus(Key),
        onSuccess(data) {
            // console.log(data);
            if (auth && auth.userId) {
                setOrderPaymentStatusMutation.mutate({
                    orderId: data.Data.CustomerReference,
                    userId: auth.userId,
                    InvoiceStatus:data.Data.InvoiceStatus
                })
            }
        },
        onError(error) {
            console.error('Error while getting payment status', error);
        },
    });

    const setOrderPaymentStatusMutation = useMutation({
        mutationFn: ({ orderId, userId, InvoiceStatus }: any) => setOrderPaymentSuccessStatus({ orderId, userId, InvoiceStatus }),
        onSuccess(data) {
            console.log(data);
            getUserOrders(auth.userId)
        },
        onError(error) {
            console.error(error);
        },
    })

    useEffect(() => {
        if (!auth?.userId ) {
            router.push(`/${locale}`)
        }
        if (paymentId) {
            paymentStatusMutation.mutate(paymentId);
        }
        if(orderId){
            setOrderPaymentStatusMutation.mutate({
                orderId: orderId,
                userId: auth.userId,
                InvoiceStatus:"Pending"
            })
        }
    }, [])
    if (!auth?.userId ) return null;

    return (
        <section className=' w-full h-screen bg-gradient-to-b from-green-50 to-green-100 flex flex-col justify-center items-center p-4'>
            <div className='bg-white rounded-2xl shadow-lg max-w-3xl w-full overflow-hidden'>
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
                    
                    <h1 className='text-[30px] font-bold text-center text-gray-800'>
                        {s('title')}
                    </h1>

                    <p className='text-center text-[25px] font-medium text-gray-800'>
                        {s('orderConfirmed')}
                    </p>

                    <p className='text-center text-[15px] text-gray-600'>
                        {s('orderProcessing')}
                    </p>

                    <p className='text-center text-[15px] text-gray-600'>
                        {s('nextSteps')}
                    </p>

                    <p className='text-center text-sm text-gray-600'>
                        {s('customerSupport')}
                    </p>

                    <motion.button
                        onClick={() => window.location.href = '/'}
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