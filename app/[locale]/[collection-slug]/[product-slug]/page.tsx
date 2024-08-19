"use client";
import BreadCrumb from "@/components/Breadcrumb/BreadCrumb";
import CustomerReview from "@/components/CustomerReview/CustomerReview";
import ProductDetails from "@/components/ProductDetails/ProductDetails";
import React from "react";
import useCalcCartMutation from "@/hooks/calcCartMutation";
import useAuth from "@/hooks/useAuth";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";

export default function ProductPage({ params }) {
    // console.log(params)
    const axiosPrivate = useAxiosPrivate();
    const { auth }: any = useAuth();

    return (
        <section className="bg-gray-50 pb-5">
            <BreadCrumb />
            <ProductDetails
                params={params}
            />
            <CustomerReview />
        </section>
    );
}
