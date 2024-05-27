import NavBar from "@/components/navbar/NavBar";
import { useTranslations } from 'next-intl';

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