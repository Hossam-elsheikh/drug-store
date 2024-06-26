"use client";
import Container from "@/components/Container";
import { pharmacyCat, pharmacyCategories, products } from "@/lib/utils";
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
import ProductCard from "@/components/ItemCard/ProductCard";
import PersistLogin from "@/components/Form/PresistLogin";

const Home=()=> {
    const t = useTranslations("Index");

    return (
        <>


            <div className="flex flex-col items-center">
                <Container className="max-w-[1600px] ">

                    <HeroCarousel items={pharmacyCat} />
                </Container>

                <Container title="Shope By the Category" className="max-w-[1600px] ">
                    <CatCarousel items={pharmacyCategories} />
                </Container>
                <Container className="max-w-[1600px]  items-center">

                    <BannerGrid1 />
                </Container>
                <Container className="max-w-[1600px] border-b-2 rounded-none  items-center" title="Cosmotics">
                    <ProductsCarousel mode='full' products={products} />
                </Container>


                <WhyUs />

                <CustomerReview />
            </div>
        </>
    );
}

export default PersistLogin(Home)