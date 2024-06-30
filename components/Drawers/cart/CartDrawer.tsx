import React from "react";
import CartDrawerItem from "./CartDrawerItem";
import {  products } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { SheetClose } from "@/components/ui/sheet";

type Props = {
    dir: string;
    currentLoc: string;
};

export default function CartDrawer({ dir, currentLoc }: Props) {
    const t = useTranslations("cart");
    const router = useRouter();

    const navigate = (path: string) => {

        const normalizedPath = path.startsWith('/') ? path : `/${path}`;

        const parts = currentLoc.split('/').filter(Boolean);
        const langCode = parts.length > 0 && parts[0].length === 2 ? parts[0] : '';
        const newPath = langCode ? `/${langCode}${normalizedPath}` : normalizedPath;

        router.push(newPath);
    };

    return (
        <div className="h-dvh flex flex-col " dir={dir}>
            <div className="h-2/3 overflow-auto overflow-x-hidden border-b-2">
                {products.map((prod, i) => (
                    <CartDrawerItem details={prod} key={i} />
                ))}
            </div>
            <div className="p-3  flex flex-col gap-4">
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
                    <SheetClose asChild >

                        <button
                            className=" flex justify-center w-full bg-primaryColor font-medium text-white py-2 rounded-full hover:opacity-80"
                            onClick={() => navigate(`/cart`)}
                        >
                            {t("expandCart")}
                        </button>
                    </SheetClose>
                    <SheetClose asChild >

                        <button
                            className=" flex justify-center w-full bg-primaryColor font-medium text-white py-2 rounded-full hover:opacity-80"
                            onClick={() => navigate(`/checkout`)}
                        >
                            {t("checkout")}
                        </button>
                    </SheetClose>
                </div>
            </div>
        </div>
    );
}