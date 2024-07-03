'use client'
import React, { createContext, useState, useEffect, ReactNode } from 'react'

interface ProductItem {
    id: string | number;
    quantity: number;
    [key: string]: any;
}

interface FavContextType {
    favProducts: ProductItem[];
    addToFav: (item: Omit<ProductItem, 'quantity'>) => void;
    deleteFav: (item: Omit<ProductItem, 'quantity'>) => void;
    getTotalFavs: () => number;
}
export const FavContext = createContext<FavContextType>({
    favProducts: [],
    addToFav: () => { },
    deleteFav: () => { },
    getTotalFavs: () => 0,
});
interface FavProviderProps {
    children: ReactNode;
}
export const FavProvider: React.FC<FavProviderProps> = ({ children }) => {
    const [favProducts, setFavProducts] = useState<ProductItem[]>(() => {
        if (typeof window !== 'undefined') {
            const savedItems = localStorage.getItem('FavoriteItems');
            return savedItems ? JSON.parse(savedItems) : [];
        }
        return [];
    });

    const addToFav = (item: Omit<ProductItem, 'quantity'>) => {
        setFavProducts(prevFavProducts => {
            const isItemInFav = prevFavProducts.find((favProduct) => favProduct.id === item.id);
            if (isItemInFav) {
                return prevFavProducts.map((favProduct) =>
                    favProduct.id === item.id
                        ? { ...favProduct, quantity: favProduct.quantity + 1 }
                        : favProduct
                );
            } else {
                return [...prevFavProducts, { ...item, quantity: 1 } as ProductItem];
            }
        });
    };

    const deleteFav = (item: Omit<ProductItem, 'quantity'>) => {
        setFavProducts(prevFavProducts =>
            prevFavProducts.filter((favProduct) => favProduct.id !== item.id)
        );
    };

    const getTotalFavs = () => {
        return favProducts.length;
    };

    useEffect(() => {
        localStorage.setItem('FavoriteItems', JSON.stringify(favProducts));
    }, [favProducts]);

    return (
        <FavContext.Provider value={{ favProducts, addToFav, deleteFav, getTotalFavs }}>
            {children}
        </FavContext.Provider>
    );
};