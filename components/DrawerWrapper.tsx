import React from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
} from "./ui/drawer";
import { Menu } from "lucide-react";
import Image from "next/image";
import image from "../public/logo.svg";
import { useTranslations } from "next-intl";

function DrawerWrapper() {
  const t = useTranslations("categories");

  return (
    <div>
      <Drawer direction="left">
        <DrawerTrigger className="flex items-center gap-2 pr-3 font-semibold text-nowrap border-r-2  border-slate-200">
          
            <Menu />
            <h1 className="">{t("allCategories")}</h1>
          
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <Image src={image} alt="logo" width={200} height={200} />
          </DrawerHeader>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

export default DrawerWrapper;
