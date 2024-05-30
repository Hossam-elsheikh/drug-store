import React from "react";
import Image from "next/image";
import StarRating from "../CustomerReview/StarRating";
import { Button } from '@/components/ui/button';
import { Heart } from "lucide-react";
import Container from "../Container";
import Counter from "../ItemCard/Counter";
import { useTranslations } from "next-intl";

export function ProductDetails() {
    const handleSetRating = (rating: number) => {
        console.log(`Rating set to: ${rating}`);
    };

    const t = useTranslations("Buttons");
    return (
        <Container>
            <section className="py-16 px-8">
                <div className="mx-auto container grid place-items-center grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="relative w-full h-96"> {/* Added a container with defined height */}
                        <Image
                            src="https://images.unsplash.com/photo-1553456558-aff63285bdd1?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt="pink blazer"
                            layout="fill"
                            objectFit="cover" 
                            className="rounded-lg" 
                        />
                    </div>
                    <div>
                        <h3 className="mb-4 text-3xl font-semibold">
                            Premium Blazer
                        </h3>
                        <h5 className="text-2xl text-gray-900">$1,490</h5>
                        <p className="mt-4 text-base font-normal leading-7 text-gray-500">
                            As we live, our hearts turn colder. Cause pain is what we go through
                            as we become older. We get insulted by others, lose trust for those
                            others. We get back stabbed by friends. It becomes harder for us to
                            give others a hand. We get our heart broken by people we love, even
                            that we give them all we have. Then we lose family over time. What
                            else could rust the heart more over time? Blackgold.
                        </p>
                        <div><Counter/></div>
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
                        </div>
                    </div>
                </div>
            </section>
        </Container>
    );
}

export default ProductDetails;
