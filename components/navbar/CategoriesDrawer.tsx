import { useTranslations } from 'next-intl';
import Link from 'next/link';
import React from 'react'
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "../ui/sheet";
import Image from 'next/image';
import { Menu } from 'lucide-react';
import image from "../../public/logo.svg";

function CategoriesDrawer({ currentLoc }: { currentLoc: string }) {
    const t = useTranslations("categories");
    <h1 className="">{t("allCategories")}</h1>
    let direction: "left" | "right" = currentLoc === 'en' ? 'left' : 'right'

    return (
        <Sheet >
            <SheetTrigger className="flex items-center gap-2 font-semibold text-nowrap">
                <Menu />
            </SheetTrigger>
            <SheetContent className="w-[300px]" side={direction}>
                <SheetHeader className="items-center">
                    <Image src={image} alt="logo" width={200} height={200} />
                </SheetHeader>
                <ul className="mt-5 space-y-4">
                    <li>
                        <Link className="font-semibold" href="/cat1">
                            {t("home")}
                        </Link>
                    </li>
                    <li>
                        <Link className="font-semibold" href="/cat1">
                            {t("allProducts")}
                        </Link>
                    </li>
                    <li>
                        <Link className="font-semibold" href="/cat1">
                            {t("ourCollections")}
                        </Link>
                    </li>
                    <li>
                        <Link className="font-semibold" href="/cat1">
                            {t("shopByBrand")}
                        </Link>
                    </li>
                    <li>
                        <Link className="font-semibold " href="/cat1">
                            {t("Offers")}
                        </Link>
                    </li>
                </ul>
            </SheetContent>
        </Sheet>

    )
}

export default CategoriesDrawer