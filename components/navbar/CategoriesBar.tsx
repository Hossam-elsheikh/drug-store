import React from "react";
import Link from "next/link";
import LanguageSwitcher from "../LanguageSwitcher";
import { useTranslations } from "next-intl";
import DrawerWrapper from "../DrawerWrapper";
import CategoriesDrawer from "./CategoriesDrawer";

const CategoriesBar = ({ currentLoc }: { currentLoc: string }) => {
  const t = useTranslations("categories");

  return (
    <div className="md:flex items-center gap-4 px-5 py-2 text-slate-200 bg-primaryColor hidden ">
      <nav className="flex w-full justify-between gap-5 items-center">
        <ul className="flex gap-4 items-center">
          <CategoriesDrawer currentLoc={currentLoc}/>
          <h1 className="font-semibold">{t("allCategories")}</h1>
          <Link className="font-semibold " href="/en">
            {t("home")}
          </Link>
                  <Link className="font-semibold " href="/en/searchcategory/allProducts">
            {t("allProducts")}
          </Link>
                  <Link className="font-semibold " href="/en/searchcategory/ourCollections">
            {t("ourCollections")}
          </Link>
                  <Link className="font-semibold " href="/en/searchcategory/shopByBrand">
            {t("shopByBrand")}
          </Link>
                  <Link className="font-semibold " href="/en/searchcategory/Offers">
            {t("Offers")}
          </Link>
        </ul>
      </nav>
    </div>
  );
};

export default CategoriesBar;
