import React from 'react';
import Link from 'next/link';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import { useQuery } from '@tanstack/react-query';
import { getSubCategories } from '@/axios/instance';
import NotFound from '@/app/not-found';
import { useLocale } from '@/context/LocaleProvider';
import { encodeId } from '@/lib/idCipher';



const DropList = ({ id, name }: { id: string; name: { en: string; ar: string }; }) => {
    const { locale } = useLocale();

    const {
        data: subcategories,
        isLoading,
        isError,
    } = useQuery({
        queryFn: () => getSubCategories(id),
        queryKey: ['getSubCategories', id],
    });

    if (isError) {
        return <NotFound mode={'drawer'} />;
    }

    return (
        <div className="space-y-4">
            <Accordion
                type="single"
                collapsible
                className="w-full bg-white rounded-lg shadow-md overflow-hidden"
            >
                <AccordionItem value={id} className="border-b">
        <AccordionTrigger className="font-medium p-4 hover:bg-gray-100 transition-all duration-200 focus:bg-gray-100 focus:outline-none">
                        <span className="flex items-center"> {name[locale as keyof typeof name] || ''}</span>
                    </AccordionTrigger>
                    <AccordionContent className="p-6 bg-gray-50">
                        {isLoading ? (
                            <SkeletonAccordion />
                        ) : (
                            <ul className="flex flex-col gap-2">
                                {subcategories?.map(({ _id, name, slug }: SubCategory) => (
                                    <li
                                        key={_id}
                                        className="transition-colors duration-200 hover:bg-gray-100 rounded"
                                    >
                                        <Link
                                            className="font-medium text-base text-primaryColor hover:text-secColor flex items-center p-2"
                                            href={{
                                                pathname: `/${locale}/category/${slug}`,
                                                query: { ref: encodeId(_id) },
                                            }}
                                        >
                                            {name[locale as keyof typeof name] || ''}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    );
};

export default DropList;
export const SkeletonAccordion = () => {
    return (
        <ul className="space-y-3">
            {[1, 2, 3].map((_, i) => (
                <li key={i} className="flex items-center p-3 bg-gray-100 rounded animate-pulse">
                    <div className="h-4 w-4/5 bg-gray-200 rounded"></div>
                    <div className="h-4 w-4 bg-gray-200 rounded-full ml-auto"></div>
                </li>
            ))}
        </ul>
    );
};