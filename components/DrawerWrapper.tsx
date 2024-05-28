'use client'
import React from "react";
import { Heart, Menu, ShoppingCart, User2Icon } from "lucide-react";
import Image from "next/image";
import image from "../public/logo.svg";
import { useTranslations } from "next-intl";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "./ui/sheet";
import Link from "next/link";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

function Categories() {
  const t = useTranslations("categories");
  <h1 className="">{t("allCategories")}</h1>
  return (

    <ul className="mt-5 space-y-4">
      <li>
        <Link className="font-semibold" href="/cat1">
          {t("home")}
        </Link>
      </li>
      <li>
        <Link className="font-semibold" href="/cat1">
          {t("allProducts")}
        </Link>
      </li>
      <li>
        <Link className="font-semibold" href="/cat1">
          {t("ourCollections")}
        </Link>
      </li>
      <li>
        <Link className="font-semibold" href="/cat1">
          {t("shopByBrand")}
        </Link>
      </li>
      <li>
        <Link className="font-semibold " href="/cat1">
          {t("Offers")}
        </Link>
      </li>
    </ul>
  )
}

function SignInForm() {
  return (
    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="text-right">
          Name
        </Label>
        <Input id="name" value="Pedro Duarte" className="col-span-3" />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="username" className="text-right">
          Username
        </Label>
        <Input id="username" value="@peduarte" className="col-span-3" />
      </div>
    </div>
  )
}

function WishList() {
  return (
    <h1>
      wishlist
    </h1>
  )
}
function Cart() {
  return (
    <h1>
      Cart
    </h1>
  )
}

function DrawerWrapper({ currentLoc, showSec }: { currentLoc: string, showSec: string }) {
  let direction: "left" | "right" = currentLoc === 'en' ? 'left' : 'right'

  return (
    <div>
      <Sheet >
        <SheetTrigger className="flex items-center gap-2 font-semibold text-nowrap">
          {showSec === 'categories' ? (
            <Menu />
          ) : showSec === 'signInForm' ? (
            <User2Icon />
          ) : showSec === 'wishList' ? (
            <Heart />
          ) : showSec === 'cart' ? (
            <ShoppingCart />
          ) : null}
        </SheetTrigger>
        <SheetContent className="w-[300px]" side={direction}>
          <SheetHeader className="items-center">
            <Image src={image} alt="logo" width={200} height={200} />
          </SheetHeader>
          {showSec === 'categories' ? (
            <Categories />
          ) : showSec === 'signInForm' ? (
            <SignInForm />
          ) : showSec === 'wishList' ? (
            <WishList />
          ) : showSec === 'cart' ? (
            <Cart />
          ) : null}
        </SheetContent>
      </Sheet>
    </div >
  );
}

export default DrawerWrapper;
