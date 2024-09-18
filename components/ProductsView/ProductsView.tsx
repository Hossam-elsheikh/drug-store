"use client";
import React from 'react';
import BreadCrumb from '@/components/Breadcrumb/BreadCrumb';
import DrawerWrapper from '@/components/Drawers/DrawerWrapper';
import ProductCard, { ProductCardSkeleton } from '@/components/ItemCard/ProductCard';
import { ProductsProvider, useAllProducts } from '@/context/ProductsProvider';
import NotFound from '@/app/not-found';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

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
    const { products, isLoading, isError, error, setSearchParams, totalPages, currentPage } = useAllProducts();
    const { term, id, searchCategory } = params;

    let title = 'Products';
    if (id && SubId) {
        title = `results for ${id}`;
    } else if (id && brand) {
        title = `Brand results for ${id}`;
    } else if (id && searchCategory) {
        title = `Category: ${searchCategory} - ID: ${id}`;
    }

    React.useEffect(() => {
        const filters: any = { page: currentPage };
        if (term) {
            filters.search = term;
        } else if (SubId) {
            filters.subCategory = SubId;
        } else if (brand) {
            filters.brand = brand;
        }
        setSearchParams(filters);
    }, [term, id, searchCategory, SubId, brand, setSearchParams, currentPage]);

    const handlePageChange = (newPage: number) => {
        setSearchParams({ page: newPage });
    };

    if (isError) {
        return <div>Error: {error?.message}</div>;
    }

    return (
        <section className="bg-gray-50 pb-5">
            <BreadCrumb />
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
                            products.map((product, i) => (
                                <ProductCard key={product._id} details={product} index={i} mode='default' />
                            ))
                        ) : (
                            <NotFound />
                        )
                    )}
                </section>

                {totalPages > 1 && (
                    <Pagination className='pt-10'>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
                                />
                            </PaginationItem>
                            {[...Array(totalPages)].map((_, index) => (
                                <PaginationItem key={index}>
                                    <PaginationLink
                                        className='text-sm font-medium transition-all text-gray-700 bg-white border border-gray-300 rounded-full shadow-sm hover:border-gray-400 active:scale-95 hover:bg-gray-50 focus:outline-none duration-200'
                                        onClick={() => handlePageChange(index + 1)}
                                        isActive={currentPage === index + 1}
                                    >
                                        {index + 1}
                                    </PaginationLink>
                                </PaginationItem>
                            ))}
                            <PaginationItem>
                                <PaginationNext
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                )}
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