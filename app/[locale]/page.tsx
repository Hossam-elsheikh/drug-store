"use client";
import Container from "@/components/Container";
import { pharmacyCat, pharmacyCategories } from "@/lib/utils";
import { useTranslations } from "next-intl";
import CatCarousel from "@/components/Carousels/CatCarousel";
import NavBar from "@/components/navbar/NavBar";
import HeroCarousel from "@/components/HeroSection/HeroCarousel";
import CustomerReview from "@/components/CustomerReview/CustomerReview";
import Footer from "@/components/Footer/Footer";
import ProductDetails from "@/components/ProductDetails/ProductDetails";
import WhyUs from "@/components/WhyUs/WhyUs";
import ASidebar from "@/components/UserProfile/Aside";
import CartItem from "@/components/ItemCard/CartItem";
import ItemCard from "@/components/ItemCard/ItemCard";
import InfoCard from "@/components/UserProfile/Addresses/InfoCard";
import BannerGrid1 from "@/components/Banners/BannerGrid1";
import ProductsCarousel from "@/components/Carousels/ProductsCarousel";

export default function Home() {
    const t = useTranslations("Index");

    return (
        <div>
            <HeroCarousel items={pharmacyCat} />

            <Container title="Shope By the Category" className="max-w-[1600px] bg-blue-50">
                <CatCarousel items={pharmacyCategories} />
            </Container>
            <Container className="max-w-[1600px] 2xl:p-0 items-center">
                
            <BannerGrid1 />
            </Container>
            <Container className="max-w-[1600px] 2xl:p-0 items-center" title="Cosmotics">
                <ProductsCarousel />
            </Container>
            {/* <CartItem />
            <ItemCard isVertical={false} />
            <Container className="flex gap-1 flex-wrap max-w-[1600px]">
                <ItemCard isVertical={false} />
                <ItemCard />
                <ItemCard />
                <ItemCard />
                <ItemCard />
                <ItemCard />
                <ItemCard />
                <ItemCard />
                <ItemCard />
            </Container>
            <InfoCard  dir="rtl"/>

            <ProductDetails /> */}
            <WhyUs />

            <CustomerReview />
            <Footer />
        </div>
    );
}
