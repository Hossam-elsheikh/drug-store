"use client";
import React, { createContext, ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/axios/instance";



export type Product = {
    id: string;
    name: string;
    price: number;
    image: string;
  
};

export interface ProductsContextType {
    products: { data: { products: Product[] } } | null |undefined;
    isLoading: boolean;
    isError: boolean;
    error: unknown | null;
}

const defaultContextValue: ProductsContextType = {
    products: null,
    isLoading: false,
    isError: false,
    error: null,
};

export const ProductsContext = createContext<ProductsContextType>(defaultContextValue);

export const ProductsProvider = ({ children }: { children: ReactNode }) => {
    const { data, isLoading, isError, error } = useQuery({
        queryFn: getProducts,
        queryKey: ["getProducts"],
    });

    return (
        <ProductsContext.Provider value={{ products: data, isLoading, isError, error }}>
            {children}
        </ProductsContext.Provider>
    );
};