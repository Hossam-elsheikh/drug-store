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
import { useLocale } from "@/context/LocaleProvider";
import { ChevronDown, ChevronRight } from 'lucide-react'; // Import icons

const DropList = ({ id, name }: { id: string, name: string }) => {
    const { locale }:string = useLocale();

    const { data: subCategories, isLoading, isError } = useQuery({
        queryFn: () => getSubCategories(id),
        queryKey: ['getSubCategories', id]
    });

    if (isError) {
        return <NotFound mode={'drawer'} />;
    }

    return (
        <Accordion type="single" collapsible className="w-full bg-white rounded-lg shadow-sm">
            <AccordionItem value={id} className="border-b">
                <AccordionTrigger className="font-medium p-4 hover:bg-gray-50 transition-colors duration-200">
                    <span className="flex items-center">
                        {name?.[locale]}
                    </span>
                </AccordionTrigger>
                <AccordionContent className='p-4 bg-gray-50'>
                    <ul className='flex flex-col gap-2'>
                        {isLoading ? (
                            <SkeletonAccordion />
                        ) : (subCategories?.map(({ name, _id: id }, i) => (
                            <li key={i} className="transition-colors duration-200 hover:bg-gray-100 rounded">
                                <Link
                                    className='font-medium text-base text-primaryColor hover:text-secColor flex items-center p-2'
                                    href={id || "#"}
                                >
                                    {name?.[locale]}
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
        <ul className='flex flex-col gap-2'>
            {[1, 2, 3].map((_, i) => (
                <li key={i} className="flex items-center p-2">
                    <div className="h-4 w-4 bg-gray-200 animate-pulse rounded-full mr-2"></div>
                    <div className="h-5 w-3/4 bg-gray-200 animate-pulse rounded"></div>
                </li>
            ))}
        </ul>
    );
};