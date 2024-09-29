'use client'

import { getWishList } from '@/axios/instance';
import useAuth from '@/hooks/useAuth';
import { Product } from '@/types';
import { useQuery } from '@tanstack/react-query';
import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import { toast } from 'sonner';
interface FavoritesContextType {
    favoriteProducts: Product[];
    toggleFavorite: (item: Omit<Product, 'quantity'>) => void;
    deleteFavorite: (item: Omit<Product, 'quantity'>) => void;
    getTotalFavorites: () => number;
    isProductFavorite: (itemId: string | number) => boolean;
}

export const FavoritesContext = createContext<FavoritesContextType>({
    favoriteProducts: [],
    toggleFavorite: () => { },
    deleteFavorite: () => { },
    getTotalFavorites: () => 0,
    isProductFavorite: () => false,
});

interface FavoritesProviderProps {
    children: ReactNode;
}

export const FavoritesProvider: React.FC<FavoritesProviderProps> = ({ children }) => {
    const [favoriteProducts, setFavoriteProducts] = useState<Product[]>(() => {
        if (typeof window !== 'undefined') {
            const savedItems = localStorage.getItem('FavoriteItems');
            return savedItems ? JSON.parse(savedItems) : [];
        }
        return [];
    });

    const { auth }: any = useAuth()
    const {
        data: wishList,
        isLoading: wishListIsLoading,
        error: wishListError,
    } = useQuery({
        queryFn: () => getWishList(auth.userId),
        queryKey: ['wishList'],
        enabled: !!auth.userId
    })    

    const FavoriteProducts = auth.userId ? wishList?.products : favoriteProducts;

    // const toggleFavorite = (item: Omit<Product, 'quantity'>) => {
    //     setFavoriteProducts(prevFavoriteProducts => {
    //         const isItemInFavorites = prevFavoriteProducts.find((favoriteProduct) => favoriteProduct._id === item._id);
    //         if (isItemInFavorites) {
    //             return prevFavoriteProducts.filter((favoriteProduct) => favoriteProduct._id !== item._id);
    //         } else {
    //             return [...prevFavoriteProducts, { ...item, quantity: 1 } as Product];
    //         }
    //     });
    // };
    const toggleFavorite = (item: Omit<Product, 'quantity'>) => {
        const isItemInFavorites = favoriteProducts.some((favoriteProduct) => favoriteProduct._id === item._id);
    
        if (isItemInFavorites) {
            setFavoriteProducts(prevFavoriteProducts =>
                prevFavoriteProducts.filter((favoriteProduct) => favoriteProduct._id !== item._id)
            );
            toast.success("Product removed from wishlist successfully!");
        } else {
            setFavoriteProducts(prevFavoriteProducts => [
                ...prevFavoriteProducts,
                { ...item, quantity: 1 } as Product
            ]);
            toast.success("Product added to wishlist successfully!");
        }
    };

    const deleteFavorite = (item: Omit<Product, 'quantity'>) => {
        setFavoriteProducts(prevFavoriteProducts =>
            prevFavoriteProducts.filter((favoriteProduct) => favoriteProduct._id !== item._id)
        );
        // toast.success("product removed from wish list Successfully!");
    };

    const isProductFavorite = (itemId: string | number): boolean => {
        return FavoriteProducts?.some((item:any) => item._id === itemId);
    };

    const getTotalFavorites = () => {
        return FavoriteProducts?.length;
    };

    useEffect(() => {
        if(!auth.userId) localStorage.setItem('FavoriteItems', JSON.stringify(favoriteProducts));
    }, [FavoriteProducts]);

    if (wishListIsLoading) null
    if (wishListError) null

    return (
        <FavoritesContext.Provider value={{ favoriteProducts, toggleFavorite, deleteFavorite, getTotalFavorites, isProductFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
};

export const useFavorites = () => {
    const context = useContext(FavoritesContext);
    if (!context) {
        throw new Error('useFavorites must be used within a FavoritesProvider');
    }
    return context;
};