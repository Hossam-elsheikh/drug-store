import { motion } from 'framer-motion';
import Link from 'next/link';
import React from 'react';
import { useLocale } from '@/context/LocaleProvider'



function SearchElement({ Product, staggerItem }: SearchElementProps) {
    const { locale } = useLocale()
    const { _id, name, price, image, slug } = Product;
    const imagePath = process.env.NEXT_PUBLIC_IMAGE_PATH;
    console.log(name)

    return (
        <motion.div key={_id} variants={staggerItem}>
            <Link
                href={`/${locale}/${slug}/${_id}`}
                className="group relative flex items-center gap-x-6 rounded-lg text-lg p-3 leading-6 hover:bg-gray-100 hover:duration-700 hover:shadow-sm"
            >
                <div className="flex h-14 w-14 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-gray-200 hover:duration-1000">
                    <img
                        src={`${imagePath}${image}`}
                        alt={name[locale as keyof typeof name] || ''}
                        className="h-full w-full object-cover rounded-lg"
                    />
                </div>
                <div className="flex-auto truncate">
                    <p className="block font-semibold text-[#013B94] truncate">
                        {name[locale as keyof typeof name] || ''}
                    </p>
                    <p className="mt-1 text-green-700 font-semibold flex gap-1 text-lg">
                        <span className="font-medium text-sm">KWT</span>
                        {price}
                    </p>
                </div>
            </Link>
        </motion.div>
    );
}

export default SearchElement;