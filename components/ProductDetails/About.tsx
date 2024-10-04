'use client'
import React,{useState} from "react";
import { ChevronDown } from 'lucide-react';
import { useLocale } from "@/context/LocaleProvider";
import { useTranslations } from "next-intl";

type AboutPropsProps = {
    productDetails?: {
        description: {
            [key: string]: string;
        };
        features?: string[];
    };
   
};

function About({ productDetails }: AboutPropsProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const t = useTranslations("ProductDetailsPage");

    const { locale, dir } = useLocale()
    const description = productDetails?.description?.[locale] || "No description available.";
    const features = productDetails?.features || [];

    return (
        <section className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">{ t('aboutItem')}</h2>
                <div className={`prose max-w-none ${isExpanded ? '' : 'line-clamp-3'}`}>
                    <p className="text-base text-gray-600 leading-relaxed">
                        {description}
                    </p>
                </div>
                {description?.length > 150 && (
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="mt-2 text-primaryColor hover:text-primaryColor/80 font-medium flex items-center"
                    >
                        {isExpanded ? 'Read less' : 'Read more'}
                        <ChevronDown className={`ml-1 h-4 w-4 transform transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                    </button>
                )}
            </div>
            {features.length > 0 && (
                <div className="bg-gray-50 p-6 border-t border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Key Features</h3>
                    <ul className="list-disc pl-5 space-y-2">
                        {features.map((feature, index) => (
                            <li key={index} className="text-gray-600">{feature}</li>
                        ))}
                    </ul>
                </div>
            )}
        </section>
    );
}

export default About;