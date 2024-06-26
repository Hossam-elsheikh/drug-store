'use client'
import React from "react";
import { Filter, Heart, Menu, ShoppingCart, User2Icon } from "lucide-react";
import Image from "next/image";
import image from "../public/logo.svg";
import { useTranslations } from "next-intl";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "./ui/sheet";
import Link from "next/link";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import FilterDrawer from "./FilterDrawer/FilterDrawer";
import AuthForm from "./Form/AuthForm";
import SignOutButton from "./formButton/SignOutButton";
import useRefreshToken from "@/hooks/useRefreshToken";
import { Button } from "./ui/button";
import useSignOut from "@/hooks/useSignOut";
import { useRouter } from "next/navigation";

// function Categories() {
//   const t = useTranslations("categories");
//   <h1 className="">{t("allCategories")}</h1>
//   return (

//     <ul className="mt-5 space-y-4">
//       <li>
//         <Link className="font-semibold" href="/cat1">
//           {t("home")}
//         </Link>
//       </li>
//       <li>
//         <Link className="font-semibold" href="/cat1">
//           {t("allProducts")}
//         </Link>
//       </li>
//       <li>
//         <Link className="font-semibold" href="/cat1">
//           {t("ourCollections")}
//         </Link>
//       </li>
//       <li>
//         <Link className="font-semibold" href="/cat1">
//           {t("shopByBrand")}
//         </Link>
//       </li>
//       <li>
//         <Link className="font-semibold " href="/cat1">
//           {t("Offers")}
//         </Link>
//       </li>
//     </ul>
//   )
// }

function SignInForm(currentLoc: any) {
    const signOutHook = useSignOut()
    const router = useRouter()
    const signOut = async () => {
        try{
            await signOutHook()
            router.push('/en/sign-in')
        }catch(error){
            console.error('Error during sign out:', error);
        }
    }
    return (
        <>
            <AuthForm Type="sign-in" variant="drawer" currentLoc={`/${currentLoc}/`} />
            <Button onClick={signOut}>
                sign-out
            </Button>        </>
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
    let direction: "left" | "right" = currentLoc === 'ar' ? 'left' : 'right'

    return (
        <div>
            <Sheet >
                <SheetTrigger className="flex items-center gap-2 font-semibold text-nowrap">
                    {showSec === 'categories' ? (
                        <Menu />
                    ) : showSec === 'signInForm' ? (
                        <User2Icon className="cursor-pointer hidden md:block" />
                    ) : showSec === 'wishList' ? (
                        <Heart className="cursor-pointer" />
                    ) : showSec === 'cart' ? (
                        <div className='flex items-center bg-secColor p-2 px-4 hover:bg-primaryColor hover:scale-105 cursor-pointer transition rounded-3xl text-white gap-2 '>
                            <p className='font-semibold'>My Cart</p>
                            <ShoppingCart />
                        </div>
                    ) : showSec === 'filter' ? (
                        <Filter className='cursor-pointer shadow-sm active:scale-95 scale-115 hover:bg-gray-50 rounded-md duration-300' />
                    ) : null}
                </SheetTrigger>
                <SheetContent className="w-[300px]" side={direction}>
                    <SheetHeader className="items-center">
                        <div className="relative w-full h-24 my-8">
                            <Image alt="logo" src={image} className="object-cover mx-auto" width={100} height={100} />
                        </div>

                    </SheetHeader>
                    {/* {showSec === 'categories' ? (
            <Categories />
          ) :  */}
                    {showSec === 'signInForm' ? (
                        <SignInForm />
                    ) : showSec === 'wishList' ? (
                        <WishList />
                    ) : showSec === 'cart' ? (
                        <Cart />
                    ) : showSec === 'filter' ? (
                        <FilterDrawer />
                        // <div>hi</div>
                    ) : null}
                </SheetContent>
            </Sheet>
        </div >
    );
}

export default DrawerWrapper;
