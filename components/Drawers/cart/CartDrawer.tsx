import React from "react";
import CartDrawerItem from "./CartDrawerItem";
import { pharmacyCat, pharmacyCategories, products } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { redirect } from "next/navigation";
import Link from "next/link";

type Props = {
  dir: string;
  currentLoc: string;
};
export default function CartDrawer({ dir, currentLoc }: Props) {
  const t = useTranslations("cart");
  // Function to handle navigation
  const navigate = (path: string) => {
    // Ensure currentLoc is defined or handle appropriately
    const url = `${currentLoc}${path}`;
    window.location.href = url; // Use window.location.href for navigation
  };
  return (
    <div className="h-dvh flex flex-col " dir={dir}>
      <div className="h-2/3 overflow-auto overflow-x-hidden border-b-2">
        {products.map((prod, i) => (
          <CartDrawerItem details={prod} key={i} />
        ))}
      </div>
      <div className="p-3  flex flex-col gap-4">
        <div className="flex text-lg font-medium justify-between items-center">
          <h3>{t("totalPrice")}</h3>
          <p>
            399 <span className="text-sm font-light">{t("dinar")}</span>
          </p>
        </div>
        <p className="text-xs bg-green-700 p-1 rounded-md text-white">
          {t("taxes")}
        </p>
        <div className="flex flex-col items-center gap-3">
         
            <button
              className=" flex justify-center w-full bg-primaryColor font-medium text-white py-2 rounded-full hover:opacity-80"
              onClick={() => navigate(`mycart`)}
            >
              {t("expandCart")}
            </button>
        
          
            <button
              className=" flex justify-center w-full bg-primaryColor font-medium text-white py-2 rounded-full hover:opacity-80"
              onClick={() => navigate(`/checkout`)}
            >
              {t("checkout")}
            </button>
    
        </div>
      </div>
    </div>
  );
}
