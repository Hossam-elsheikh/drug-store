'use client'
import React from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import CategoriesDrawer from "../Drawers/menu/CategoriesDrawer";
import { useLocale } from "@/context/LocaleProvider";

const CategoriesBar = () => {
    const t = useTranslations("categories");
    const { locale } = useLocale()
    return (
        <nav className="md:flex items-center gap-4 px-5 shadow-md py-2 text-primaryColor bg-gray-100 hidden ">
            <section className="flex w-full justify-between gap-5 items-center">
                <ul className="flex gap-4 items-center">
                    <CategoriesDrawer />
                    <h1 className="font-medium">{t("allCategories")}</h1>
                    <Link className="font-medium " href={`/${locale}`}>
                        {t("home")}
                    </Link>
                    <Link className="font-medium " href={`/${locale}/category/allProducts`}>
                        {t("allProducts")}
                    </Link>
                    <Link className="font-medium " href={`/${locale}/category/ourCollections`}>
                        {t("ourCollections")}
                    </Link>
                    <Link className="font-medium " href={`/${locale}/category/shopByBrand`}>
                        {t("shopByBrand")}
                    </Link>
                    <Link className="font-medium " href={`/${locale}/category/Offers`}>
                        {t("Offers")}
                    </Link>
                </ul>
            </section>
        </nav>
    );
};

export default CategoriesBar;
