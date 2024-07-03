"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, A11y } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Image from "next/image";
import ItemCard from "../ItemCard/ItemCard";
import ProductCard from "../ItemCard/ProductCard";

import classes from "./product-carousel.module.css";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/axios/instance";

type ProductsProp = {
    products: any[];
    mode: string;
};

function ProductsCarousel({ products, mode }: ProductsProp) {
    const breakpoints =
        mode === "full"
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

            const { isLoading, data, error, isFetching } = useQuery({
                queryKey: ['products'],
                queryFn: getProducts,
            })
            const productos = data?.data.products
            if (isLoading) {
                return <h2>loading...</h2>
            }
            if (error) {
                return <h2>Error loading products</h2>;
            }
        console.log(data?.data.products);
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
            {productos.map((prod, id) => (
                <SwiperSlide key={id}>
                    <ProductCard details={prod} />
                </SwiperSlide>
            ))}
        </Swiper>
    );
}

export default ProductsCarousel;
