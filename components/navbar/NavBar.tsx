import Link from "next/link";
import React from "react";
import DrawerWrapper from "../DrawerWrapper";
import { useTranslations } from "next-intl";
import Image from "next/image";
import logo from "@/public/logo.svg";
import Icons from "./Icons";
import CategoriesBar from "./CategoriesBar";
import SearchMed from "./Search";
import CategoriesDrawer from "./CategoriesDrawer";
const NavBar = ({ currentLoc }: { currentLoc: string }) => {
  return (
    <div className="flex flex-col sticky top-0 z-50">
      <div className="flex items-center justify-between gap-4 border-2 px-5 py-2 bg-slate-100">
        <div className="flex items-center gap-5">
        <CategoriesDrawer classes='block md:hidden' currentLoc={currentLoc}/>
          <Image width="140" height="140" alt="logo" src={logo} />
          <SearchMed />
        </div>
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-5 font-semibold text-primaryColor ">
            <Link className="hover:text-secColor transition hidden md:block text-nowrap" href='#'>About us</Link>
            <Link className="hover:text-secColor transition hidden md:block" href='#'>Contacts</Link>
          </div>
          <Icons currentLoc={currentLoc} />
        </div>
      </div>
      <CategoriesBar currentLoc={currentLoc}/>
    </div>
  );
};

export default NavBar;
