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
import ProductCard from '../ItemCard/ProductCard';

import classes from './product-carousel.module.css'

function ProductsCarousel({products,mode}) {
    const breakpoints = mode === 'full' ? {
        0: {
            slidesPerView: 2,
            spaceBetween: 2
                },
        663: {
            slidesPerView: 3,
            spaceBetween: 2
                },
   
        768: {
            slidesPerView: 3,
            spaceBetween: 1
                },
        1024: {
            slidesPerView: 4,
            spaceBetween: 2
                },
        1280: {
            slidesPerView: 5,
            spaceBetween: 2
                },
        1600: {
            slidesPerView: 6,
            spaceBetween: 2
                    },
        1800: {
            slidesPerView: 7,
            spaceBetween: 2

                }
    } : {
        320: {
            slidesPerView: 2,
            spaceBetween: 2
        },
        480: {
            slidesPerView: 2,
            spaceBetween: 1
        },
        768: {
            slidesPerView: 2,
            spaceBetween: 1
        },
        1024: {
            slidesPerView: 2,
            spaceBetween: 2
        },
        1280: {
            slidesPerView: 3,
            spaceBetween: 2
        },
        1600: {
            slidesPerView: 3,
            spaceBetween: 2
        },
        1800: {
            slidesPerView: 4,
            spaceBetween: 2

        }
    } 

    return (
        <Swiper
            slidesPerView={5}
            navigation
            loop={true}
            centerInsufficientSlides
            // centeredSlides
            // centeredSlidesBounds
            className={classes.swiper}
            
            pagination={{ clickable: true }}
            modules={[Autoplay, Pagination, Navigation, A11y]}
            breakpoints={breakpoints}
        >
            {products.map((prod,id)=>
                <SwiperSlide key={id}>
                    <ProductCard  details={prod} />
                </SwiperSlide>
                )}
        </Swiper>
    )
}

export default ProductsCarousel
