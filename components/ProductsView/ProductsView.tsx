'use client'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import ProductCard, {
    ProductCardSkeleton,
} from '@/components/ItemCard/ProductCard'
import { ProductsProvider } from '@/context/ProductsProvider'

import { useInfiniteQuery } from '@tanstack/react-query'
import { fetchProducts } from '@/axios/instance'
import { Product } from '@/types'
import { Loader } from 'lucide-react'
import { useTranslations } from 'next-intl'
type Props = {
    params?: {
        locale?: string
        id?: string
        term?: string
        ['collection-slug']?: string
        // searchCategory?: string
    }
    term?: string
    catId?: string
    SubId?: string
    brand?: string
    name?: string
}

type FetchProductsResponse = {
    products: Product[]
    next?: string | null
    hasNext?: boolean
}

function ProductsContent({ params = {}, SubId, catId, brand, name }: Props) {
    const { locale, id, term } = params

    const [sort, setSort] = useState('createdAt')
    const t = useTranslations("ProductView");
    let title = 'Products'
    if (id && SubId) {
        title = ` ${name} `
    } else if (id && brand) {
        title = `${name} `
    } else if (catId) {
        title = ` ${name}`
    }
    const scrollPositionRef = useRef<number>(0)

    const {
        data: fetchedProducts,
        isLoading,
        isError,
        fetchNextPage,
        hasNextPage,
        refetch,
        isFetchingNextPage,
    } = useInfiniteQuery<FetchProductsResponse>({
        queryKey: ['products', { term, catId, SubId, brand }],
        queryFn: ({ pageParam = null }) =>
            fetchProducts({
                name: term?.replace('%20', ' '),
                category: catId,
                subCategory: SubId,
                brand,
                sort: sort.split('-')[0] || 'createdAt',
                order: sort.split('-')[1] || 'des',
                next: pageParam,
                limit: 18,
            }),
        getNextPageParam: (lastPage) =>
            lastPage?.next ? lastPage.next : undefined,
        initialPageParam: null,
    })

    const saveScrollPosition = () => {
        scrollPositionRef.current =
            window.pageYOffset || document.documentElement.scrollTop
    }

    const restoreScrollPosition = () => {
        window.scrollTo({
            top: scrollPositionRef.current,
            behavior: 'auto',
        })
    }
    const loadMoreProducts = useCallback(() => {
        if (hasNextPage) {
            saveScrollPosition()
            fetchNextPage()
        }
    }, [hasNextPage, fetchNextPage])

    const sortHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const v = e.target.value
        setSort(v)
        scrollPositionRef.current = 0
    }
    useEffect(() => {
        refetch()
    }, [sort])
    useEffect(() => {
        const handleScroll = () => {
            if (
                window.innerHeight + document.documentElement.scrollTop >=
                document.documentElement.scrollHeight - 100
            ) {
                loadMoreProducts()
            }
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [fetchedProducts, loadMoreProducts])

    useEffect(() => {
        restoreScrollPosition()
    }, [fetchedProducts])
    if (isError) {
        return <div>Server Error, please try again later</div>
    }
    return (
        <section className="   pb-5 mt-8">
            <div className="p-0 md:p-10 bg-white mx-auto max-w-[1600px] rounded-lg border">
                <div className="p-5 flex justify-between items-center">
                    {title && (
                        <h1 className="text-md md:text-2xl font-semibold px-5 md:px-10">
                            {title}
                        </h1>
                    )}
                    <form
                        action=""
                        className="text-lg font-medium flex items-center gap-2 text-gray-600"
                    >
                        <label
                            htmlFor="sort"
                            className="text-lg font-bold hidden md:block"
                        >
                            {t('filterBy')}
                        </label>
                        <select
                            className="block w-fit mt-1 p-2 px-3 text-sm rounded-full   bg-white border border-gray-300  shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            name="sort"
                            id="sort"
                            value={sort}
                            onChange={sortHandler}
                        >
                            <option value="createdAt-des">
                                {t('newProducts')}
                            </option>
                            <option value="price-asc">
                                {t('lowest')}
                            </option>
                            <option value="price-des">
                                {t('highest')}

                            </option>
                        </select>
                    </form>
                    {/* <DrawerWrapper showSec="filter" /> */}
                </div>

                <section className="flex md:gap-7 gap-3 justify-center flex-wrap mt-5 w-full">
                    {isLoading ? (
                        <>
                            {[1, 2, 3, 4, 5].map((i) => (
                                <ProductCardSkeleton key={i} />
                            ))}
                        </>
                    ) : fetchedProducts?.pages ? (
                        <div className="flex w-full flex-col justify-center  p-0 md:p-2 gap-8">
                            <div className="flex flex-wrap gap-7 w-full justify-center items-center mx-auto">
                                {fetchedProducts?.pages?.flatMap((page, i) =>
                                    page?.products?.map((product: Product) => (
                                        <ProductCard
                                            key={product._id}
                                            details={product}
                                            index={String(i)}
                                            mode="default"
                                        />
                                    ))
                                )}
                            </div>
                            {hasNextPage ? (
                                <button
                                    className="bg-white border rounded-lg p-2 px-3 cursor-pointer hover:opacity-80 font-medium w-fit mx-auto"
                                    onClick={loadMoreProducts}
                                    disabled={isFetchingNextPage}
                                >
                                    {isFetchingNextPage

                                        ? <div className='flex gap-3 text-gray-600 mx-auto bg-gray-50 p-2 px-5 shadow-sm rounded-full'>
                                            {t('loading')}
                                            <Loader className="animate-spin" />
                                        </div>
                                        : <>
                                            {t('more')}
                                        </>}
                                </button>
                            ) : (
                                <p className="text-gray-600 mx-auto bg-gray-50 p-2 px-5 shadow-sm rounded-full">
                                    {t('noMore')}
                                </p>
                            )}
                        </div>
                    ) : (
                        <div className='flex gap-3 text-gray-600 mx-auto bg-gray-50 p-2 px-5 shadow-sm rounded-full'>
                            {t('noProductsYet')}
                        </div>

                    )}
                </section>
            </div>
        </section>
    )
}

function ProductsView(props: Props) {
    const initialFilters: any = { page: 1 }
    if (props.SubId) {
        initialFilters.subCategory = props.SubId
    } else if (props.brand) {
        initialFilters.brand = props.brand
    }

    return (
        <ProductsProvider initialFilters={initialFilters}>
            <ProductsContent {...props} />
        </ProductsProvider>
    )
}

export default ProductsView
