"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import React, { useState, useTransition } from "react";
import DropList from "./DropList";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/axios/instance";
import { Loader2 } from "lucide-react";
import NotFound from "@/app/not-found";
import { useLocale } from "@/context/LocaleProvider";


const LoadingState = () => (
    <div className="flex justify-center items-center h-full">
        <div className="animate-pulse text-primaryColor flex items-center">
            <Loader2 className="animate-spin mr-2" />
            <span>loading...</span>
        </div>
    </div>
);
const MenuDrawer = () => {
    const t = useTranslations("Navigation");
    const [isPending, startTransition] = useTransition();
    const [activeTab, setActiveTab] = useState('menu');
    const {dir}=useLocale()

    const handleTabChange = (value: string) => {
        startTransition(() => {
            setActiveTab(value);
        });
    }

    const { data: categories, isLoading, isError, error } = useQuery({
        queryFn: getCategories,
        queryKey: ['getCategories']
    });

    if (isLoading) {
        return <LoadingState />;
    }

    if (isError) {
        return <NotFound mode='drawer' />;
    }

    const Categories = () => (
        <div>
            {categories?.map((item:any, i:number) => (
                <div key={i} dir={dir}>
                    <DropList
                        id={item?.id}
                        title={item?.title}
                    />
                </div>
            ))}
        </div>
    );

    const Menu = () => (
        <div>
            <ul className="p-4" dir={dir}>
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
        <Tabs defaultValue="menu" className="w-full" value={activeTab} onValueChange={handleTabChange}>
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="menu" onMouseDown={() => handleTabChange('menu')}>
                    {t("main")}
                    {isPending && activeTab === 'menu' && <LoadingState />}
                </TabsTrigger>
                <TabsTrigger value="categories" onMouseDown={() => handleTabChange('categories')}>
                    {t("categories")}
                    {isPending && activeTab === 'categories' && <LoadingState />}
                </TabsTrigger>
            </TabsList>
            <TabsContent value="menu">
                {isPending && activeTab === 'menu' ? <LoadingState /> : <Menu />}
            </TabsContent>
            <TabsContent value="categories">
                {isPending && activeTab === 'categories' ? <LoadingState /> : <Categories />}
            </TabsContent>
        </Tabs>
    );
};

export default MenuDrawer;