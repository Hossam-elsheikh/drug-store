'use client'
import Container from '@/components/Container';
import CartItem from '@/components/ItemCard/CartItem';
import ItemCard from '@/components/ItemCard/ItemCard';
import { Modal } from '@/components/ItemCard/Modal';
import SwiperCarousel from '@/components/ProductCarousel/ProductCarousel';
import { pharmacyCat, pharmacyCategories } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import ProductCarousel from '@/components/ProductCarousel/ProductCarousel';
import NavBar from '@/components/navbar/NavBar';
import HeroCarousel from '@/components/HeroSection/HeroCarousel';
import StarRating from '@/components/CustomerReview/StarRating';
import CustomerReview from '@/components/CustomerReview/CustomerReview';
import Footer from '@/components/Footer/Footer';
import ProductDetails from '@/components/ProductDetails/ProductDetails';


export default function Home() {
    const t = useTranslations('Index');

    return (
        <div>
            <HeroCarousel items={pharmacyCategories} />

            <Container title='Shope By the Category' className='max-w-[1200px]'>

                <ProductCarousel items={pharmacyCategories} />

            </Container>
            <Container>
                <ItemCard />
            </Container>
            

                <ProductDetails />


            <CustomerReview />
            <Footer />
        
        </div>
    );
}