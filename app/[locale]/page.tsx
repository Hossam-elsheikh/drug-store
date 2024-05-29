import HeroCarousel from '@/components/HeroSection/HeroCarousel';
import NavBar from '@/components/navbar/NavBar';
import { useTranslations } from 'next-intl';
import { pharmacyCategories,pharmacyCat } from '@/lib/utils';
import ItemCard from '@/components/ItemCard/ItemCard';
import ProductCarousel from '@/components/ProductCarousel/ProductCarousel';


export default function Home() {
  const t = useTranslations('Index');

  return (
    <div className='p-8'>
      <HeroCarousel items={pharmacyCategories}/>
      <div className=''>
      <ProductCarousel items={pharmacyCat}/>
      </div>
    <div>
      <h1>{t('title')}</h1>;
      <h1>{t('description')}</h1>;
      <ItemCard isVertical={true}/>
    </div>
    </div>
  );
}