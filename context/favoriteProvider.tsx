'use client'

import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';



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

    const toggleFavorite = (item: Omit<Product, 'quantity'>) => {
        setFavoriteProducts(prevFavoriteProducts => {
            const isItemInFavorites = prevFavoriteProducts.find((favoriteProduct) => favoriteProduct._id === item._id);
            if (isItemInFavorites) {
                return prevFavoriteProducts.filter((favoriteProduct) => favoriteProduct._id !== item._id);
            } else {
                return [...prevFavoriteProducts, { ...item, quantity: 1 } as Product];
            }
        });
    };

    const deleteFavorite = (item: Omit<Product, 'quantity'>) => {
        setFavoriteProducts(prevFavoriteProducts =>
            prevFavoriteProducts.filter((favoriteProduct) => favoriteProduct._id !== item._id)
        );
    };

    const isProductFavorite = (itemId: string | number): boolean => {
        return favoriteProducts.some(item => item._id === itemId);
    };

    const getTotalFavorites = () => {
        return favoriteProducts.length;
    };

    useEffect(() => {
        localStorage.setItem('FavoriteItems', JSON.stringify(favoriteProducts));
    }, [favoriteProducts]);

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