"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import React from "react";
import DropList from "./DropList";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";

type Props = {
    currentLoc: string;
};

const MenuDrawer = ({ currentLoc }: Props) => {
    const t = useTranslations("Navigation");

    const categories = [
        {
            title: "cosmotics",
            id: 1,
            subCategories: [
                { id: "1", title: "cosmo1", href: "#" },
                { id: "2", title: "cosmo2", href: "#" },
                { id: "3", title: "cosmo3", href: "#" },
            ],
        },
        {
            title: "Drugs",
            id: 2,
            subCategories: [
                { id: "1", title: "drug1", href: "#" },
                { id: "2", title: "drug2", href: "#" },
                { id: "3", title: "drug3", href: "#" },
            ],
        },
    ];

    const Categories = () => (
        <div>
            {categories.map((cat, i) => (
                <div key={i} dir={currentLoc === "en" ? "ltr" : "rtl"} >
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
        <Tabs defaultValue="menu" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="menu">{t("main")}</TabsTrigger>
                <TabsTrigger value="categories">{t("categories")}</TabsTrigger>
            </TabsList>
            <TabsContent value="menu">
                <Menu />
            </TabsContent>
            <TabsContent value="categories">
                <Categories />
            </TabsContent>
        </Tabs>
    );
};

export default MenuDrawer;