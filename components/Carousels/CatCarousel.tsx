"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, A11y } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import ItemSlider from "./ItemSlider";
import { Category } from "@/types";


type CategoryCarouselProps = {
    items: Category[];
};

function CatCarousel({ items }: CategoryCarouselProps) {
    return (
        <Swiper
            spaceBetween={25}
            slidesPerView={10}
            navigation
            loop={true}
            autoplay={{
                delay: 2500,
                disableOnInteraction: true,
                pauseOnMouseEnter: true,
            }}
            pagination={{ clickable: true }}    
            modules={[Autoplay, Pagination, Navigation, A11y]}
            breakpoints={{
                320: {
                    slidesPerView: 3,
                    spaceBetween: 8,
                },
                480: {
                    slidesPerView: 3,
                    spaceBetween: 5,
                },
                768: {
                    slidesPerView: 7,
                    spaceBetween: 5,
                },
                1024: {
                    slidesPerView: 8,
                    spaceBetween: 4,
                },
                1280: {
                    slidesPerView: 10,
                    spaceBetween: 7,
                },
            }}
        >
            {items?.map((item, i) => (
                <SwiperSlide key={i}>
                    <ItemSlider item={item} />
                </SwiperSlide>
            ))}
        </Swiper>
    );
}

export default CatCarousel;
