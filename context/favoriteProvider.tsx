'use client'
import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';

interface ProductItem {
    id: string | number;
    quantity: number;
    [key: string]: any;
}

interface FavoritesContextType {
    favoriteProducts: ProductItem[];
    addToFavorites: (item: Omit<ProductItem, 'quantity'>) => void;
    deleteFavorite: (item: Omit<ProductItem, 'quantity'>) => void;
    getTotalFavorites: () => number;
}

export const FavoritesContext = createContext<FavoritesContextType>({
    favoriteProducts: [],
    addToFavorites: () => { },
    deleteFavorite: () => { },
    getTotalFavorites: () => 0,
});

interface FavoritesProviderProps {
    children: ReactNode;
}

export const FavoritesProvider: React.FC<FavoritesProviderProps> = ({ children }) => {
    const [favoriteProducts, setFavoriteProducts] = useState<ProductItem[]>(() => {
        if (typeof window !== 'undefined') {
            const savedItems = localStorage.getItem('FavoriteItems');
            return savedItems ? JSON.parse(savedItems) : [];
        }
        return [];
    });

    const addToFavorites = (item: Omit<ProductItem, 'quantity'>) => {
        setFavoriteProducts(prevFavoriteProducts => {
            const isItemInFavorites = prevFavoriteProducts.find((favoriteProduct) => favoriteProduct.id === item.id);
            if (isItemInFavorites) {
                return prevFavoriteProducts.map((favoriteProduct) =>
                    favoriteProduct.id === item.id
                        ? { ...favoriteProduct, quantity: favoriteProduct.quantity + 1 }
                        : favoriteProduct
                );
            } else {
                return [...prevFavoriteProducts, { ...item, quantity: 1 } as ProductItem];
            }
        });
    };

    const deleteFavorite = (item: Omit<ProductItem, 'quantity'>) => {
        setFavoriteProducts(prevFavoriteProducts =>
            prevFavoriteProducts.filter((favoriteProduct) => favoriteProduct.id !== item.id)
        );
    };

    const getTotalFavorites = () => {
        return favoriteProducts.length;
    };

    useEffect(() => {
        localStorage.setItem('FavoriteItems', JSON.stringify(favoriteProducts));
    }, [favoriteProducts]);

    return (
        <FavoritesContext.Provider value={{ favoriteProducts, addToFavorites, deleteFavorite, getTotalFavorites }}>
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
