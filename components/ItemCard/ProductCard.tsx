import Image from "next/image";
import React, { useState } from "react";
import { Heart, ShoppingCart } from "lucide-react";
import Link from "next/link";
import ProductDialog from "./ProductDialog";

const ProductCard = ({ details }) => {
  const [quickAccess, setQuickAccess] = useState(false);
  const [translate, setTranslate] = useState("");
  const QuickAccess = () => (
    <div
      className="absolute transition duration-300 rounded-md w-full h-full flex items-center justify-center  animate-fadein bg-black/25 "
    >
      <button className="bg-white px-5 hover:scale-105 text-sm py-2 rounded-full text-primaryColor font-semibold ">
        Quick access
      </button>
    </div>
  );
  return (
    <div
      
      className="flex border transition p-2 flex-col max-w-52 rounded-lg  shadow-xl pb-1"
    >
      {/* <ProductDialog /> */}
      <div onMouseOver={() => setQuickAccess(true)}
      onMouseOut={() => setQuickAccess(false)} className="bg-slate-100 w-full overflow-hidden cursor-pointer h-52  flex relative justify-center">
        <Image
          src={details.image}
          alt={details.title}
          layout="fill"
         
        />
        {quickAccess && <QuickAccess />}
      </div>
      <div className="flex flex-col p-3 gap-3">
        <div>
          <Link href={details.src}>
            <h2 className="font-semibold text-md truncate hover:text-secColor ">
              {details.title}
            </h2>
          </Link>
          <p className="font-semibold text-start text-secColor">
            {details.price} <span className="font-light">KWD</span>
          </p>
        </div>
        <div className="flex items-center justify-between">
          <Heart className="cursor-pointer hover:text-red-500 transition " />
          <div className="flex bg-primaryColor px-2 py-2 rounded-md text-white items-center gap-2 hover:bg-secColor transition cursor-pointer">
            <p className="text-sm font-medium hidden sm:block">Add to cart</p>
            <p className="text-xl font-medium block sm:hidden">+</p>
            <ShoppingCart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
