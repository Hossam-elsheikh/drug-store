'use client'
import React from 'react'
import ImageMagnifier from './ImageMagnify'
import ProductsCarousel from '../Carousels/ProductsCarousel'
import ReviewComment from '../ReviewComment/ReviewComment'
import Details from './Details'
import About from './About'
import { useLocale } from '@/context/LocaleProvider'
import { useQuery } from '@tanstack/react-query'
import { getOneProduct } from '@/axios/instance'
import { useTranslations } from 'next-intl'
import CustomerCommentDialog from '../CustomerReview/CustomerCommentDialog'



export function ProductDetails({ params }: ProductDetailsProps) {
    const { locale, dir } = useLocale()
    const t = useTranslations('ProductDetailsPage')

    const {
        data: productDetails,
        isLoading,
        isError,
    } = useQuery({
        queryFn: () => getOneProduct(params?.['product-slug']),
        queryKey: ['productDetails'],
    })

    if (isLoading) {
        return <ProductDetailsSkeleton />
    }

    if (isError) {
        return <div>Error loading product details</div>
    }
    console.log(productDetails)

    const { image, customerReviews, _id } = productDetails
    const imagePath = process.env.NEXT_PUBLIC_IMAGE_PATH

    return (
        <>

            <section className="p-4 md:p-10 bg-white mx-auto max-w-[1600px] rounded-lg shadow-lg">
               
                <section className="md:pt-5 w-full flex flex-col lg:flex-row gap-8">
                    <div dir={dir} className="w-full lg:w-2/3 space-y-10">
                        <div className="h-[300px] md:h-[400px] relative overflow-hidden rounded-lg">
                            <ImageMagnifier
                                src={`${imagePath}${image}`}
                                magnifierHeight={200}
                                magnifierWidth={200}
                                zoomLevel={2}
                            />
                        </div>

                        <Details
                            className="block lg:hidden"
                            productDetails={productDetails}
                        />
                        <About productDetails={productDetails} />

                        <div className="bg-gray-50 p-6 rounded-lg">
                            <h3 className="text-xl font-semibold mb-4">
                                {t('relatedProducts')}
                            </h3>
                            <ProductsCarousel
                                mode="n"
                                products={products}
                            />
                        </div>

                        <div className="space-y-6">
                            <section className='flex justify-between'>
                                <h3 className="text-xl font-semibold">
                                    {t('customerReviews')}
                                </h3>
                                <CustomerCommentDialog productId={_id} />

                            </section>

                            {customerReviews && customerReviews.length != 0 ? (
                                <>
                                    <ReviewComment
                                        userName={'abdul'}
                                        rating={5}
                                        comment={
                                            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
                                        }
                                    />
                                    <ReviewComment
                                        userName={'abdul'}
                                        rating={3}
                                        comment={
                                            'This product could use some improvements.'
                                        }
                                    />
                                    <ReviewComment
                                        userName={'abdul'}
                                        rating={2}
                                        comment={'Not satisfied with the quality.'}
                                    />
                                </>
                            ) : (<>
                                <div className="flex justify-center items-center min-h-[200px] bg-gray-50 rounded-lg p-6">
                                    <div className="text-center">
                                        <p className="text-xl font-semibold text-gray-700 mb-4">
                                            {t('addYourComment')}
                                        </p>
                                        <p className="text-lg text-gray-500 mb-6">
                                            {t('beTheFirstToLeaveAComment')}
                                        </p>

                                    </div>
                                </div></>)}

                        </div>
                    </div>
                    <Details
                        className="hidden lg:block lg:w-1/3 sticky top-24 self-start"
                        productDetails={productDetails}
                    />
                </section>
            </section>

        </>
    )
}

function ProductDetailsSkeleton() {
    return (
        <section className="p-4 md:p-10 bg-white mx-auto max-w-[1600px] rounded-lg shadow-lg animate-pulse">
            <section className="md:pt-5 w-full flex flex-col lg:flex-row gap-8">
                <div className="w-full lg:w-2/3 space-y-10">
                    <div className="h-[300px] md:h-[400px] bg-gray-200 rounded-lg"></div>
                    <div className="space-y-4">
                        <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                        <div className="h-4 bg-gray-200 rounded w-full"></div>
                        <div className="h-4 bg-gray-200 rounded w-full"></div>
                    </div>
                    <div className="bg-gray-100 p-6 rounded-lg">
                        <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
                        <div className="h-40 bg-gray-200 rounded"></div>
                    </div>
                    <div className="space-y-6">
                        <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="space-y-2">
                                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                                <div className="h-4 bg-gray-200 rounded w-full"></div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="hidden lg:block lg:w-1/3 space-y-4">
                    <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-10 bg-gray-200 rounded w-full"></div>
                </div>
            </section>
        </section>
    )
}

export default ProductDetails
