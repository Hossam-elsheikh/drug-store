'use client'

import React, { useState, Fragment, useTransition, ChangeEvent } from 'react'
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

import { Input } from '@/components/ui/input'
import { useLocale } from '@/context/LocaleProvider'
import { SearchProducts } from '@/axios/instance'
import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { SearchSchema } from '@/lib/schema'
import SearchElement from './SearchElement'

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
    } = useQuery({
        queryKey: ['searchProducts', value],
        queryFn: () => SearchProducts(value),
        enabled: value.length >= 3,
        staleTime: 1000 * 60 * 5,
    })

    const handleSearch = (value: string): void => {
        setInputValue(value.replace(/ /g, '-'))
    }

    const onSubmit = async (values: FormValues, { resetForm }: FormikHelpers<FormValues>): Promise<void> => {
        if (values.input) {
            startTransition(() => {
                const newPath = `/${locale}/search/${encodeURIComponent(values.input.replace(/ /g, '-'))}`;
                router.replace(newPath);
            });
            setIsOpen(false);
            resetForm();
        }
    };

    return (
        <PopoverGroup className=" lg:flex lg:gap-x-12">
            <Popover className="relative">
                <Formik
                    initialValues={{ input: '' }}
                    validationSchema={SearchSchema}
                    onSubmit={onSubmit}
                >
                    {({ handleChange, handleBlur }) => (
                        <Form className="space-y-8">
                            <div className="flex items-center gap-2 relative">
                                <div className="flex w-full max-w-[760px] gap-x-2">
                                    <div className="relative grow p-px pt-1 md:pt-0">
                                        {(isLoading || isFetching || isPending) && inputValue.length >= 3 ? (
                                            <div className="absolute left-2 top-1/2 -translate-y-1/2 z-10">
                                                <Loader2 className="text-gray-400 text-muted-foreground animate-spin" />
                                            </div>
                                        ) : (
                                            <Search className="absolute left-2 text-gray-400 z-10 top-1/2 -translate-y-1/2 text-muted-foreground" />
                                        )}
                                        <Field
                                            name="input"
                                            placeholder="Search any medicine..."
                                            className="rounded-lg pl-[40px] text-4"
                                            as={Input}
                                            onFocus={() => setIsOpen(true)}
                                            onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                                                handleBlur(e)
                                                setTimeout(() => setIsOpen(false), 200)
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
                        className={`absolute bg-white  top-full z-10 mt-3 w-screen md:max-w-md overflow-hidden rounded-3xl shadow-lg left-3 ring-gray-900/5 max-w-[465px] ${locale === 'ar' ? '-right-8 ' : '-left-8'}`}
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
                                    .map((Product: Product) => (
                                        <SearchElement key={Product._id} Product={Product} staggerItem={staggerItem} />
                                    ))
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
                                        View all {searchResults?.totalCount} results
                                    </Link>
                                </div>
                            </div>
                        )}
                    </PopoverPanel>
                </Transition>
            </Popover>
        </PopoverGroup>
    )
}
