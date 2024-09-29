'use client'
import { useTranslations } from 'next-intl';
import React, { useContext } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "../../ui/sheet";
import Image from 'next/image';
import { Menu } from 'lucide-react';
import MenuDrawer from './MenuDrawer';
import { useLocale } from '@/context/LocaleProvider'
import WebsiteProfileCtx from '@/context/WebsiteProfileContext';

type Props = {
    classes?: string;
};

function CategoriesDrawer({ classes }: Props) {
    const t = useTranslations("categories");
    const {  dir } = useLocale();
    const { logo } = useContext(WebsiteProfileCtx)


    return (
        <Sheet>
            <SheetTrigger className={`flex items-center gap-2 font-bold  text-nowrap hover:text-secColor ${classes}`}>
                <Menu />
                <h1 className="font-bold hidden md:block">{t("allCategories")}</h1>

            </SheetTrigger>
            <SheetContent className="w-[300px] p-0 overflow-auto" side={dir === "ltr" ? 'left' : 'right'}>
                <SheetHeader className="items-center p-5">
                    <Image src={logo} alt="logo" width={100} height={100} />
                </SheetHeader>

                {/* <h1 className="text-lg text-primaryColor font-medium w-full text-center border-b-2">{t("allCategories")}</h1> */}
                <MenuDrawer />
            </SheetContent>
        </Sheet>
    );
}

export default CategoriesDrawer;
