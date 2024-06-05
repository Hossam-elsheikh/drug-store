"use client";
import Container from "@/components/Container";
import { pharmacyCategories } from "@/lib/utils";
import { useTranslations } from "next-intl";
import ProductCarousel from "@/components/ProductCarousel/ProductCarousel";
import NavBar from "@/components/navbar/NavBar";
import HeroCarousel from "@/components/HeroSection/HeroCarousel";
import StarRating from "@/components/CustomerReview/StarRating";
import CustomerReview from "@/components/CustomerReview/CustomerReview";
import Footer from "@/components/Footer/Footer";
import ProductDetails from "@/components/ProductDetails/ProductDetails";
import WhyUs from "@/components/WhyUs/WhyUs";
import ASidebar from "@/components/UserProfile/Aside";
import CartItem from "@/components/ItemCard/CartItem";
import ItemCard from "@/components/ItemCard/ItemCard";
import InfoCard from "@/components/UserProfile/Addresses/InfoCard";

export default function Home() {
    const t = useTranslations("Index");

    return (
        <div>
            <HeroCarousel items={pharmacyCategories} />

            <Container title="Shope By the Category" className="max-w-[1400px]">
                <ProductCarousel items={pharmacyCategories} />
            </Container>

            <CartItem />
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

            <ProductDetails />
            <WhyUs />

            <CustomerReview />
            <Footer />

        </div>
    );
}
