"use client";
import { useTranslations } from "next-intl";
import Link from "next/link";
import React, { useState } from "react";
import DropList from "./DropList";

const MenuDrawer = ({ currentLoc }) => {
  const t = useTranslations("Navigation");
  const [activeSec, setActiveSec] = useState("menu");
  const categories = [
    {
      title: "cosmotics",
      id: 1,
      subCategories: [
        {
          id: "1",
          title: "cosmo1",
          href: "#",
        },
        {
          id: "2",
          title: "cosmo2",
          href: "#",
        },
        {
          id: "3",
          title: "cosmo3",
          href: "#",
        },
      ],
    },
    {
      title: "Drugs",
      id: 2,
      subCategories: [
        {
          id: "1",
          title: "drug1",
          href: "#",
        },
        {
          id: "2",
          title: "drug2",
          href: "#",
        },
        {
          id: "3",
          title: "drug3",
          href: "#",
        },
      ],
    },
  ];

  const Categories = () => (
    <div>
      {categories.map((cat, i) => (
        <div dir={currentLoc === "en" ? "ltr" : "rtl"} className="border-b">
          <DropList
            id={cat.id}
            title={cat.title}
            subCategories={cat.subCategories}
          />
        </div>
      ))}
    </div>
  );

  const Menu = () => (
    <div>
      <ul className="p-4" dir={currentLoc === "en" ? "ltr" : "rtl"}>
        <li>
          <Link
            className="font-medium text-primaryColor hover:text-secColor"
            href="#"
          >
            Home
          </Link>
        </li>
      </ul>
    </div>
  );

  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-between py-3 ">
        <Link
          onClick={() => setActiveSec("menu")}
          href="#"
          className={`w-full  p-1 text-center font-semibold border text-gray-600 ${
            activeSec === "menu" && "text-white bg-secColor"
          }`}
        >
          {t("main")}
        </Link>
        <Link
          onClick={() => setActiveSec("categories")}
          href="#"
          className={`w-full  p-1 text-center font-semibold border text-gray-600 ${
            activeSec === "categories" && "text-white bg-secColor"
          }`}
        >
          {t("categories")}
        </Link>
      </div>
      {activeSec === "categories" ? <Categories /> : <Menu />}
    </div>
  );
};

export default MenuDrawer;
