// ProductsCarousel.tsx
'use client'
import React, { useContext, useEffect, useMemo } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation, A11y } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import ProductCard, { ProductCardSkeleton } from '../ItemCard/ProductCard'
import classes from './product-carousel.module.css'
import { useQuery } from '@tanstack/react-query'
import { getProducts, getRelatedProducts } from '@/axios/instance'
import { Product } from '@/types'

type ProductsProp = {
    mode: string
    catId?: string
    productId?: string
}

export default function ProductsCarousel({
    mode,
    catId,
    productId,
}: ProductsProp) {
    const productsQuery = useQuery({
        queryKey: catId ? [catId] : ['related', productId],
        queryFn: () =>
            mode === 'related'
                ? getRelatedProducts(productId)
                : getProducts({ category: catId })
    })



    const breakpoints =
        mode === 'full'
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
              }
            : {
                  0: {
                      slidesPerView: 2,
                      spaceBetween: 2,
                  },

                  730: {
                      slidesPerView: 3,
                      spaceBetween: 2,
                  },

                  1400: {
                      slidesPerView: 4,
                      spaceBetween: 2,
                  },
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
                          <ProductCard
                              details={prod}
                              index={prod._id}
                              mode="default"
                          />
                      </SwiperSlide>
                  ))}
        </Swiper>
    )
}
