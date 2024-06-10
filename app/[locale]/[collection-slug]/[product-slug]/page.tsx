'use client'
import BreadCrumb from '@/components/Breadcrumb/BreadCrumb'
import ProductsCarousel from '@/components/Carousels/ProductsCarousel'
import Container from '@/components/Container'
import CustomerReview from '@/components/CustomerReview/CustomerReview'
import ProductDetails from '@/components/ProductDetails/ProductDetails'
import SecSideBanar from '@/components/ProductDetails/SecSideBanar'
import ReviewComment from '@/components/ReviewComment/ReviewComment'
import React from 'react'

export default function ProductPage() {
    return (
        <section className='bg-gray-100  '>
            <div className='ml-10 p-5'>

                <BreadCrumb />
            </div>


            <ProductDetails />
            <h1 className='text-lg'>Comments</h1>
      
            {/* <CustomerReview /> */}


        </section>
    )
}


