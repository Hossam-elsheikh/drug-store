import BreadCrumb from "@/components/Breadcrumb/BreadCrumb";
import ProductCard from "@/components/ItemCard/ProductCard";
import { products } from "@/lib/utils";
import React from "react";

type Props = {
    params: {
        term: string;
    };
};

function SearchPage({ params }: Props) {
    const { term } = params;

    return (
        <section className="bg-gray-50 pb-5">
            <BreadCrumb />

            <div className="p-4 md:p-10 bg-white mx-auto max-w-[1600px] rounded-lg border">
                <div className="flex flex-col space-y-4">
                    <h1 className="text-2xl font-semibold px-5">
                        Search Results For {term}
                    </h1>

                    <section className="flex gap-3 flex-wrap">
                        {products && products.length > 0 ? (
                            products.map((item, i) => (
                                <ProductCard details={item} key={i} />
                            ))
                        ) : (
                            <h1>No results found</h1>
                        )}
                    </section>
                </div>
            </div>
        </section>
    );
}

export default SearchPage;
