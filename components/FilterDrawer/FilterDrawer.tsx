import React, { useState } from 'react';
import CustomCheckbox from '../Form./Form/CustomCheckbox';
import { useForm } from 'react-hook-form';
import { Form } from '../ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const items = [
    { value: "InStock", label: "In Stock" },
    { value: "OutStock", label: "Out Of Stock" },
];

const formSchema = z.object({
    availability: z.array(z.string()).optional(),
});

function FilterDrawer() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            availability: [],
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
    }

    return (
        <></>
        // <section className="bg-white relative overflow-hidden overflow-y-auto">
        //     <div className="w-full mx-auto flex flex-col justify-center py-24 relative p-1">
        //         <div className="mx-auto w-full">
        //             <Form {...form}>
        //                 <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        //                     <h1>Availability</h1>
        //                     {items.map((item) => (
        //                         <CustomCheckbox
        //                             key={item.value}
        //                             label={item.label}
        //                             control={form.control}
        //                             name="availability"
        //                             value={item.value}
        //                         />
        //                     ))}
        //                     <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        //                         Submit
        //                     </button>
        //                 </form>
        //             </Form>
        //         </div>
        //     </div>
        // </section>
    );
}

export default FilterDrawer;