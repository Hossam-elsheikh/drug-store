"use client";
import React, { useContext, useEffect } from 'react';
import BreadCrumb from '@/components/Breadcrumb/BreadCrumb';
import DrawerWrapper from '@/components/Drawers/DrawerWrapper';
import ProductCard, { ProductCardSkeleton } from '@/components/ItemCard/ProductCard';
import { useAllProducts } from '@/context/ProductsProvider';
import { useInView } from 'react-intersection-observer';

import NotFound from '@/app/not-found';

type Props = {
    params: {
        term?: string;
        id?: string;
        searchCategory?: string;
    };
};

function ProductsView({ params = {} }: Props) {
    const { ref, inView } = useInView();
    const { products, isLoading, isError, error, setSearchParams, fetchNextPage, hasNextPage, isFetchingNextPage } = useAllProducts();
    const { term, id, searchCategory } = params;
    
    console.log(products)

    let title = 'Products';
    if (term) {
        title = `Search results for "${term}"`;
    } else if (id && searchCategory) {
        title = `Category: ${searchCategory} - ID: ${id}`;
    }

    useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage();
        }
    }, [inView, fetchNextPage, hasNextPage]);

    useEffect(() => {
        if (term) {
            setSearchParams({ search: term });
        } else if (id && searchCategory) {
            setSearchParams({ search: `${searchCategory} ${id}` });
        } else {
            setSearchParams({ page: 1, search: undefined });
        }
    }, [term, id, searchCategory, setSearchParams]);
    



    return (
        <section className="bg-gray-50 pb-5">
            <BreadCrumb />
            <div className="p-4 md:p-10 bg-white mx-auto max-w-[1600px] rounded-lg border">
                <div className="p-5 flex justify-between">
                    <h1 className="text-2xl md:text-3xl font-semibold px-5 md:px-10">
                        {title}
                    </h1>
                    <DrawerWrapper showSec="filter"  />
                </div>

                <section className="flex md:gap-7 gap-3 justify-center flex-wrap mt-5 w-full">
                    {isLoading ? (
                        <>
                            {[1, 2, 3, 4, 5].map((i) => (
                                <ProductCardSkeleton key={i} />
                            ))}
                        </>
                    ) : (
                        products && products.length > 0 ? (
                            products.map((item, i) => (
                                <div key={i} ref={i === products.length - 1 ? ref : null}>
                                    <ProductCard details={item} index={i} />
                                </div>
                            ))
                        ) : (
                            <NotFound />
                        )
                    )}
                </section>
                {isFetchingNextPage && <div>Loading more...</div>}
            </div>
        </section>
    );
}

export default ProductsView;
