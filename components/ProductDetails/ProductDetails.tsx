'use client'
import React from "react";
import StarRating from "../CustomerReview/StarRating";
import { Button } from '@/components/ui/button';
import { Heart } from "lucide-react";
import Container from "../Container";
import { useTranslations } from "next-intl";
import Counter from "../ItemCard/Counter";
import ImageMagnifier from "./ImageMagnify";

type productDetailsProps = {
    brand?: string;
    details?: string;
    title?: string;
    price?: number;
    img?: string;
    stock?: number;
};

export function ProductDetails({ details, title, price, img, brand, stock }: productDetailsProps) {
    const handleSetRating = (rating: number) => {
        console.log(`Rating set to: ${rating}`);
    };

    const t = useTranslations("Buttons");
    return (
        <div className='pt-10'>
            <Container className="bg-white shadow-md rounded-lg max-w-[1500px]">
                <section className="py-16 px-8">
                    <div className="mx-auto container grid  grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="w-full h-[700px]"> {/* Adjusted container */}
                            <ImageMagnifier
                                src={"https://images.unsplash.com/photo-1553456558-aff63285bdd1?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                                magnifierHeight={200}
                                magnifierWidth={200}
                                zoomLevel={2}
                            />
                        </div>
                        <div>
                            <h3 className="mb-4 text-xs text-gray-500 font-semibold">
                                {brand ? brand : 'Johnson'}
                            </h3>
                            <h3 className="mb-4 text-3xl font-semibold">
                                {title ? title : 'Premium Blazer'}
                            </h3>
                            <h5 className="text-2xl text-gray-900">
                                {price ? `$${price}` : '$1000'}
                            </h5>
                            {stock ? (
                                <h5 className="text-xl text-gray-900">
                                    In Stock : {stock}
                                </h5>
                            ) : (
                                <h5 className="text-thin text-red-500">
                                    Out Of Stock
                                </h5>
                            )}
                           
                            <div className="my-8 flex items-center gap-2">
                                <StarRating
                                    maxRating={5}
                                    defaultRating={4}
                                    size={30}
                                    onSetRating={handleSetRating}
                                />
                                <p className="text-sm font-bold text-gray-700">
                                    4.0/5 (100 reviews)
                                </p>
                            </div>
                            <div className="mb-4 flex w-full items-center gap-3 ">
                                <Button className="">
                                    <Heart className="h-6 w-6" />
                                </Button>
                                <Button className="bg-primaryColor w-full">
                                    {t('addToCart')}
                                </Button>
                                
                                    <Counter />
                               
                            </div>
                        </div>
                    </div>
                    <section className='p-10 bg-gray-50 mt-10 rounded-lg'>
                        <h1 className='text-lg font-semibold'>Over View</h1>
                        <p className="mt-4 text-base font-normal leading-7 text-gray-500">
                            {details ? details : 'As we live, our hearts turn colder...'}
                        </p>
                    </section>
                </section>
            </Container>
        </div>
    );
}

export default ProductDetails;
