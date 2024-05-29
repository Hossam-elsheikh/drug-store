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


export default function Home() {
  const t = useTranslations('Index');
  return (
    <div>
      <HeroCarousel items={pharmacyCategories}/>
      <div className=''>
      <ProductCarousel items={pharmacyCat}/>
      </div>
    <div>
      <h1>{t('title')}</h1>;
      <h1>{t('description')}</h1>;
    </div>
    </div>
  );
}