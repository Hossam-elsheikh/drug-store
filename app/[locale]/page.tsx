import HeroCarousel from "@/components/HeroSection/HeroCarousel";
import ItemCard from "@/components/ItemCard/ItemCard";
import { Modal } from "@/components/ItemCard/Modal";
import ProductCarousel from "@/components/ProductCarousel/ProductCarousel";

import NavBar from "@/components/navbar/NavBar";
import { pharmacyCategories } from "@/lib/utils";
import { useTranslations } from 'next-intl';



export default function Home() {
    const t = useTranslations('Index');
    return (
        <div>
            <NavBar />
            <HeroCarousel items={pharmacyCategories} />
            <div className="w-60 bg-slate-700 ">
                <ProductCarousel items={pharmacyCategories} />
            </div>
            <Modal buttonText="show"/>
            <ItemCard isVertical={true} />
            <ItemCard isVertical={false} cart={true} />
            <ItemCard isVertical />
            <h1>{t('title')}</h1>;
            <h1>{t('description')}</h1>;
        </div>
    );
}