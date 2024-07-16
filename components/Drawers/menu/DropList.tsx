import React from 'react';
import Link from 'next/link';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { useQuery } from '@tanstack/react-query';
import { getSubCategories } from '@/axios/instance';
import NotFound from '@/app/not-found';

const DropList = ({ id, title }: { id: string, title: string }) => {

    const { data: subCategories, isLoading, isError, error } = useQuery({
        queryFn: () => getSubCategories(id),
        queryKey: ['getSubCategories', id]
    });





    if (isError) {
        return (
            <NotFound />
        );
    }

    return (
        <Accordion type="single" collapsible className="w-full">
            <AccordionItem value={id}>
                <AccordionTrigger className="font-medium p-4">{title}</AccordionTrigger>
                <AccordionContent className='p-4'>
                    <ul className='flex flex-col gap-2'>
                        {isLoading ? (
                            <SkeletonAccordion />
                        ) : (subCategories?.map((sub, i) => (
                            <li key={i}>
                                <Link
                                    className='font-medium text-base text-primaryColor hover:text-secColor'
                                    href={sub.src || "#"}
                                >
                                    {sub.title}
                                </Link>
                            </li>
                        )))}

                    </ul>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
};

export default DropList;

const SkeletonAccordion = () => {
    return (
        <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="skeleton">
                <AccordionTrigger className="font-medium p-4">
                    <div className="h-6 w-3/4 bg-gray-200 animate-pulse rounded"></div>
                </AccordionTrigger>
                <AccordionContent className='p-4'>
                    <ul className='flex flex-col gap-2'>
                        {[1, 2, 3].map((_, i) => (
                            <li key={i}>
                                <div className="h-5 w-1/2 bg-gray-200 animate-pulse rounded"></div>
                            </li>
                        ))}
                    </ul>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
};

;