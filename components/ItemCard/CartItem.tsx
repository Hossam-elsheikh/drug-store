'use client'

import { X } from 'lucide-react'
import Image from 'next/image'
import Counter from './Counter'
import useAuth from '@/hooks/useAuth'
import HookRemoveItemCart from '@/hooks/removeItemCart'
import Link from 'next/link'
import { useLocale } from '@/context/LocaleProvider'
import useCalcCartMutation from "@/hooks/calcCartMutation";
import removeItemMutation from "@/hooks/removeItemCartMutation";
import useAxiosPrivate from '@/hooks/useAxiosPrivate'
import { useTranslations } from 'next-intl'
import { useDispatch } from 'react-redux'
import { localCartDeleteItem } from '@/redux/slices/addToCart'

function CartItem({
    cartItem, }: any) {
    const { auth }: any = useAuth()
    const { locale, dir } = useLocale()
    const axiosPrivate = useAxiosPrivate();
    const c = useTranslations("CartPage");

    const removeItemCart = () => HookRemoveItemCart({
        auth,
        cartItem,
        removeItemCartMutation,
        calculateCartMutation,
    })

    const { productId: { image, name, price, _id, slug } } = cartItem;

    const totalPrice = (cartItem.productId.price * cartItem.quantity).toFixed(2)
    const calculateCartMutation = useCalcCartMutation({ axiosPrivate, auth });
    const removeItemCartMutation = removeItemMutation(axiosPrivate);

    const dispatch = useDispatch()
    const removeLocalCartItem = () => {
        try {
            dispatch(localCartDeleteItem(_id))
            // console.log('prd deleted successfully from localstorgae');
        } catch (error) {
            console.error('error while delete item from local cart', error);
        }
    }

    return (
        <section className="relative flex items-center space-x-4 rounded-lg bg-white p-5 shadow-sm border border-gray-200 hover:shadow-lg duration-300 transition-all">
            <div className="flex-shrink-0">
                <Image
                    width={120}
                    height={120}
                    className="rounded-md object-cover"
                    src={`${process.env.NEXT_PUBLIC_IMAGE_PATH}${image}`}
                    alt={name.en}
                />
            </div>

            <div className="flex flex-1 flex-col">
                <Link
                    className="cursor-pointer"
                    href={`/${locale}/${slug}/${_id}`}
                >
                    <div className="flex items-start justify-between">
                        <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                            {name?.[locale]}
                        </h3>
                    </div>
                </Link>

                <div className="mt-4 flex items-center justify-between">

                    <Counter
                        cartItem={cartItem}
                        itemQuantity={cartItem.quantity}
                        calculateCartMutation={calculateCartMutation}
                    />
                    <div className="flex flex-col items-start space-y-2">
                        <div className="flex items-baseline gap-1">
                            <span className="text-xl font-bold text-gray-900">{price}</span>
                            <span className=" text-sm font-medium text-gray-500">KWD</span>
                        </div>
                        <div className="text-sm text-gray-600">
                            {c('quantity')}: {cartItem.quantity}
                        </div>
                        <div className="text-sm font-medium text-gray-700">
                            {c('total')}: {totalPrice} KWD
                        </div>
                    </div>


                </div>
            </div>
            <button
                type="button"
                onClick={()=>{
                    if(auth&&auth.userId)removeItemCart()
                    else removeLocalCartItem()
                }}
                className="
                absolute -right-3 -top-4 bg-gray-200 transition-all duration-300
                hover:text-red-600 rounded-full p-1 hover:bg-red-100 text-red-800 shadow-sm hover:shadow-md group"
                aria-label="Remove item"
            >
                <X size={22} className="group-hover:rotate-90 duration-300" />
            </button>
        </section>
    )
}

export default CartItem
