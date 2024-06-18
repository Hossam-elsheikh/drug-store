import React from "react";
import Link from "next/link";
import LanguageSwitcher from "../LanguageSwitcher";
import { useTranslations } from "next-intl";
import DrawerWrapper from "../Drawers/DrawerWrapper";
import CategoriesDrawer from "../Drawers/menu/CategoriesDrawer";

const CategoriesBar = ({ currentLoc }: { currentLoc: string }) => {
  const t = useTranslations("categories");

  return (
    <div className="md:flex items-center gap-4 px-5 shadow-md py-2 text-primaryColor bg-slate-100 hidden ">
      <nav className="flex w-full justify-between gap-5 items-center">
        <ul className="flex gap-4 items-center">
          <CategoriesDrawer currentLoc={currentLoc}/>
          <h1 className="font-medium">{t("allCategories")}</h1>
          <Link className="font-medium " href="/en">
            {t("home")}
          </Link>
                  <Link className="font-medium " href="/en/searchcategory/allProducts">
            {t("allProducts")}
          </Link>
                  <Link className="font-medium " href="/en/searchcategory/ourCollections">
            {t("ourCollections")}
          </Link>
                  <Link className="font-medium " href="/en/searchcategory/shopByBrand">
            {t("shopByBrand")}
          </Link>
                  <Link className="font-medium " href="/en/searchcategory/Offers">
            {t("Offers")}
          </Link>
        </ul>
      </nav>
    </div>
  );
};

export default CategoriesBar;
