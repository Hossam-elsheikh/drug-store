'use client';

import React, { createContext, ReactNode, useState, useCallback, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/axios/instance";
import { Product } from "@/types";

export interface SearchParams {
    page?: number;
    search?: string;
    category: string | undefined
}

interface ProductsResponse {
    products: Product[];
    totalPages: number;
    currentPage: number;
}

export interface ProductsContextType {
    products: Product[] | undefined;
    isLoading: boolean;
    isError: boolean;
    error: Error | null;
    searchParams: any;
    setSearchParams: (params: SearchParams) => void;
    totalPages: number;
    currentPage: number;
    
}

const defaultContextValue: ProductsContextType = {
    products: undefined,
    isLoading: false,
    isError: false,
    error: null,
    searchParams: { page: 1 },
    setSearchParams: () => { },
    totalPages: 1,
    currentPage: 1,
};

export const ProductsContext = createContext<ProductsContextType>(defaultContextValue);

export const ProductsProvider = ({ children, initialFilters }: { children: ReactNode, initialFilters?: any }) => {
    const [searchParams, setSearchParams] = useState<SearchParams>({ page: 1, ...initialFilters });

    const fetchProducts = useCallback(
        () => getProducts(searchParams),
        [searchParams]
    );

    const {
        data,
        isLoading,
        isError,
        error,
    } = useQuery<ProductsResponse, Error>({
        queryKey: ["getProducts", searchParams],
        queryFn: fetchProducts,
    });

    const updateSearchParams = useCallback((params: SearchParams) => {
        setSearchParams(prevParams => ({ ...prevParams, ...params }));
    }, []);

    return (
        <ProductsContext.Provider
            value={{
                products: data?.products,
                isLoading,
                isError,
                error,
                searchParams,
                setSearchParams: updateSearchParams,
                totalPages: data?.totalPages || 1,
                currentPage: data?.currentPage || 1,
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