"use client";
import BreadCrumb from "@/components/Breadcrumb/BreadCrumb";
import CustomerReview from "@/components/CustomerReview/CustomerReview";
import ProductDetails from "@/components/ProductDetails/ProductDetails";
import React from "react";

export default function ProductPage({params}) {
    // console.log(params)
    return (
        <section className="bg-gray-50 pb-5">
            <BreadCrumb />
            <ProductDetails params={params}/>
            <CustomerReview/>
        </section>
    );
}
