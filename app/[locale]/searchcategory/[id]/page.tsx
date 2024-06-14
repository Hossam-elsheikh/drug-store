import BreadCrumb from '@/components/Breadcrumb/BreadCrumb';
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

        <section className="bg-gray-50 pb-5">
            <BreadCrumb />

            <div className="p-4 md:p-10 bg-white mx-auto max-w-[1600px] rounded-lg border">
                <h1 className="text-3xl font-semibold px-10">Results for {searchCategory} and the {id}</h1>

                <div>
                    <DrawerWrapper showSec='filter' currentLoc='right' />
                </div>

            </div>
        </section>
    )
}

export default page
