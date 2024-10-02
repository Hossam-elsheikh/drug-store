import { ShoppingCart } from 'lucide-react'
import React from 'react'
import CartSvg from '@/public/Add to Cart-amico.svg'
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useLocale } from '@/context/LocaleProvider';


function EmptyCart() {
    const t = useTranslations("cart");

    return (
        <div className=" h-full  flex text-center">
             <div className='flex justify-center items-center h-full flex-col '>
                    <Image src={CartSvg} width={200} height={200} alt="cartSvg" />
                    <h2 className="text-2xl font-semibold mb-2">{t("emptyCart")}</h2>
                    <p className="text-gray-500 mb-4">{t("addProducts")}</p>
                </div>
          
        </div>
    )
}

export default EmptyCart;