'use client'
import React, { useEffect } from 'react'
import ImageMagnifier from './ImageMagnify'
import ProductsCarousel from '../Carousels/ProductsCarousel'
import ReviewComment from '../ReviewComment/ReviewComment'
import Details from './Details'
import About from './About'
import { useLocale } from '@/context/LocaleProvider'
import { useMutation, useQuery } from '@tanstack/react-query'
import {
    deleteReview,
    getOneProduct,
    getRelatedProducts,
    getReview,
    getReviews,
} from '@/axios/instance'
import { useTranslations } from 'next-intl'
import CustomerCommentDialog from '../CustomerReview/CustomerCommentDialog'
import { ProductDetailsProps } from '@/types'

import StarRating from '../CustomerReview/StarRating'
import useAuth from '@/hooks/useAuth'
import { Pencil, Trash2 } from 'lucide-react'

export function ProductDetails({ params }: ProductDetailsProps) {
    const { locale, dir } = useLocale()
    const {
        auth: { userId },
    }: any = useAuth()
    const productId = params?.['product-slug']
    const t = useTranslations('ProductDetailsPage')
    const {
        data: productDetails,
        isLoading,
        isError,
    } = useQuery({
        queryFn: () => getOneProduct(productId),
        queryKey: ['productDetails'],
    })
    const productReviewQuery = useQuery({
        queryKey: ['reviews', productId],
        queryFn: () => getReviews(productId),
    })
    const customerReview = useQuery({
        queryKey: [userId, productId],
        queryFn: () =>
            getReview({
                userId: userId || '',
                productId: productId || '',
            }),
    })

    const deleteReviewMutation = useMutation({
        mutationFn: deleteReview,
        onSuccess: () => {
            customerReview.refetch()
            productReviewQuery.refetch()
        },
    })
    if (isLoading) {
        return <ProductDetailsSkeleton />
    }

    if (isError) {
        return <div>Error loading product details</div>
    }
    console.log(productDetails)

    const { image, _id } = productDetails
    const imagePath = process.env.NEXT_PUBLIC_IMAGE_PATH

    return (
        <>
            <section className="p-4 md:p-10 bg-white mx-auto max-w-[1600px] rounded-lg shadow-lg">
                <section className="md:pt-5 w-full flex flex-col lg:flex-row gap-8">
                    <div dir={dir} className="w-full lg:w-[70%] space-y-10">
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
                        {productId && (
                            <div className="bg-gray-50 p-6 rounded-lg">
                                <h3 className="text-xl font-semibold mb-4">
                                    {t('relatedProducts')}
                                </h3>

                                <ProductsCarousel
                                    mode="related"
                                    productId={productId}
                                />
                            </div>
                        )}

                        <div className="space-y-4 relative">
                            <h3 className="text-xl font-semibold">
                                {t('customerReviews')}
                            </h3>

                            {customerReview?.data ? (
                                <div>
                                    <div
                                        dir={dir}
                                        className="flex items-center justify-between mb-5"
                                    >
                                        <h1 className="text-lg text-gray-700 font-medium  ">
                                            {locale === 'en'
                                                ? 'Your Previous Review'
                                                : 'تقييمك لهذا المنتج'}
                                        </h1>
                                        <div className="flex items-center text-gray-600 text-md gap-3">
                                            <Trash2
                                                onClick={() => {
                                                    deleteReviewMutation.mutate(
                                                        customerReview?.data
                                                            ?._id
                                                    )
                                                }}
                                                className="cursor-pointer hover:text-red-700 hover:scale-105"
                                            />
                                            <CustomerCommentDialog
                                                isEdit={true}
                                                postHandler={() => {
                                                    customerReview.refetch()
                                                }}
                                                rateId={
                                                    customerReview?.data?._id
                                                }
                                            />
                                        </div>
                                    </div>
                                    <ReviewComment
                                        key={customerReview?.data?._id}
                                        userName={
                                            customerReview?.data?.userId.name
                                        }
                                        rating={customerReview?.data?.rate}
                                        comment={customerReview?.data?.comment}
                                    />
                                </div>
                            ) : (
                                <div
                                    dir={dir}
                                    className={`absolute top-[-20px] ${
                                        locale === 'en' ? 'right-5' : 'left-5'
                                    }`}
                                >
                                    <CustomerCommentDialog
                                        isEdit={false}
                                        postHandler={() => {
                                            customerReview.refetch()
                                        }}
                                        productId={_id}
                                    />
                                </div>
                            )}
                            {productReviewQuery?.data?.reviews &&
                            productReviewQuery?.data?.reviews != 0 ? (
                                <>
                                    <div className="flex justify-between gap-3 items-center">
                                        <p>
                                            {
                                                productReviewQuery?.data
                                                    ?.reviewsCount
                                            }{' '}
                                            {locale === 'en'
                                                ? 'reviewed this products'
                                                : ' قام بتقييم هذا المنتج'}
                                        </p>
                                        <div className="flex items-center gap-5">
                                            <p>
                                                {
                                                    productReviewQuery?.data
                                                        ?.averageRate
                                                }
                                                /5
                                            </p>
                                            <StarRating
                                                size={20}
                                                mode="review"
                                                defaultRating={
                                                    productReviewQuery?.data
                                                        ?.averageRate
                                                }
                                                className="ml-1"
                                            />
                                        </div>
                                    </div>
                                    {productReviewQuery?.data?.reviews?.map(
                                        (rev) => {
                                            if (
                                                rev._id !==
                                                customerReview?.data?._id
                                            )
                                                return (
                                                    <ReviewComment
                                                        key={rev._id}
                                                        userName={
                                                            rev.userId.name
                                                        }
                                                        rating={rev.rate}
                                                        comment={rev.comment}
                                                    />
                                                )
                                        }
                                    )}
                                </>
                            ) : (
                                <>
                                    <div className="flex justify-center items-center min-h-[200px] bg-gray-50 rounded-lg p-6">
                                        <div className="text-center">
                                            <p className="text-xl font-semibold text-gray-700 mb-4">
                                                {t('addYourComment')}
                                            </p>
                                            <p className="text-lg text-gray-500 mb-6">
                                                {t('beTheFirstToLeaveAComment')}
                                            </p>
                                        </div>
                                    </div>
                                </>
                            )}
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
