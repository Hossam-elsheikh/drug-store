'use client';
import React from "react";

import ImageMagnifier from "./ImageMagnify";
import ProductsCarousel from "../Carousels/ProductsCarousel";
import ReviewComment from "../ReviewComment/ReviewComment";
import { products } from "@/lib/utils";
import Details from "./Details";
import About from "./About";

type productDetailsProps = {
    brand?: string;
    details?: string;
    title?: string;
    price?: number;
    img?: string;
    stock?: number;
    dir?: string;
};

export function ProductDetails({ details, dir }: productDetailsProps) {
    return (
        <section className="p-4 md:p-10 bg-white mx-auto max-w-[1600px] rounded-lg border">
            <section className="md:pt-5 w-full flex flex-col lg:flex-row gap-3">
                <div dir={dir} className="w-full lg:w-2/3 space-y-10">
                    <div className="h-[300px] md:h-[400px]">
                        <ImageMagnifier
                            src={"https://images.unsplash.com/photo-1712371962783-62c7f951951f?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                            magnifierHeight={200}
                            magnifierWidth={200}
                            zoomLevel={2}
                        />
                    </div>


                    <Details className='block lg:hidden' />
                    <About />
                    <ProductsCarousel mode='n' products={products} />

                    <hr />


                    <div className='flex flex-col gap-4'>
                        <ReviewComment userName={'abdul'} rating={5} comment={'loremsdfhasodhf;lasdflkashdfhaslkdfhapsodfhal;skdjhoash;dflk;ashdfpohas;ildkf;askhfdoiaslnf;klashdpfo;asn;kldfhgasiugfjk;aSBFDLJGSA;IODFLJKASGDFOIASGUBFKLJASBDIOUFGAOIUFLBAWLFKJEGFOIASDGFUIOP;KJBAS;JKGFHASDPUIF;H;jkoshfpio[aiyghf;ah;la'} />
                        <ReviewComment userName={'abdul'} rating={3} comment={'this is so shit'} />
                        <ReviewComment userName={'abdul'} rating={2} comment={'oh hell'} />
                    </div>

                </div>
                <Details className="hidden lg:block md:order-1" />
            </section>
        </section>
    );
}

export default ProductDetails;
