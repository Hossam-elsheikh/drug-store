"use client";
import Container from "@/components/Container";
import { pharmacyCat, pharmacyCategories, products } from "@/lib/utils";
import { useTranslations } from "next-intl";
import CatCarousel from "@/components/Carousels/CatCarousel";

import HeroCarousel from "@/components/HeroSection/HeroCarousel";

import BannerGrid1 from "@/components/Banners/BannerGrid1";
import ProductsCarousel from "@/components/Carousels/ProductsCarousel";

import ProductCard from "@/components/ItemCard/ProductCard";
import PersistLogin from "@/components/Form/PersistLogin";

import VerticalBanner from "@/components/Banners/VerticalBanner";
import image from '@/public/image.png'
import image2 from '@/public/image copy.png'
import image3 from '@/public/image copy 2.png'
import { getProducts, instance } from "@/axios/instance";
import { useQuery } from "@tanstack/react-query";
import { Suspense } from "react";

// const Home = () => {
function Home() {
    const t = useTranslations("Index");
    return (
        <>

                <div className="flex flex-col items-center">
                    <Container className="max-w-[1600px] ">
                        <HeroCarousel items={pharmacyCat} />
                    </Container>

                    <Container className="max-w-[1600px] ">
                        <CatCarousel items={pharmacyCategories} />
                    </Container>
                    <Container className="max-w-[1600px]  items-center">
                        <BannerGrid1 />
                    </Container>
                    <Container
                        className="max-w-[1600px] border-b-2 rounded-none  items-center"
                        title="Cosmotics"
                    >
                        <ProductsCarousel mode="full" products={products} />
                    </Container>
                    {/* <CartItem /> */}
                    <Container className="max-w-[1600px] border-b-2 rounded-none  items-center">
                        <VerticalBanner image={image3} />
                    </Container>
                    <Container
                        className="max-w-[1600px] border-b-2 rounded-none  items-center"
                        title="Children Care"
                    >
                        <ProductsCarousel mode="full" products={products} />
                    </Container>
                    {/* <CartItem /> */}
                    <Container className="max-w-[1600px] border-b-2 rounded-none  items-center">
                        <VerticalBanner image={image2} />
                    </Container>
                    <Container
                        className="max-w-[1600px] border-b-2 rounded-none  items-center"
                        title="Psychatric"
                    >
                        <ProductsCarousel mode="full" products={products} />
                    </Container>
                    {/* <CartItem /> */}
                    <Container className="max-w-[1600px] border-b-2 rounded-none  items-center">
                        <VerticalBanner image={image} />
                    </Container>


                    {/* <WhyUs /> */}

      </div>
    </>

  );
}

// export default PersistLogin(Home)
export default Home
