'use client';
import React from "react";
import StarRating from "../CustomerReview/StarRating";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart } from "lucide-react";
import Container from "../Container";
import { useTranslations } from "next-intl";
import Counter from "../ItemCard/Counter";
import ImageMagnifier from "./ImageMagnify";
import SideBar from "./SideBar";
import ProductsCarousel from "../Carousels/ProductsCarousel";
import ReviewComment from "../ReviewComment/ReviewComment";

type productDetailsProps = {
    brand?: string;
    details?: string;
    title?: string;
    price?: number;
    img?: string;
    stock?: number;
    dir?: string;
};

export function ProductDetails({ details, title, price, img, brand, stock, dir }: productDetailsProps) {
    const handleSetRating = (rating: number) => {
        console.log(`Rating set to: ${rating}`);
    };

    const t = useTranslations("Buttons");
    return (
        <section className="p-4 md:p-10 bg-white mx-auto max-w-[1600px] rounded-lg border ">
            <section className=" md:pt-5 w-full flex flex-col lg:flex-row gap-3">
                <div dir={dir} className="w-full lg:w-2/3 space-y-4">
                    <div className=" h-[300px] md:h-[400px]">
                        <ImageMagnifier
                            src={"https://images.unsplash.com/photo-1712371962783-62c7f951951f?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                            magnifierHeight={200}
                            magnifierWidth={200}
                            zoomLevel={2}
                        />
                    </div>

                    <section className="p-4 md:p-6 bg-gray-50 mt-6 md:mt-10 rounded-lg text-wrap ">
                        <h1 className="text-lg font-semibold border border-b-2">About this item</h1>
                        <p className="mt-4 text-base font-normal leading-7 text-gray-800 ">
                            {details ? details : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis commodi sit maiores corporis veniam voluptatem excepturi sint molestias debitis nesciunt dolore, hic soluta eveniet, delectus, aperiam earum magni illum dolores!"}
                        </p>
                    </section>

                    <div className='flex flex-wrap'>
                        <ReviewComment userName={'abdul'} rating={5} comment={'loremsdfhasodhf;lasdflkashdfhaslkdfhapsodfhal;skdjhoash;dflk;ashdfpohas;ildkf;askhfdoiaslnf;klashdpfo;asn;kldfhgasiugfjk;aSBFDLJGSA;IODFLJKASGDFOIASGUBFKLJASBDIOUFGAOIUFLBAWLFKJEGFOIASDGFUIOP;KJBAS;JKGFHASDPUIF;H;jkoshfpio[aiyghf;ah;la'} />
                        <ReviewComment userName={'abdul'} rating={3} comment={'this is so shit'} />
                        <ReviewComment userName={'abdul'} rating={2} comment={'oh hell'} />
                    </div>
                    <Container title='Similar items you might like' className='md:block hidden'>
                        <ProductsCarousel />
                    </Container>
                </div>

                <div className="sticky top-[120px] self-start w-full lg:w-2/3 space-y-3 p-5 bg-white border rounded-lg  border-gray-100">
                    <h3 className="text-xs text-gray-500 font-light">
                        {brand ? brand : "Johnson"}
                    </h3>
                    <h3 className="text-3xl font-semibold">
                        {title ? title : "Premium Blazer"}
                    </h3>
                    <h5 className="text-2xl text-gray-900">
                        {price ? `$${price}` : "$1000"}
                    </h5>
                    {stock ? (
                        <h5 className="text-xl text-gray-900">
                            In Stock : {stock}
                        </h5>
                    ) : (
                        <h5 className="text-thin text-red-500">Out Of Stock</h5>
                    )}

                    <div className="my-8 flex items-center gap-2">
                        <StarRating
                            mode="rating"
                            maxRating={5}
                            defaultRating={4}
                            size={30}
                            onSetRating={handleSetRating}
                        />
                        <p className="text-sm font-bold text-gray-700">
                            4.0/5 (100 reviews)
                        </p>
                    </div>
                    <div className="mb-4 flex w-full items-center gap-3">
                        <Button className="">
                            <Heart className="h-6 w-6" />
                        </Button>
                        <Button className="bg-primaryColor gap-2 w-full">
                            {t("addToCart")}
                            <ShoppingCart />
                        </Button>

                        <Counter />
                    </div>
                    <SideBar dir="rtl" />
                </div>
            </section>
        </section>
    );
}

export default ProductDetails;
