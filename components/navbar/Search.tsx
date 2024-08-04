'use client'

import React, { useState, Fragment, useTransition, useEffect, ChangeEvent } from 'react'
import { usePathname } from 'next/navigation'
import { useDebounce } from 'use-debounce'
import {
    Transition,
    Popover,
    PopoverGroup,
    PopoverPanel,
} from '@headlessui/react'
import { Search, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Formik, Form, Field, FormikHelpers } from 'formik'
import * as Yup from 'yup'
import { Input } from '@/components/ui/input'
import { useLocale } from '@/context/LocaleProvider'
import { SearchProducts } from '@/axios/instance'
import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'

interface FormValues {
    input: string;
}

interface Product {
    name: {
        [key: string]: string;
    };
    price: string;
    image: string;
    _id: string;
    slug: string;
}

interface SearchResults {
    products: Product[];
    totalCount: number;
}

const validationSchema = Yup.object().shape({
    input: Yup.string()
        .min(3, 'Minimum 3 characters')
        .max(50, 'Maximum 50 characters'),
})

const staggerContainer = {
    hidden: { opacity: 1 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
        },
    },
}

const staggerItem = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
}

export default function SearchMed(): JSX.Element {
    const { locale } = useLocale()
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [inputValue, setInputValue] = useState<string>('')
    const router = useRouter()
    const pathname = usePathname()

    const [isPending, startTransition] = useTransition()
    const [value] = useDebounce(inputValue, 1000)

    const {
        data: searchResults,
        isLoading,
        isFetching,
    } = useQuery<SearchResults>({
        queryKey: ['searchProducts', value],
        queryFn:  () =>  SearchProducts(value),
        enabled: value.length >= 3,
        staleTime: 1000 * 60 * 5,
    })

    console.log(searchResults)

    useEffect(() => {
        console.log('Search value:', value);
        console.log('Search results:', searchResults);
        console.log('Is loading:', isLoading);
        console.log('Is fetching:', isFetching);
    }, [value, searchResults, isLoading, isFetching]);

    const handleSearch = (value: string): void => {
        setInputValue(value.replace(/ /g,'-'))
    }

    const onSubmit = async (values: FormValues, { resetForm }: FormikHelpers<FormValues>): Promise<void> => {
        if (values.input) {
            startTransition(() => {
                const isSearchPage = pathname.includes('/search/');
                let newPath = `/${locale}/search/${encodeURIComponent(values.input.replace(/ /g,'-'))}`;
                router.replace(newPath, { shallow: true });
            });
            setIsOpen(false);
            resetForm();
        }
    };

    const imagePath = process.env.NEXT_PUBLIC_IMAGE_PATH

    return (
        <PopoverGroup className="hidden lg:flex lg:gap-x-12">
            <Popover className="relative">
                <>
                    <Formik
                        initialValues={{ input: '' }}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                    >
                        {({ handleChange, handleBlur }) => (
                            <Form className="space-y-8">
                                <div className="flex items-center gap-2 relative">
                                    <div className="flex w-full max-w-[760px] gap-x-2">
                                        <div className="relative grow p-px">
                                            {(isLoading ||
                                                isFetching ||
                                                isPending) &&
                                                inputValue.length >= 3 ? (
                                                <div className="absolute left-2 top-1/2 -translate-y-1/2 z-10">
                                                    <Loader2 className="text-gray-400 text-muted-foreground animate-spin" />
                                                </div>
                                            ) : (
                                                <Search className="absolute left-2 text-gray-400 z-10 top-1/2 -translate-y-1/2 text-muted-foreground" />
                                            )}
                                            <Field
                                                name="input"
                                                placeholder="Search any medicine..."
                                                className="rounded-2.5 pl-[40px] text-4"
                                                as={Input}
                                                onFocus={() => setIsOpen(true)}
                                                onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                                                    handleBlur(e)
                                                    setTimeout(
                                                        () => setIsOpen(false),
                                                        200
                                                    )
                                                }}
                                                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                                    handleChange(e)
                                                    handleSearch(e.target.value)
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </Form>
                        )}
                    </Formik>

                    <Transition
                        as={Fragment}
                        show={isFetching || (isOpen && inputValue.length >= 3)}
                        enter="transition ease-out duration-300"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in-out duration-300"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-1"
                    >
                        <PopoverPanel
                            className={`absolute bg-white -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl shadow-lg ring-1 ring-gray-900/5 ${locale === 'ar' ? 'right-1' : ''
                                }`}
                        >
                            <motion.div
                                className="p-2"
                                variants={staggerContainer}
                                initial="hidden"
                                animate="visible"
                            >
                                {isLoading || isFetching || isPending ? (
                                    <p className="text-center text-gray-500 flex gap-5 items-center justify-center">
                                        Loading...
                                        <div>
                                            <Loader2 className="text-gray-400 text-muted-foreground animate-spin" />
                                        </div>
                                    </p>
                                ) : searchResults?.products?.length > 0 ? (
                                    searchResults?.products
                                        .slice(0, 4)
                                        .map(
                                            ({
                                                name,
                                                price,
                                                image,
                                                _id,
                                                slug,
                                            }: Product) => (
                                                <motion.div
                                                    key={_id}
                                                    variants={staggerItem}
                                                >
                                                    <Link
                                                        href={`/${locale}/${slug}/${_id}`}
                                                        className="group relative flex items-center gap-x-6 rounded-lg text-lg p-4  leading-6 hover:bg-gray-100 hover:duration-700 hover:shadow-sm"
                                                    >
                                                        <div className="flex h-14 w-14 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-gray-200 hover:duration-1000 ">
                                                            <img
                                                                src={`${imagePath}${image}`}
                                                                alt={
                                                                    name?.[
                                                                    locale
                                                                    ]
                                                                }
                                                                className="h-full w-full object-cover rounded-lg"
                                                            />
                                                        </div>
                                                        <div className="flex-auto truncate">
                                                            <p className="block font-semibold text-[#013B94] truncate">
                                                                {name?.[locale]}
                                                            </p>

                                                            <p className="mt-1 text-green-700 font-semibold flex gap-1 text-lg">
                                                                <span className="font-medium text-sm">
                                                                    KWT
                                                                </span>
                                                                {price}
                                                            </p>
                                                        </div>
                                                    </Link>
                                                </motion.div>
                                            )
                                        )
                                ) : (
                                    <p className="text-center text-gray-500">
                                        No results found
                                    </p>
                                )}
                            </motion.div>
                            {searchResults?.products?.length > 0 && (
                                <div className="grid divide-x divide-gray-900/5 bg-gray-50 hover:duration-700">
                                    <div className="flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold leading-6 text-[#013B94] hover:bg-gray-200 hover:duration-700">
                                        <Link
                                            href={`/${locale}/search/${inputValue}`}
                                            className="text-[#013B94] ml-1 flex gap-2 items-center"
                                        >
                                            <Search
                                                strokeWidth={1.8}
                                                size={27}
                                                className="text-[#013B94]"
                                            />
                                            View all{' '}
                                            {searchResults?.totalCount}{' '}
                                            results
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </PopoverPanel>
                    </Transition>
                </>
            </Popover>
        </PopoverGroup>
    )
}