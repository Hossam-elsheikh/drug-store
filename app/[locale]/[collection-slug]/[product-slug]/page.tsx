"use client";
import BreadCrumb from "@/components/Breadcrumb/BreadCrumb";
import ProductDetails from "@/components/ProductDetails/ProductDetails";
import React from "react";

export default function ProductPage({ params }: ProductDetailsProps) {
    console.log('params',params)

    return (
        <section className="bg-gray-50 pb-5">
            <BreadCrumb />
            <ProductDetails
                params={params}
            />
        </section>
    );
}
