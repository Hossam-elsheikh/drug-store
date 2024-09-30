"use client";
import BreadCrumb from "@/components/Breadcrumb/BreadCrumb";
import ProductDetails from "@/components/ProductDetails/ProductDetails";
import React from "react";
import { ProductDetailsProps } from '@/types'

export default function ProductPage({ params }: ProductDetailsProps) {
    console.log('params',params)

    return (
        <main className="bg-gray-50 pb-5 mt-8">
            {/* <BreadCrumb /> */}
            <ProductDetails
                params={params}
            />
        </main>
    );
}
