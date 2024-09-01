import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Form } from '../ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import CustomSwitch from '../Form/CustomCheckbox';
import { PriceControl } from './PriceControl';

const formSchema = z.object({
    InStock: z.boolean().optional(),
    OutOfStock: z.boolean().optional(),
});

function FilterDrawer() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            InStock: false,
            OutOfStock: false,
        },
    });

    const [priceRange, setPriceRange] = useState<number[]>([0, 100_000]);

    function onSubmit(values: z.infer<typeof formSchema>) {
        const Data = {
            ...values,
            priceRange: priceRange,
        }
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
                                    schema={formSchema}
                                />
                                <CustomSwitch
                                    control={form.control}
                                    name="OutOfStock"
                                    label="Out Of Stock"
                                    schema={formSchema}
                                />
                                <PriceControl onChange={setPriceRange} />
                                <button
                                    type="submit"
                                    className="bg-[#363955] hover:bg-blue-900 text-white font-bold py-2 px-3 rounded-lg duration-300 active:scale-95"
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