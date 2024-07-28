'use client'

import React, { useState, Fragment, useTransition,useEffect } from 'react'
import { useDebounce } from 'use-debounce'
import {
    Transition,
    Popover,
    PopoverGroup,
    PopoverPanel,
} from '@headlessui/react'
import { Home, Send, MessageCircleMore, Search, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { Input } from '@/components/ui/input'
import { useLocale } from '@/context/LocaleProvider'
import { SearchProducts } from '@/axios/instance'
import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'

const validationSchema = Yup.object().shape({
    input: Yup.string()
        .min(3, 'Minimum 3 characters')
        .max(50, 'Maximum 50 characters'),
})

export default function SearchMed() {
    // const { locale } = useLocale()
    // const [isOpen, setIsOpen] = useState(false)
    // const [inputValue, setInputValue] = useState('')
    // const router = useRouter()

    // const [isPending, startTransition] = useTransition()
    // const [value] = useDebounce(inputValue, 650)

    // const { data: searchResults, isLoading,isFetching } = useQuery({
    //     queryKey: ['searchProducts', value],
    //     queryFn: () => SearchProducts(value),
    //     enabled: value.length >= 3,
    //     staleTime: 1000 * 60 * 5, // 5 minutes
    // })

    // const handleSearch = (value) => {
    //     console.log(value)
    //     setInputValue(value)
    // }

    // const onSubmit = async (values, { resetForm }) => {
    //     console.log(values.input)
    //     if (values.input) {
    //         startTransition(() => {
    //             router.push(`${locale}/search/${values.input}`)
    //         })
    //         setIsOpen(false)
    //         resetForm()
    //     }
    // }

     const { locale } = useLocale();
    const [isOpen, setIsOpen] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const router = useRouter();

    const [isPending, startTransition] = useTransition();
    const [value] = useDebounce(inputValue, 750);

    const handleSearch = async (value) => {
        setInputValue(value);
        if (value.length >= 3) {
            try {
                const response = await SearchProducts(value); // Use SearchProducts function
                console.log(response);
                setSearchResults(response);
            } catch (error) {
                console.error("Error while searching products", error);
                setSearchResults([]);
            }
        } else {
            setSearchResults([]);
        }
    };

    const onSubmit = async (values, { resetForm }) => {
        console.log(values.input);
        if (values.input) {
            try {
                const response = await SearchProducts(values.input); // Use SearchProducts function
                setSearchResults(response);

                startTransition(() => {
                    router.push(`${locale}/search/${values.input}`);
                });
            } catch (error) {
                console.error("Error while searching products", error);
                setSearchResults([]);
                startTransition(() => {
                    router.push(`${locale}/search/${values.input}`);
                });
            } finally {
                setIsOpen(false);
                resetForm();
            }
        }
    };

    useEffect(() => {
        handleSearch(value);
    }, [value]);

    // return (
    //     <PopoverGroup className="hidden lg:flex lg:gap-x-12">
    //         <Popover className="relative">
    //             <>
    //                 <Formik
    //                     initialValues={{ input: '' }}
    //                     validationSchema={validationSchema}
    //                     onSubmit={onSubmit}
    //                 >
    //                     {({ handleChange, handleBlur, values }) => (
    //                         <Form className="space-y-8">
    //                             <div className="flex items-center gap-2 relative">
    //                                 <div className="flex w-full max-w-[760px] gap-x-2">
    //                                     <div className="relative grow p-px">
    //                                         {isLoading ? (
    //                                             <div className="absolute left-2 top-1/2 -translate-y-1/2 z-10">
    //                                                 <Loader2 className="text-gray-400 text-muted-foreground animate-spin" />
    //                                             </div>
    //                                         ) : (
    //                                             <Search className="absolute left-2 text-gray-400 z-10 top-1/2 -translate-y-1/2 text-muted-foreground" />
    //                                         )}
    //                                         <Field
    //                                             name="input"
    //                                             placeholder="Search any medicine..."
    //                                             className="rounded-2.5 pl-[40px] text-4"
    //                                             as={Input}
    //                                             onFocus={() => setIsOpen(true)}
    //                                             onBlur={(e) => {
    //                                                 setTimeout(
    //                                                     () => setIsOpen(false),
    //                                                     200
    //                                                 )
    //                                                 handleBlur(e)
    //                                             }}
    //                                             onChange={(e) => {
    //                                                 handleChange(e)
    //                                                 handleSearch(e.target.value)
    //                                             }}
    //                                         />
    //                                     </div>
    //                                 </div>
    //                             </div>
    //                         </Form>
    //                     )}
    //                 </Formik>

    //                 <Transition
    //                     as={Fragment}
    //                     show={isOpen}
    //                     enter="transition ease-out duration-300"
    //                     enterFrom="opacity-0 translate-y-1"
    //                     enterTo="opacity-100 translate-y-0"
    //                     leave="transition ease-in-out duration-300"
    //                     leaveFrom="opacity-100 translate-y-0"
    //                     leaveTo="opacity-0 translate-y-1"
    //                 >
    //                     <PopoverPanel className="absolute bg-white -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl shadow-lg ring-1 ring-gray-900/5">
    //                         <div className="p-4">
    //                             {isLoading ? (
    //                                 <p className="text-center text-gray-500">
    //                                     Loading...
    //                                 </p>
    //                             ) : searchResults &&
    //                               searchResults?.length > 0 ? (
    //                                 searchResults?.map((item) => (
    //                                     <div
    //                                         key={item.name}
    //                                         className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-100 hover:duration-700"
    //                                     >
    //                                         <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-gray-200 hover:duration-1000">
    //                                             {React.cloneElement(item.icon, {
    //                                                 color: '#013B94',
    //                                                 strokeWidth: 1.8,
    //                                                 size: 27,
    //                                             })}
    //                                         </div>
    //                                         <div className="flex-auto">
    //                                             <Link
    //                                                 href={item.href}
    //                                                 className="block font-semibold text-[#013B94]"
    //                                             >
    //                                                 {item.name}
    //                                             </Link>
    //                                             <p className="mt-1 text-[#013B94]">
    //                                                 {item.description}
    //                                             </p>
    //                                         </div>
    //                                     </div>
    //                                 ))
    //                             ) : (
    //                                 <p className="text-center text-gray-500">
    //                                     No results found
    //                                 </p>
    //                             )}
    //                         </div>
    //                         <div className="grid divide-x divide-gray-900/5 bg-gray-50 hover:duration-700">
    //                             <div className="flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold leading-6 text-[#013B94] hover:bg-gray-200 hover:duration-700">
    //                                 <Link
    //                                     href="#"
    //                                     className="text-[#013B94] ml-1 flex gap-2 items-center"
    //                                 >
    //                                     <Search
    //                                         strokeWidth={1.8}
    //                                         size={27}
    //                                         className="text-[#013B94]"
    //                                     />
    //                                     Looking For More {inputValue}
    //                                 </Link>
    //                             </div>
    //                         </div>
    //                     </PopoverPanel>
    //                 </Transition>
    //             </>
    //         </Popover>
    //     </PopoverGroup>
    // )
    return (
        <PopoverGroup className="hidden lg:flex lg:gap-x-12">
            <Popover className="relative">
                <>
                    <Formik
                        initialValues={{ input: '' }}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                    >
                        {({ handleChange, handleBlur, values }) => (
                            <Form className="space-y-8">
                                <div className="flex items-center gap-2 relative">
                                    <div className="flex w-full max-w-[760px] gap-x-2">
                                        <div className="relative grow p-px">
                                            {isPending ? (
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
                                                onBlur={(e) => {
                                                    setIsOpen(false)
                                                    handleBlur(e)
                                                }}
                                                onChange={(e) => {
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
                        show={isOpen}
                        enter="transition ease-out duration-300"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in-out duration-300"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-1"
                    >
                        <PopoverPanel className="absolute bg-white -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl shadow-lg ring-1 ring-gray-900/5">
                            <div className="p-4">
                                {searchResults?.length > 0 ? (
                                    searchResults.map((item) => (
                                        <div
                                            key={item.name}
                                            className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-100 hover:duration-700"
                                        >
                                            <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-gray-200 hover:duration-1000">
                                                {React.cloneElement(item.icon, {
                                                    color: '#013B94',
                                                    strokeWidth: 1.8,
                                                    size: 27,
                                                })}
                                            </div>
                                            <div className="flex-auto">
                                                <Link
                                                    href={item.href}
                                                    className="block font-semibold text-[#013B94]"
                                                >
                                                    {item.name}
                                                </Link>
                                                <p className="mt-1 text-[#013B94]">
                                                    {item.description}
                                                </p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-center text-gray-500">
                                        No results found
                                    </p>
                                )}
                            </div>
                            <div className="grid divide-x divide-gray-900/5 bg-gray-50 hover:duration-700">
                                <div className="flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold leading-6 text-[#013B94] hover:bg-gray-200 hover:duration-700">
                                    <a
                                        href="#"
                                        className="text-[#013B94] ml-1 flex gap-2 items-center"
                                    >
                                        <Search
                                            strokeWidth={1.8}
                                            size={27}
                                            className="text-[#013B94]"
                                        />
                                        Looking For More {inputValue}
                                    </a>
                                </div>
                            </div>
                        </PopoverPanel>
                    </Transition>
                </>
            </Popover>
        </PopoverGroup>
    )
}