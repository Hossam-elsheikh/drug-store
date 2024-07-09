"use client";
import React, { useContext } from "react";
import { Filter, Heart, Menu, ShoppingCart, User2Icon } from "lucide-react";
import Image from "next/image";
import image from "@/public/logo.svg";
import { useTranslations } from "next-intl";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTrigger,
	SheetClose,
} from "../ui/sheet";
import Link from "next/link";
import FilterDrawer from "../FilterDrawer/FilterDrawer";
import AuthForm from "../Form/AuthForm";
import { Button } from "../../components/ui/button";
import useSignOut from "@/hooks/useSignOut";
import { useRouter } from "next/navigation";
import CartDrawer from "./cart/CartDrawer";
import { FavContext } from "@/context/favoriteProvider";

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
	const signOutHook = useSignOut();
	const router = useRouter();
	const signOut = async () => {
		try {
			await signOutHook();
			router.push("/en/sign-in");
		} catch (error) {
			console.error("Error during sign out:", error);
		}
	};
	return (
		<>
			<AuthForm
				Type="sign-in"
				variant="drawer"
				currentLoc={`/${currentLoc}/`}
			/>
			<Button onClick={signOut}>sign-out</Button>{" "}
		</>
	);
}

function WishList() {
	return (
		<h1>
			wishlist
			<img src="http://localhost:4000/uploads/photos/image-1719536041274.jpg" />
		</h1>
	);
}
type Props = {
	currentLoc: string;
	showSec: string;
	title?: string;
};
function DrawerWrapper({ currentLoc, showSec, title }: Props) {
	let direction: "left" | "right" = currentLoc === "ar" ? "left" : "right";

	const { getTotalFavs } = useContext(FavContext);
	const totalFavs = getTotalFavs();
	return (
		<div>
			<Sheet>
				{/* <SheetClose/> */}
				<SheetTrigger className="flex items-center gap-2 font-semibold text-nowrap">
					{showSec === "categories" ? (
						<Menu />
					) : showSec === "signInForm" ? (
						<User2Icon className="cursor-pointer hidden md:block" />
					) : showSec === "wishList" ? (
						<>
							{totalFavs > 0 ? (
								<span className="relative inline-block">
									<span className="absolute -top-2 -left-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
										{totalFavs}
									</span>
									<Heart className="cursor-pointer hover:text-red-500 transition-colors duration-200" />
								</span>
							) : (
								<Heart className="cursor-pointer hover:text-red-500 transition-colors duration-200" />
							)}
						</>
					) : showSec === "cart" ? (
						<button className="flex items-center bg-secColor p-2 px-4 hover:bg-primaryColor hover:scale-105 cursor-pointer transition-all duration-200 rounded-3xl text-white gap-2 ">
							<p className="font-semibold">My Cart</p>
							<ShoppingCart />
						</button>
					) : showSec === "filter" ? (
						<div className="flex gap-2">
							Filter
							<Filter className="cursor-pointer shadow-sm active:scale-95 scale-115 hover:bg-gray-50 rounded-md duration-300" />
						</div>
					) : null}
				</SheetTrigger>
				<SheetContent className="w-[300px] p-2" side={direction}>
					<SheetHeader className="items-center p-5">
						<h2 className="text-lg text-primaryColor font-medium w-full text-center border-b-2">
							{showSec === "categories"
								? null
								: showSec === "signInForm"
								? direction === "left"
									? "تسجيل الدخول"
									: "Sign in"
								: showSec === "wishList"
								? direction === "left"
									? "فائمة المفضلة"
									: "Favorite items"
								: showSec === "cart"
								? direction === "left"
									? "عربة التسوق"
									: "My cart"
								: showSec === "filter"
								? direction === "left"
									? "فلتر المنتجات"
									: "Filter products"
								: null}
						</h2>
					</SheetHeader>
					{/* {showSec === 'categories' ? (
            <Categories />
          ) :  */}
					{showSec === "signInForm" ? (
						<SignInForm />
					) : showSec === "wishList" ? (
						<WishList />
					) : showSec === "cart" ? (
						<CartDrawer currentLoc={currentLoc} dir={direction} />
					) : showSec === "filter" ? (
						<FilterDrawer />
					) : null}
				</SheetContent>
			</Sheet>
		</div>
	);
}

export default DrawerWrapper;
