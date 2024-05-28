import React from "react";
import Link from "next/link";
import LanguageSwitcher from "../LanguageSwitcher";
import DrawerWrapper from "../DrawerWrapper";
import { useTranslations } from "next-intl";

const CategoriesBar = ({ currentLoc }: { currentLoc: string }) => {
  const t = useTranslations("categories");

  return (
    <div className="flex items-center gap-4 px-5 py-2 text-slate-200 bg-primaryColor">
      <DrawerWrapper currentLoc={currentLoc} showSec='categories'/>
      <nav className="flex w-full justify-between gap-5 items-center">
        <ul className="flex gap-4 items-center">
          <Link className="font-semibold " href="/cat1">
            {t("home")}
          </Link>
          <Link className="font-semibold " href="/cat1">
            {t("allProducts")}
          </Link>
          <Link className="font-semibold " href="/cat1">
            {t("ourCollections")}
          </Link>
          <Link className="font-semibold " href="/cat1">
            {t("shopByBrand")}
          </Link>
          <Link className="font-semibold " href="/cat1">
            {t("Offers")}
          </Link>
        </ul>
        <LanguageSwitcher currentLoc={currentLoc} />
      </nav>
    </div>
  );
};

export default CategoriesBar;
