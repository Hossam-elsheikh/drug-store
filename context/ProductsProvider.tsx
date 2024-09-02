'use client';

import React, { createContext, ReactNode, useState, useCallback, useContext } from "react";
import { useInfiniteQuery, InfiniteData, QueryFunctionContext } from "@tanstack/react-query";
import { getProducts } from "@/axios/instance";

export type Product = {
    _id: string;
    name: {
        en: string;
        ar: string;
    };
    price: number;
    image: string;
};

export interface SearchParams {
    page?: number;
    search?: string;
}

interface ProductsResponse {
    products: Product[];
    nextPage: number | null;
}

export interface ProductsContextType {
    products: Product[] | undefined;
    isLoading: boolean;
    isError: boolean;
    error: Error | null;
    searchParams: SearchParams;
    setSearchParams: (params: SearchParams) => void;
    fetchNextPage: () => void;
    hasNextPage: boolean | undefined;
    isFetchingNextPage: boolean;
}

const defaultContextValue: ProductsContextType = {
    products: undefined,
    isLoading: false,
    isError: false,
    error: null,
    searchParams: { page: 1 },
    setSearchParams: () => { },
    fetchNextPage: () => { },
    hasNextPage: false,
    isFetchingNextPage: false,
};

export const ProductsContext = createContext<ProductsContextType>(defaultContextValue);

export const ProductsProvider = ({ children, initialFilters }: { children: ReactNode, initialFilters?: SearchParams }) => {
    const [searchParams, setSearchParams] = useState<SearchParams>({ page: 1, ...initialFilters });

    const fetchProducts = useCallback(
        ({ pageParam = 1 }: QueryFunctionContext<[string, SearchParams], number>) =>
            getProducts({ ...searchParams, page: pageParam }),
        [searchParams]
    );

    const {
        data,
        isLoading,
        isError,
        error,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage
    } = useInfiniteQuery<ProductsResponse, Error>({
        queryKey: ["getProducts", searchParams],
        queryFn: fetchProducts,
        getNextPageParam: (lastPage) => {
            // Return undefined when there is no next page
            return lastPage.nextPage ?? undefined;
        },
        initialPageParam: 1,
    });

    const updateSearchParams = useCallback((params: SearchParams) => {
        setSearchParams(prevParams => ({ ...prevParams, ...params }));
    }, []);

    const products = data?.pages.flatMap(page => page.products);

    return (
        <ProductsContext.Provider
            value={{
                products,
                isLoading,
                isError,
                error,
                searchParams,
                setSearchParams: updateSearchParams,
                fetchNextPage,
                hasNextPage,
                isFetchingNextPage
            }}
        >
            {children}
        </ProductsContext.Provider>
    );
};

export const useAllProducts = () => {
    const context = useContext(ProductsContext);
    if (!context) {
        throw new Error('ProductsContext must be used within a ProductsProvider');
    }
    return context;
};
