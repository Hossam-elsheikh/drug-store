import React from 'react';
import Link from 'next/link';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const DropList = ({ id, title, subCategories }) => {
    return (
        <Accordion type="single" collapsible className="w-full">
            <AccordionItem value={id}>
                <AccordionTrigger className="font-medium p-4">{title}</AccordionTrigger>
                <AccordionContent className='p-4'>
                    <ul className='flex flex-col gap-2'>
                        {subCategories.map((sub, i) => (
                            <li key={i}>
                                <Link
                                    className='font-medium text-base text-primaryColor hover:text-secColor'
                                    href={sub.src || "#"}
                                >
                                    {sub.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
};

export default DropList;