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
import ItemSlider from './ItemSlider';

type PharmacyCategory = {
    name: string;
    image: string;
};

type ProductCarouselProps = {
    items: PharmacyCategory[];
};

function ProductCarousel({ items }: ProductCarouselProps) {
    return (
        <Swiper
            spaceBetween={10}
            slidesPerView={5}
            navigation
            loop={true}
            autoplay={{
                delay: 2500,
                disableOnInteraction: false,
            }}
            pagination={{ clickable: true }}
            modules={[Autoplay, Pagination, Navigation, A11y]}
        >
            {items?.map((item, i) => (
                <SwiperSlide key={i}>
                    <ItemSlider item={item}  />
                </SwiperSlide>
            ))}
        </Swiper>
    )
}

export default ProductCarousel
