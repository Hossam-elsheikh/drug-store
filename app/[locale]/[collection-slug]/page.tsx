import React from 'react';
import ProductsView from '@/components/ProductsView/ProductsView';


type Props = {
    params: {
        id: string;
        locale: string;
    };
    searchParams: {
        ref?: string
        name?:string

    }
};

function Page({ params, searchParams }: Props) {

    const { ref,name } = searchParams
   

    return (
    // <p>hello</p>
    
    <ProductsView params={params} catId={ref} name={name}/>
    );
}

export default Page;
