// ProductsCarousel.tsx
"use client";
import React, { useContext, useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import ProductCard, { ProductCardSkeleton } from "../ItemCard/ProductCard";
import classes from "./product-carousel.module.css";
import { Product, ProductsContext } from "@/context/ProductsProvider";
import NotFound from "@/app/not-found";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/axios/instance";

type ProductsProp = {
    mode: string;
    catId: string
};

export default function ProductsCarousel({ mode, catId }: ProductsProp) {
    const context = useContext(ProductsContext);
    const productsQuery = useQuery({
        queryKey: [catId],
        queryFn: () => getProducts({ category: catId })

    })
    if (!context) {
        return <h2 className={classes.error}>No products context available</h2>;
    }

    const { products, isLoading, isError, error } = context;
console.log(products);

    const breakpoints = mode === "full"
        ? {
            0: {
                slidesPerView: 2,
                spaceBetween: 2,
            },
            663: {
                slidesPerView: 3,
                spaceBetween: 2,
            },
            768: {
                slidesPerView: 3,
                spaceBetween: 1,
            },
            1024: {
                slidesPerView: 4,
                spaceBetween: 2,
            },
            1280: {
                slidesPerView: 5,
                spaceBetween: 2,
            },
            1600: {
                slidesPerView: 6,
                spaceBetween: 2,
            },
            1800: {
                slidesPerView: 6,
                spaceBetween: 2,
            },
        }
        : {
            0: {
                slidesPerView: 2,
                spaceBetween: 2,
            },
            480: {
                slidesPerView: 2,
                spaceBetween: 1,
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 1,
            },
            1024: {
                slidesPerView: 2,
                spaceBetween: 2,
            },
            1280: {
                slidesPerView: 3,
                spaceBetween: 2,
            },
            1600: {
                slidesPerView: 3,
                spaceBetween: 2,
            },
            1800: {
                slidesPerView: 4,
                spaceBetween: 2,
            },
        };


    if (isError) {
        <NotFound />;
    }

    return (
        <Swiper
            navigation
            loop={true}
            centerInsufficientSlides
            className={classes.swiper}
            pagination={{ clickable: true }}
            modules={[Autoplay, Pagination, Navigation, A11y]}
            breakpoints={breakpoints}
        >
            {productsQuery?.isLoading
                ? [1, 2, 3, 4, 5, 6, 7].map((i) => (
                    <SwiperSlide key={i}>
                        <ProductCardSkeleton />
                    </SwiperSlide>
                ))
                : productsQuery?.data?.products?.map((prod: Product) => (
                    <SwiperSlide key={prod._id}>
                        <ProductCard details={prod} index={prod._id} mode="default" />
                    </SwiperSlide>
                ))}
        </Swiper>
    );
}
