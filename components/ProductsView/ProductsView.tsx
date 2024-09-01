"use client";
import React, { useEffect } from 'react';
import BreadCrumb from '@/components/Breadcrumb/BreadCrumb';
import DrawerWrapper from '@/components/Drawers/DrawerWrapper';
import ProductCard, { ProductCardSkeleton } from '@/components/ItemCard/ProductCard';
import { ProductsProvider, useAllProducts } from '@/context/ProductsProvider';
import { useInView } from 'react-intersection-observer';
import NotFound from '@/app/not-found';

type Props = {
    params?: {
        term?: string;
        id?: string;
        searchCategory?: string;
    };
    SubId?: string | null;
    brand?: string | null;
};

function ProductsContent({ params = {}, SubId, brand }: Props) {
    const { ref, inView } = useInView();
    const { products, isLoading, isError, error, setSearchParams, fetchNextPage, hasNextPage, isFetchingNextPage } = useAllProducts();
    const { term, id, searchCategory } = params;

    let title = 'Products';
    if (id && SubId) {
        title = `results for ${id}`;
    } else if (id && brand) {
        title = `Brand results for ${id}`;
    } else if (id && searchCategory) {
        title = `Category: ${searchCategory} - ID: ${id}`;
    }
    // console.log(products)

    useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage();
        }
    }, [inView, fetchNextPage, hasNextPage]);

    useEffect(() => {
        const filters: any = { page: 1 };
        if (term) {
            filters.name = term;
        } else if (SubId) {
            filters.subCategory = SubId;
        } else if (brand) {
            filters.brand = brand;
        }
        setSearchParams(filters);
    }, [term, id, searchCategory, SubId, brand, setSearchParams]);

    return (
        <section className="bg-gray-50 pb-5">
            {/* <BreadCrumb /> */}
            <div className="p-0 md:p-10 bg-white mx-auto max-w-[1600px] rounded-lg border">
                <div className="p-5 flex justify-between">
                    <h1 className="text-md md:text-3xl font-semibold px-5 md:px-10">
                        {title}
                    </h1>
                    <DrawerWrapper showSec="filter" />
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

function ProductsView(props: Props) {
    const initialFilters: any = { page: 1 };
    if (props.SubId) {
        initialFilters.subCategory = props.SubId;
    } else if (props.brand) {
        initialFilters.brand = props.brand;
    }

    return (
        <ProductsProvider initialFilters={initialFilters}>
            <ProductsContent {...props} />
        </ProductsProvider>
    );
}

export default ProductsView;