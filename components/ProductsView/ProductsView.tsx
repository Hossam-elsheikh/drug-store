import BreadCrumb from '@/components/Breadcrumb/BreadCrumb';
import DrawerWrapper from '@/components/Drawers/DrawerWrapper';
import React from 'react';
import { products } from "@/lib/utils";
import ProductCard from '@/components/ItemCard/ProductCard';

type Props = {
    params: {
        term?: string;
        id?: string;
        searchCategory?: string;
    };
};

function ProductsView({ params = {} }: Props) {
    const { term, id, searchCategory } = params;

    let title;
    if (term) {
        title = `Search Results For ${term}`;
    } else if (searchCategory && id) {
        title = `Results for ${searchCategory} and the ${id}`;
    } else {
        title = 'Results';
    }

    return (
        <section className="bg-gray-50 pb-5">
            <BreadCrumb />

            <div className="p-4 md:p-10 bg-white mx-auto max-w-[1600px] rounded-lg border">
                <div className="p-5 flex justify-between">
                    <h1 className="text-2xl md:text-3xl font-semibold px-5 md:px-10">
                        {title}
                    </h1>
                    <DrawerWrapper showSec="filter" currentLoc="right" />
                </div>

                <section className="flex lg:gap-10 gap-3 justify-center flex-wrap mt-5">
                    {products && products.length > 0 ? (
                        products.map((item, i) => (
                            <ProductCard details={item} key={i} />
                        ))
                    ) : (
                        <h1>No results found</h1>
                    )}
                </section>
            </div>
        </section>
    );
}

export default ProductsView;
