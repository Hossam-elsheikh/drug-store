'use client'

import { paymentStatus, setOrderPaymentStatus, setPaymentFailure } from '@/axios/instance';
import useAuth from '@/hooks/useAuth';
import { useMutation } from '@tanstack/react-query';
import { CircleX, MoveRight, OctagonAlert } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl';

function OrderError() {

    const [orderErrorMessage, setOderErrorMessage] = useState('')

    const t = useTranslations("Buttons");
    const localization = useTranslations("ErrorOrderPage");

    const searchParams = useSearchParams()
    const paymentId = searchParams.get('paymentId')
    const { auth }: any = useAuth()

    const paymentStatusMutation = useMutation({
        mutationFn: (Key: any) => paymentStatus(Key),
        onSuccess(data) {
            const transactions = data.Data.InvoiceTransactions;
            setOderErrorMessage(transactions[0].Error)
            if (auth && auth.userId) {
                const transaction = transactions[0];                
                setPaymentFailureMutation.mutate({
                    orderId: data.Data.CustomerReference,
                    TransactionStatus: transaction.TransactionStatus,
                    Error: transaction.Error,
                    ErrorCode: transaction.ErrorCode,
                });
            }
        },
        onError(error) {
            console.error('Error while getting payment status', error);
        },
    });
    const setPaymentFailureMutation = useMutation({
        mutationFn: ({ orderId,TransactionStatus,Error, ErrorCode }: any) => setPaymentFailure({ orderId,TransactionStatus,Error, ErrorCode }),
        onSuccess(data) {
            console.log(data);
        },
        onError(error) {
            console.error(error);
        },
    })
    useEffect(() => {
        if (paymentId) {
            paymentStatusMutation.mutate(paymentId);
        }
    }, [])

    return (
        <div>
            <section className=' w-full h-screen bg-gradient-to-b from-red-50 to-red-100 flex flex-col justify-center items-center p-4'>
                <div className='bg-white rounded-2xl shadow-lg max-w-3xl w-full overflow-hidden'>
                    <div className='bg-red-600 p-6 flex justify-center'>
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
                            <CircleX className='text-white w-8 h-8' />
                        </motion.span>
                    </div>
                    <div className='p-8 space-y-6'>
                        <h1 className='text-[30px] font-bold text-center text-gray-800'>
                            {localization('title')}
                        </h1>

                        <p className='text-center text-[25px] font-medium text-gray-800'>
                            {orderErrorMessage}
                        </p>

                        <p className='text-center text-[18px] text-gray-800'>
                            {localization("attemptAgain")}
                        </p>

                        <p className='text-center text-sm  text-gray-600'>
                            {localization('customerSupport')}
                        </p>
                        
                        <motion.button
                            onClick={() => window.location.href = '/'}
                            className='w-full py-3 px-4 bg-red-600 hover:bg-red-700 transition-colors duration-300 rounded-full flex items-center justify-center gap-2 text-white font-semibold'
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
        </div>
    )
}

export default OrderError