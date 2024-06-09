import { useTranslations } from 'next-intl';
import Link from 'next/link';
import React from 'react'
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "../ui/sheet";
import Image from 'next/image';
import { Menu } from 'lucide-react';
import image from "../../public/logo.svg";
import MenuDrawer from './MenuDrawer';

function CategoriesDrawer({ currentLoc,classes }) {
    const t = useTranslations("categories");
    <h1 className="">{t("allCategories")}</h1>
    let direction: "left" | "right" = currentLoc === 'en' ? 'left' : 'right'

    return (
        <Sheet >
            <SheetTrigger className={`flex items-center gap-2 font-semibold text-nowrap ${classes}`}>
                <Menu />
            </SheetTrigger>
            <SheetContent className="w-[300px] p-0" side={direction}>
                <SheetHeader className="items-center p-5">
                    <Image src={image} alt="logo" width={100} height={100} />
                </SheetHeader>
                <MenuDrawer currentLoc={currentLoc}/>
            </SheetContent>
        </Sheet>

    )
}

export default CategoriesDrawer