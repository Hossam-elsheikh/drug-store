'use client'
import { useTranslations } from 'next-intl'
import React, { useState, useTransition } from 'react'
import DropList from './DropList'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useQuery } from '@tanstack/react-query'
import { getCategories, getBrands } from '@/axios/instance'
import { Loader2 } from 'lucide-react'
import NotFound from '@/app/not-found'
import { useLocale } from '@/context/LocaleProvider'
import BrandsDropList from './BrandsDropList'
import Menu from './Menu'

interface Categories {
    name: {
        en: string
        ar: string
    }
    _id: string
}

interface Brand {
    _id: string
    slug: string
    name: {
        en: string
        ar: string
    }
}


const MenuDrawer = () => {
    const t = useTranslations('Navigation')
    const [isPending, startTransition] = useTransition()
    const [activeTab, setActiveTab] = useState('menu')
    const { dir } = useLocale()

    const handleTabChange = (value: string) => {
        startTransition(() => {
            setActiveTab(value)
        })
    }


    const {
        data: categories,
        isLoading: isCategoriesLoading,
        isError: isCategoriesError,
    } = useQuery({
        queryFn: getCategories,
        queryKey: ['getCategories'],
    })

    const {
        data: brands,
        isLoading: isBrandsLoading,
        isError: isBrandsError,
    } = useQuery({
        queryFn: getBrands,
        queryKey: ['getBrands'],
    })

    if (isCategoriesError || isBrandsError) {
        return <NotFound mode="drawer" />
    }

    const isLoading = isCategoriesLoading || isBrandsLoading

    const Categories = () => (
        <div>
            {categories?.map(({ name, _id: id }: Categories) => (
                <div key={id} dir={dir}>
                    <DropList id={id} name={name} />
                </div>
            ))}

        </div>
    )
    const Brands = () => (
        <div>
            <BrandsDropList brands={brands} isLoading={isLoading} />
        </div>
    )



    return (
        <Tabs
            defaultValue="menu"
            className="w-full"
            value={activeTab}
            onValueChange={handleTabChange}
        >
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger
                    value="menu"
                    onMouseDown={() => handleTabChange('menu')}
                >
                    {t('main')}
                    {isPending ||
                        (isLoading && activeTab === 'menu' && (
                            <Loader2 className="animate-spin ml-2 h-4 w-4" />
                        ))}
                </TabsTrigger>
                <TabsTrigger
                    value="categories"
                    onMouseDown={() => handleTabChange('categories')}
                >
                    {t('categories')}
                    {isPending ||
                        (isLoading && activeTab === 'categories' && (
                            <Loader2 className="animate-spin ml-2 h-4 w-4" />
                        ))}
                </TabsTrigger>
            </TabsList>
            <TabsContent value="menu">
                {isPending || (isLoading && activeTab === 'menu') ? (
                    <div className="flex justify-center items-center h-full">
                        <Loader2 className="animate-spin h-6 w-6 text-primaryColor" />
                    </div>
                ) : (
                    <Menu />
                )}
            </TabsContent>
            <TabsContent value="categories">
                {isPending || (isLoading && activeTab === 'categories') ? (
                    <div className="flex justify-center items-center h-full">
                        <Loader2 className="animate-spin h-6 w-6 text-primaryColor" />
                    </div>
                ) : (
                    <>
                        <h1 className='text-center font-xl font-medium p-3'>Brands</h1>
                        <Brands />

                        <h1 className='text-center font-xl font-medium p-3'>Subcategories</h1>
                        <Categories />
                    </>
                )}
            </TabsContent>
        </Tabs>
    )
}

export default MenuDrawer
