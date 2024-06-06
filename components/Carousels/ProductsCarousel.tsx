'use client'
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, A11y } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import Image from 'next/image';
import ItemCard from '../ItemCard/ItemCard';



function ProductsCarousel() {
    return (
        <Swiper
            slidesPerView={8}
            navigation
            loop={true}
            centerInsufficientSlides
            centeredSlides
            centeredSlidesBounds
            autoplay={{
                delay: 2500,
                disableOnInteraction: false,
            }}
            pagination={{ clickable: true }}
            modules={[Autoplay, Pagination, Navigation, A11y]}
            breakpoints={{
                320: {
                    slidesPerView: 2,
                    spaceBetween: 1
                },
                480: {
                    slidesPerView: 2,
                    spaceBetween: 1
                },
                768: {
                    slidesPerView: 3,
                    spaceBetween: 2
                },
                1024: {
                    slidesPerView: 4,
                    spaceBetween: 2
                },
                1280: {
                    slidesPerView: 5,
                    spaceBetween: 2
                },
                1500: {
                    slidesPerView: 6,
                    spaceBetween: 2
                },
            }}
        >
                <SwiperSlide >
                    <ItemCard />
                </SwiperSlide>
                <SwiperSlide >
                    <ItemCard />
                </SwiperSlide>
                <SwiperSlide >
                    <ItemCard />
                </SwiperSlide>
                <SwiperSlide >
                    <ItemCard />
                </SwiperSlide>
                <SwiperSlide >
                    <ItemCard />
                </SwiperSlide>
                <SwiperSlide >
                    <ItemCard />
                </SwiperSlide>
                <SwiperSlide >
                    <ItemCard />
                </SwiperSlide>
        </Swiper>
    )
}

export default ProductsCarousel
