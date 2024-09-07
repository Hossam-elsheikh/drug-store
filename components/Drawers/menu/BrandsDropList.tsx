import React from 'react';
import Link from 'next/link';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import { useLocale } from '@/context/LocaleProvider';
import { encodeId } from '@/lib/idCipher';
import { SkeletonAccordion } from './DropList';



const BrandsDropList = ({ isLoading, brands }: { isLoading: boolean, brands: Brand[] }) => {
    const { locale } = useLocale();

    return (
        <div className="space-y-4">
            <Accordion
                type="single"
                collapsible
                className="w-full bg-white rounded-lg shadow-sm"
            >
                <AccordionItem value="brands" className="border-b">
                    <AccordionTrigger className="font-medium p-4 hover:bg-gray-100 transition-all duration-200 focus:bg-gray-100 focus:outline-none">
                        <span className="flex items-center">Brands</span>
                    </AccordionTrigger>
                    <AccordionContent className="p-4 bg-gray-50">
                        {isLoading ? (
                            <SkeletonAccordion />
                        ) : (
                            <ul className="flex flex-col gap-2">
                                {brands?.map(({ _id, name, slug }: Brand) => (
                                    <li
                                        key={_id}
                                        className="transition-colors duration-200 hover:bg-gray-100 rounded"
                                    >
                                        <Link
                                            className="font-medium text-base text-primaryColor hover:text-[#282a3f] flex items-center p-3"
                                            href={{
                                                pathname: `/${locale}/brand/${slug}`,
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

export default BrandsDropList;
