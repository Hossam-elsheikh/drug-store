'use client'
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { availablePayment } from '@/axios/instance'
import Image from 'next/image'

const AvailablePayment = () => {

    const InvoiceAmount = 100

    const { 
        data: pays, 
        isLoading:payLoading,
        error: payError,
    } = useQuery({
        queryFn: () => availablePayment(InvoiceAmount),
        queryKey: ['pays'],
    })    
    if (payLoading) return <p>pays loading...</p>;
    if (payError) return <h1>error while fetching pays</h1>

    return (
        <div className='border rounded-md '>
            {pays ? (
                <div className='space-x-5 p-5 space-y-2 grid grid-cols-7 items-center'>
                    {pays.data.Data.PaymentMethods.map((pay: any) => (
                        <div id={pay.id} className='  '>
                            <div className=' '>
                                <Image 
                                src={pay.ImageUrl} 
                                className='' 
                                width={100}
                                height={100}
                                alt='image'
                                />
                                <p className=' text-center font-medium text-xs line-clamp-1'>{pay.PaymentMethodEn}</p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <>
                    no Available Payments for now
                </>
            )}
        </div>
    )
}

export default AvailablePayment