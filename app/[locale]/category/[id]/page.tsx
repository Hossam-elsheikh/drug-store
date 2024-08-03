import React from 'react';
import ProductsView from '@/components/ProductsView/ProductsView';
import { decodeId } from '@/lib/idCipher';

type Props = {
    params: {
        id: string;
        locale: string;
    };
    searchParams: {
        ref?: string
    }
};

function Page({ params, searchParams }: Props) {

    const { ref } = searchParams
    const decodedId = ref ? decodeId(ref) : null

    return ( <ProductsView params={params} SubId={decodedId} />
    );
}

export default Page;
