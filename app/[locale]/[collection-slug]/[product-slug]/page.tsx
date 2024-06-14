"use client";
import BreadCrumb from "@/components/Breadcrumb/BreadCrumb";
import CustomerReview from "@/components/CustomerReview/CustomerReview";
import ProductDetails from "@/components/ProductDetails/ProductDetails";
import React from "react";

export default function ProductPage() {
	return (
		<section className="bg-gray-50 pb-5">
			<BreadCrumb />
			<ProductDetails />
		</section>
	);
}
