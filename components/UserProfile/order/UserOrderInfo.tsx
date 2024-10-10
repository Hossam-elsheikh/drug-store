import React from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableRow,
} from '@/components/ui/table'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { useLocale } from '@/context/LocaleProvider'
import { Product } from '@/types'
import Link from 'next/link'
import { useMutation } from '@tanstack/react-query'
import { cancelOrder } from '@/axios/instance'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'
import useAuth from '@/hooks/useAuth'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
interface UserOrderInfoProps {
    dir: string
    orderInfo: any
    _id: any
    orderStatus: any
    paymentURL: string
    cart: any
    orderPrice: any
    paymentStatus: string
    paymentMethod: string
}

function UserOrderInfo({ orderInfo }: { orderInfo: UserOrderInfoProps }) {
    const t = useTranslations('OrderPage')
    const imagePath = process.env.NEXT_PUBLIC_IMAGE_PATH || ''
    const { dir, locale } = useLocale()
    const axiosPrivate = useAxiosPrivate()
    const { auth }: any = useAuth()
    const cancelOrderMutation = useMutation({
        mutationFn: cancelOrder,
    })
    const handleCancelOrder = () => {
        confirmAlert({
            title: t("confirmCancelOrder"),
            message: t("confirmText"),
            buttons: [
              {
                label: t("confirm"),
                onClick: () => {cancelOrderMutation.mutate({
                    axiosPrivate,
                    orderId: orderInfo._id,
                    userId: auth?.userId,
                })
            location.reload() }
              },
              {
                label: t("decline"),
              }
            ]
          });
        
    }
    const getStateColor = (state: string) => {
        switch (state?.toLowerCase()) {
            case 'delivered':
                return 'bg-green-100 text-green-800'
            case 'shipped':
                return 'bg-blue-100 text-blue-800'
            case 'cancelled':
                return 'bg-red-100 text-red-800'
            case 'pending':
                return 'bg-yellow-100 text-yellow-800'
            case 'processing':
                return 'bg-yellow-100 text-orange-800'
            case 'returned':
                return 'bg-yellow-100 text-red-800'
            case 'suspended':
                return 'bg-yellow-100 text-red-800'
            default:
                return 'bg-gray-500'
        }
    }

    return (
        <section dir={dir} className="bg-white shadow-md p-5 rounded-lg w-full">
            <div className="flex justify-between items-center">
                <div>
                    <p>
                        <span className="font-bold">
                            {locale === 'en' ? 'Order' : 'الطلب'}
                        </span>{' '}
                        : {orderInfo._id}
                    </p>

                    <h1 className="flex items-center gap-3 text-lg">
                        {t('orderState')}
                        <span
                            className={`text-xs font-medium inline-flex items-center justify-center px-3 py-1 rounded-full ${getStateColor(
                                orderInfo.orderStatus
                            )}`}
                        >
                            {t(
                                `orderStates.${orderInfo.orderStatus.toLowerCase()}`
                            )}
                        </span>
                    </h1>
                    <p>
                        {locale === 'en' ? 'Order total Price' : 'إجمالي الطلب'}
                        : {orderInfo.orderPrice}
                        {locale === 'en' ? ' KWD' : ' دينار كويتي'}
                    </p>
                </div>
                {orderInfo.paymentStatus === 'Pending' &&
                orderInfo.paymentMethod === 'paying-with-visa' &&
                orderInfo.orderStatus === 'pending' ? (
                    <div key={orderInfo._id}>
                        <a href={orderInfo.paymentURL}>
                            <button className="bg-green-700 text-white text-sm p-2 px-4 rounded-full">
                                {locale === 'en'
                                    ? 'Complete Your Order'
                                    : 'المتابعة في طلبك'}
                            </button>
                        </a>
                    </div>
                ) : orderInfo.paymentStatus === 'Paid' &&
                  orderInfo.paymentMethod === 'paying-with-visa' ? (
                    <div key={orderInfo._id}>
                        <a href={orderInfo.paymentURL}>
                            <button className="bg-green-700 text-white text-sm p-2 px-4 rounded-full">
                                {locale === 'en'
                                    ? 'Show receipt'
                                    : 'عرض الفاتورة'}
                            </button>
                        </a>
                    </div>
                ) : (
                    orderInfo.orderStatus === 'pending' && (
                        <button
                            onClick={handleCancelOrder}
                            className="text-white bg-red-700 text-sm rounded-full p-2 px-4"
                        >
                            {locale === 'en' ? 'Cancel Order' : 'إلغاء الطلب'}
                        </button>
                    )
                )}
            </div>

            <div className="flex flex-col gap-3 w-full py-3">
                {orderInfo.cart.map((item: any) => (
                    <div
                        key={item.producId?._id}
                        className="flex gap-3 p-4 rounded border"
                    >
                        <Link
                            href={`/${locale}/${item?.productId?.slug}/${item.productId?._id}`}
                            className="relative flex justify-center items-center overflow-hidden w-[30%] md:w-[20%]"
                        >
                            <Image
                                src={`${imagePath}${item?.productId?.image}`}
                                alt="prod"
                                width={100}
                                height={100}
                                // sizes='40'
                                className="contain self-center"
                            />
                        </Link>
                        <div className="flex text-xs w-[80%] md:w-full font-medium text-gray-700 flex-col md:flex-row gap-3 justify-between md:items-center">
                            <Link
                                className="cursor-pointer text-sm w-[50%] hover:text-secColor hover:underline"
                                href={`/${locale}/${item?.productId?.slug}/${item.productId?._id}`}
                            >
                                {
                                    item?.productId?.name[
                                        locale as keyof typeof item.productId.name
                                    ]
                                }
                            </Link>
                            <p>
                                {locale === 'en' ? 'quantity ' : ' الكمية'}:
                                {item.quantity}
                            </p>
                            <p>
                                {locale === 'en' ? 'price ' : ' السعر'}:
                                {item.productId.price}{' '}
                                {locale === 'en' ? 'KWD' : 'د.ك'}
                            </p>
                            <p>
                                {locale === 'en'
                                    ? 'stock '
                                    : ' متوفر في المخزن'}
                                :{item.productId.stock}{' '}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default UserOrderInfo

export function UserOrderSkeleton() {
    return (
        <>
            <section className="bg-white shadow-md p-5 rounded-lg w-full animate-pulse">
                <div className="">
                    <h1 className="flex items-center gap-3 text-lg">
                        <span className="bg-gray-300 rounded-full h-4 w-20"></span>
                    </h1>
                </div>

                <div>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell className="font-medium w-[5%]">
                                    <span className="bg-gray-300 rounded h-4 block w-10"></span>
                                </TableCell>
                                <TableCell className="w-[30%]">
                                    <span className="bg-gray-300 rounded h-4 block"></span>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium md:w-[15%] w-[50%]">
                                    <span className="bg-gray-300 rounded h-16 block w-16"></span>
                                </TableCell>
                                <TableCell className="w-[20%]">
                                    <span className="bg-gray-300 rounded h-4 block w-32"></span>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
            </section>
        </>
    )
}
