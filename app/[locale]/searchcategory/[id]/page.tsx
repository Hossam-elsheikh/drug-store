import DrawerWrapper from '@/components/DrawerWrapper';
import React from 'react'

type Props = {
    params: {
        id: string;
    };
    searchParams: {
        searchCategory: string;
    };
};

function page({
    params: { id },
    searchParams: { searchCategory },
}: Props) {

    return (

        <div className="max-w-7xl mx-auto">
            <div className="flex flex-col space-y-5 mt-32 xl:mt-42" >
                <h1 className="text-6xl font-semibold px-10">Results for {searchCategory} and the {id}</h1>
            </div>

            <div>
                <DrawerWrapper showSec='filter' currentLoc='right' />
            </div>
        </div>
    )
}

export default page
