"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import React, { useState, useTransition } from "react";
import DropList from "./DropList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/axios/instance";
import { Loader2 } from "lucide-react";
import NotFound from "@/app/not-found";
import { useLocale } from "@/context/LocaleProvider";

const MenuDrawer = () => {
	const t = useTranslations("Navigation");
	const [isPending, startTransition] = useTransition();
	const [activeTab, setActiveTab] = useState("menu");
	const { dir } = useLocale();

	const handleTabChange = (value: string) => {
		startTransition(() => {
			setActiveTab(value);
		});
	};

	const {
		data: categories,
		isLoading,
		isError,
		error,
	} = useQuery({
		queryFn: getCategories,
		queryKey: ["getCategories"],
	});

	

	if (isError) {
		return <NotFound mode="drawer" />;
	}

	const Categories = () => (
		<div>
			{categories?.map(({ name, _id: id }) => (
				<div key={id} dir={dir}>
					<DropList id={id} name={name} />
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
		<Tabs
			defaultValue="menu"
			className="w-full"
			value={activeTab}
			onValueChange={handleTabChange}
		>
			<TabsList className="grid w-full grid-cols-2">
				<TabsTrigger
					value="menu"
					onMouseDown={() => handleTabChange("menu")}
				>
					{t("main")}
					{isPending && activeTab === "menu" && (
						<Loader2 className="animate-spin ml-2 h-4 w-4" />
					)}
				</TabsTrigger>
				<TabsTrigger
					value="categories"
					onMouseDown={() => handleTabChange("categories")}
				>
					{t("categories")}
					{isPending && activeTab === "categories" && (
						<Loader2 className="animate-spin ml-2 h-4 w-4" />
					)}
				</TabsTrigger>
			</TabsList>
			<TabsContent value="menu">
				{isPending && activeTab === "menu" ? (
					<div className="flex justify-center items-center h-full">
						<Loader2 className="animate-spin h-6 w-6 text-primaryColor" />
					</div>
				) : (
					<Menu />
				)}
			</TabsContent>
			<TabsContent value="categories">
				{isPending && activeTab === "categories" ? (
					<div className="flex justify-center items-center h-full">
						<Loader2 className="animate-spin h-6 w-6 text-primaryColor" />
					</div>
				) : (
					<Categories />
				)}
			</TabsContent>
		</Tabs>
	);
};

export default MenuDrawer;
