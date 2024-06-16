"use client";
import Image from "next/image";
import React, { useState } from "react";
import { Heart, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { Modal } from "./Modal";

const ProductCard = ({ details }) => {
  const [quickAccess, setQuickAccess] = useState(false);
  const [dialog, setDialog] = useState(false);

  const [translate, setTranslate] = useState("");
  const QuickAccess = () => (
    <div className="absolute transition duration-300 w-full rounded-t-lg h-full flex items-center flex-col gap-3 justify-center  animate-fadein bg-black/25 ">
      

        <Modal buttonText="Quick access" hideQuickAccess={()=>setQuickAccess(false)} />
      
      <button className="bg-white px-3 w-3/5 hover:scale-105 duration-300 text-sm py-2 rounded-full text-primaryColor hover:bg-secColor hover:text-slate-100 font-medium ">
        View more
      </button>
    </div>
  );
  return (
    <div className="flex border transition flex-col max-w-52 rounded-lg  shadow-sm pb-1">
      
      <div
        onMouseOver={() => setQuickAccess(true)}
        onMouseLeave={() => setQuickAccess(false)}
        className="bg-slate-100 w-full overflow-hidden cursor-pointer h-56 flex relative justify-center"
      >

        <Image src={details.image} alt={details.title} layout="fill" />
        {quickAccess && <QuickAccess />}
      </div>
      <div className="flex flex-col p-3 gap-3">
        <div>
          <Link href={details.src}>
            <h2 className="font-medium text-md truncate hover:text-secColor ">
              {details.title}
            </h2>
          </Link>
          <p className="font-semibold text-start text-secColor">
            {details.price} <span className="font-light">KWD</span>
          </p>
        </div>
        <div className="flex items-center justify-between">
          <Heart className="cursor-pointer hover:text-red-500 transition " />
          <div className="flex bg-primaryColor px-3 py-2 rounded-md text-white items-center gap-2 hover:bg-secColor transition cursor-pointer">
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