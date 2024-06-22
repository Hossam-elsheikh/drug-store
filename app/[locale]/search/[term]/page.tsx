
import ProductsView from "@/components/ProductsView/ProductsView";
import React from "react";

type Props = {
    params: {
        term: string;
    };
};

function SearchPage({ params }: Props) {
    

    return (
        <ProductsView params={params} />
    )
}

export default SearchPage;
