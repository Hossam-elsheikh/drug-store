import React from 'react';
import ProductsView from '@/components/ProductsView/ProductsView';

type Props = {
    params: {
        id: string;
        searchCategory: string;
    };
};

function Page({ params: { id, searchCategory } }: Props) {
    return (
        <ProductsView params={{ id, searchCategory }} />
    );
}

export default Page;
