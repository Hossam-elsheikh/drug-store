
import CartDrawerItem from "../cart/CartDrawerItem";
import Image from 'next/image';
import CartSvg from '@/public/Add to Cart-amico.svg'
import { useTranslations } from "next-intl";
import { useFavorites } from "@/context/favoriteProvider";


export default function Favorites() {
    const t = useTranslations("Favorites");
    const { getTotalFavorites,favoriteProducts } = useFavorites()
          const totalFavorite = getTotalFavorites()
    return (
        <div className="h-dvh overflow-auto overflow-x-hidden p-2 pb-20 space-y-2 border-b-2">
            {totalFavorite === 0 ? (
                <div className='flex justify-center items-center h-full flex-col '>
                    <Image src={CartSvg} width={200} height={200} alt="cartSvg" />
                    <h1 className='font-semibold md:text-xl text-lg pt-5'>{t('toggleFavorite')}</h1>
                </div>
            ) : (
                    favoriteProducts.map((prod, i) => (

                    <div key={i}>
                        <CartDrawerItem mode="Favorites" details={prod} />
                    </div>
                ))
            )}
        </div>
    );
}
