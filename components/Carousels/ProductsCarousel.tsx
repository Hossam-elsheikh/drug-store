// ProductsCarousel.tsx
"use client";
import React, { useContext, useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import ProductCard from "../ItemCard/ProductCard";
import classes from "./product-carousel.module.css";
import { Product, ProductsContext } from "@/context/ProductsProvider";


type ProductsProp = {
    mode: string;
};

export default function ProductsCarousel({ mode }: ProductsProp) {
    const context = useContext(ProductsContext);

    if (!context) {
        return <h2 className={classes.error}>No products context available</h2>;
    }

    const { products, isLoading, isError, error } = context;

    const breakpoints = useMemo(() => {
        return mode === "full"
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
                    slidesPerView: 7,
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
    }, [mode]);

    if (isError) {
        return <h2 className={classes.error}>Error loading products</h2>;
    }

    return (
        <Swiper
            slidesPerView={5}
            navigation
            loop={true}
            centerInsufficientSlides
            className={classes.swiper}
            pagination={{ clickable: true }}
            modules={[Autoplay, Pagination, Navigation, A11y]}
            breakpoints={breakpoints}
        >
            {isLoading
                ? [1, 2, 3, 4, 5, 6, 7].map((i) => (
                    <SwiperSlide key={i}>
                        <LoadingSkeleton />
                    </SwiperSlide>
                ))
                : products?.data.products.map((prod: Product, id: number) => (
                    <SwiperSlide key={id}>
                        <ProductCard details={prod} />
                    </SwiperSlide>
                ))}
        </Swiper>
    );
}

const LoadingSkeleton = () => (
    <div className="flex border transition flex-col max-w-52 rounded-lg shadow-sm pb-1 h-full">
        <div className="bg-slate-100 w-full overflow-hidden cursor-pointer h-56 flex relative justify-center">
            <div className="w-full h-full rounded-lg bg-gray-300 animate-pulse"></div>
        </div>
        <div className="flex flex-col p-3 gap-3">
            <div>
                <div className="h-4 w-3/4 mb-2 bg-gray-300 animate-pulse rounded-lg"></div>
                <div className="h-4 w-1/2 bg-gray-300 animate-pulse rounded-lg"></div>
            </div>
            <div className="flex items-center justify-between">
                <div className="w-6 h-6 rounded-full bg-gray-300 animate-pulse"></div>
                <div className="h-8 w-24 rounded-md bg-gray-300 animate-pulse"></div>
            </div>
        </div>
    </div>
);
