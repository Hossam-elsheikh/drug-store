'use client'
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { availablePayment } from '@/axios/instance'
import Image from 'next/image'
import Select from 'react-select'

type DataType = {
    setPaymentMethodId:any
}

const AvailablePayment = ({setPaymentMethodId}:DataType) => {

    const InvoiceAmount = 1

    const {
        data: pays,
        isLoading: payLoading,
        error: payError,
    } = useQuery({
        queryFn: () => availablePayment(InvoiceAmount),
        queryKey: ['pays'],
    })
    if (payLoading) return <p>pays loading...</p>;
    if (payError) return <h1>No available payment methods for now</h1>

    const options = pays?.data.Data.PaymentMethods.map((pay: any) => ({
        value: pay.PaymentMethodEn,
        label: (
            <div className="flex items-center space-x-2">
                <Image 
                    src={pay.ImageUrl} 
                    width={50}
                    height={50}
                    alt={pay.PaymentMethodEn}
                    className="inline-block"
                />
                <span>{pay.PaymentMethodEn}</span>
            </div>
        ),
    }))

    console.log(options);
    

    return (
        <div className=''>
            {pays ? (
                <div >
                    <Select
                        options={[...options]} 
                        id="paymentMethods"
                        name="paymentMethods"
                        className='pt-3'
                    />
                </div>
            ) : (
                <p>No available payment methods for now</p>
            )}
        </div>
    )
}

export default AvailablePayment