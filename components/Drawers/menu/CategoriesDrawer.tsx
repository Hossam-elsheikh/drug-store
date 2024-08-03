'use client'
import { useTranslations } from 'next-intl';
import React from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "../../ui/sheet";
import Image from 'next/image';
import { Menu } from 'lucide-react';
import image from "@/public/logo.svg";
import MenuDrawer from './MenuDrawer';
import { useLocale } from '@/context/LocaleProvider'

type Props = {
    classes?: string;
};

function CategoriesDrawer({ classes }: Props) {
    const t = useTranslations("categories");
    const {  dir } = useLocale();

    return (
        <Sheet>
            <SheetTrigger className={`flex items-center gap-2 font-semibold text-nowrap ${classes}`}>
                <Menu />
            </SheetTrigger>
            <SheetContent className="w-[300px] p-0" side={dir === "ltr" ? 'left' : 'right'}>
                <SheetHeader className="items-center p-5">
                    <Image src={image} alt="logo" width={100} height={100} />
                </SheetHeader>

                <h1 className="text-lg text-primaryColor font-medium w-full text-center border-b-2">{t("allCategories")}</h1>
                <MenuDrawer />
            </SheetContent>
        </Sheet>
    );
}

export default CategoriesDrawer;
