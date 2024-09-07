import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Form } from '../ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import CustomSwitch from '../Form/CustomCheckbox';
import { PriceControl } from './PriceControl';
import { useQuery } from '@tanstack/react-query';
import { getBrands } from '@/axios/instance';

const formSchema = z.object({
    InStock: z.boolean().optional(),
    OutOfStock: z.boolean().optional(),
    brands: z.record(z.string(), z.boolean().optional()) // Dynamic schema for brands
});

function FilterDrawer() {
    const [priceRange, setPriceRange] = useState<number[]>([0, 100_000]);

    const {
        data: brands,
        isLoading: isBrandsLoading,
        isError: isBrandsError,
    } = useQuery({
        queryFn: getBrands,
        queryKey: ['getBrands'],
    });

    // Initialize default values for the brands dynamically
    const defaultBrandValues = brands?.reduce((acc: any, brand: any) => {
        acc[brand.name.en] = false;
        return acc;
    }, {});

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            InStock: false,
            OutOfStock: false,
            brands: defaultBrandValues || {},
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        const Data = {
            ...values,
            priceRange: priceRange,
        };
        console.log(Data);
    }

    return (
        <>
            <section className="bg-white relative overflow-hidden overflow-y-auto">
                <div className="w-full mx-auto flex flex-col justify-center py-4 relative p-1">
                    <div className="mx-auto w-full">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                <h1 className='text-lg'>Availability</h1>
                                <CustomSwitch
                                    control={form.control}
                                    name="InStock"
                                    label="In Stock"
                                />
                                <CustomSwitch
                                    control={form.control}
                                    name="OutOfStock"
                                    label="Out Of Stock"
                                />

                                <h2 className="text-lg">Brands</h2>

                                {isBrandsLoading && <p>Loading brands...</p>}
                                {isBrandsError && <p>Error loading brands.</p>}
                                {!isBrandsLoading && !isBrandsError && (
                                    <ul className="space-y-2">
                                        {brands?.map((brand: any) => (
                                            <li
                                                key={brand._id}
                                                className="transition-colors duration-200 hover:bg-gray-100 rounded"
                                            >
                                                <CustomSwitch
                                                    control={form.control}
                                                    name={`brands.${brand.name.en}`}
                                                    label={brand.name.en}
                                                />
                                            </li>
                                        ))}
                                    </ul>
                                )}

                                <PriceControl onChange={setPriceRange} />
                                <button
                                    type="submit"
                                    className="bg-primaryColor hover:bg-blue-900 text-white font-bold py-2 px-3 rounded-lg duration-300 active:scale-95"
                                >
                                    Submit
                                </button>
                            </form>
                        </Form>
                    </div>
                </div>
            </section>
        </>
    );
}

export default FilterDrawer;
