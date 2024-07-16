import React from "react";
import CartDrawerItem from "./CartDrawerItem";
import { products } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { SheetClose } from "@/components/ui/sheet";
import { useLocale } from "@/context/LocaleProvider";
import CartSvg from '@/public/Add to Cart-amico.svg'
import Image from "next/image";


export default function CartDrawer() {
    const t = useTranslations("cart");
    const router = useRouter();
    const { dir, locale } = useLocale();

    return (
        <div className="h-dvh flex flex-col" dir={dir}>
            <div className="h-2/3 overflow-auto overflow-x-hidden border-b-2">
                {products.length === 0 ? (
                    <div className='flex justify-center items-center h-full flex-col '>
                        <Image src={CartSvg} width={200} height={200} alt="cartSvg" />
                        <h1 className='font-semibold md:text-xl text-lg pt-5'>{t('addToFavorites')}</h1>
                    </div>
                ) : (
                    products.map((prod, i) => (
                        <CartDrawerItem details={prod} key={i} />
                    ))
                )}
            </div>
            <div className="p-3 flex flex-col gap-4">
                <div className="flex text-lg font-medium justify-between items-center">
                    <h3>{t("totalPrice")}</h3>
                    <p>
                        399 <span className="text-sm font-light">{t("dinar")}</span>
                    </p>
                </div>
                <p className="text-xs bg-green-700 p-1 rounded-md text-white">
                    {t("taxes")}
                </p>
                <div className="flex flex-col items-center gap-3">
                    <SheetClose asChild>
                        <button
                            className="flex justify-center w-full bg-primaryColor font-medium text-white py-2 rounded-full hover:opacity-80"
                            onClick={() => router.push(`/${locale}/cart`)}
                        >
                            {t("expandCart")}
                        </button>
                    </SheetClose>
                    <SheetClose asChild>
                        <button
                            className="flex justify-center w-full bg-primaryColor font-medium text-white py-2 rounded-full hover:opacity-80"
                            onClick={() => router.push(`/${locale}/checkout`)}
                        >
                            {t("checkout")}
                        </button>
                    </SheetClose>
                </div>
            </div>
        </div>
    );
}
