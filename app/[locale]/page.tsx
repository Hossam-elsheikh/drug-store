import Container from '@/components/Container';
import CartItem from '@/components/ItemCard/CartItem';
import ItemCard from '@/components/ItemCard/ItemCard';
import { Modal } from '@/components/ItemCard/Modal';
import SwiperCarousel from '@/components/ProductCarousel/ProductCarousel';
import { pharmacyCategories } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import ProductCarousel from '@/components/ProductCarousel/ProductCarousel';
import NavBar from '@/components/navbar/NavBar';


export default function Home() {
  const t = useTranslations('Index');
  return (
    <div>
      <NavBar />
      <h1>{t('title')}</h1>;
      <h1>{t('description')}</h1>;
    </div>
  );
}