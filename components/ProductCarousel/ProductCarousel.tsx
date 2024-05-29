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
            // install Swiper modules
            spaceBetween={10}
            slidesPerView={5}
            navigation
            loop={true}
            autoplay={{
                delay: 2500,
                disableOnInteraction: false,
            }}
            pagination={{ clickable: true }}
            modules={[Autoplay, Pagination, Navigation,A11y]}
           
        >
            {items?.map((item, i) => (
                <SwiperSlide key={i}>
                    <div className='w-full h-1/2 p-1 text-center mb-9'>
                    
                    <Image className='rounded-lg'
                        quality={80}
                        src={item.image}
                        alt={item.name}
                        width={400}
                        height={200}
                       
                        />
                        <h1 className='font-light'>{item.name}</h1>
                        </div>
                </SwiperSlide>

            ))}

           
        </Swiper>
    )
}

export default ProductCarousel
