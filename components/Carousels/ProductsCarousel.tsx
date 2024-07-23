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
        <NotFound />
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
                        <ProductCardSkeleton />
                    </SwiperSlide>
                ))
                : products?.map((prod: Product, id: number) => (
                    <SwiperSlide key={id}>
                        <ProductCard  details={prod} index={id} />
                    </SwiperSlide>
                ))}
        </Swiper>
    );
}

