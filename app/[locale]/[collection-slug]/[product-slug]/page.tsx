'use client'
import BreadCrumb from '@/components/Breadcrumb/BreadCrumb'
import CustomerReview from '@/components/CustomerReview/CustomerReview'
import ProductDetails from '@/components/ProductDetails/ProductDetails'
import React from 'react'

export default function ProductPage() {
    return (
        <section className='bg-gray-100 pb-5'>
            <div className='ml-10 p-5'>

                <BreadCrumb />
            </div>


            <ProductDetails />


        </section>
    )
}


