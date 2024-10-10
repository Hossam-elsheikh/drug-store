import React from 'react'
import OderSummaryInfo from '../OderSummaryInfo/OderSummaryInfo'
import { useLocale } from '@/context/LocaleProvider';
import { useTranslations } from 'next-intl';

type DataType = {
    couponFormik: any,
    applyCouponMutation: any,
    applyCouponEvent: any,
    totalPrice: any,
}


function OrderSummary({ couponFormik, applyCouponMutation, applyCouponEvent, totalPrice }: DataType) {
    const { locale,dir }: any = useLocale();    
    const t = useTranslations("CartPage")
    return (
        <>
            <section className=" rounded-md  overflow-hidden sticky top-28 self-star pt-5 px-7 ">
                <h2 className="text-2xl font-bold text-gray-800 p-2">
                    {t("orderSummary")}
                </h2>
                <div>
                    <div className="border border-[#dedede]  rounded-lg flex flex-col px-4">
                        <div className="space-y-4 py-5">
                            <form onSubmit={couponFormik.handleSubmit} className="relative">
                                <input
                                    className={`w-full p-3 border-2 focus:border-[#282a3f] ${couponFormik.touched.couponCode && couponFormik.errors.couponCode ? 'border-red-500 ' : 'border-gray-300'} rounded-lg focus:outline-none focus:shadow-md`}
                                    type="text"
                                    placeholder={locale === "en" ? "add a Coupon" : "اضف كود خصم"}
                                    value={couponFormik.values.couponCode}
                                    onChange={couponFormik.handleChange}
                                    onBlur={couponFormik.handleBlur}
                                    name="couponCode"
                                    disabled={applyCouponMutation?.data?.finalPrice}
                                    style={{ direction: dir }}
                                />
                                <button
                                    type="button"
                                    disabled={applyCouponMutation?.data?.finalPrice}
                                    onClick={(e)=>{applyCouponEvent(e); couponFormik.handleSubmit(e)}}
                                    className={`absolute top-0 m-0 p-[13.9px] flex items-center text-center text-white font-medium bg-primaryColor disabled:bg-gray-300 hover:bg-[#45486e] transition-all 
                                        ${dir === "rtl" ? 'left-0 rounded-l-md' : 'right-0 rounded-r-md'}`}>
                                    {
                                        applyCouponMutation?.data?.finalPrice
                                            ? (locale === "en" ? "APPLIED" : "تم التطبيق")
                                            : (locale === "ar" ? "تطبيق" : "APPLY")
                                    }                                </button>
                                {couponFormik.touched.couponCode && applyCouponMutation?.data?.response?.data?.message && (
                                    <p className="text-[13px] pt-1 font-medium text-red-500">{applyCouponMutation?.data?.response?.data?.message}</p>
                                )}
                            </form>
                            <OderSummaryInfo
                                title={locale === "en" ? "subtotal" : "المبلغ الفرعي"}
                                price={ totalPrice.data?.cartTotalPrice || totalPrice}
                                styling={null}
                            />
                            {applyCouponMutation?.data?.finalPrice &&
                                <>
                                    <OderSummaryInfo
                                        title={locale === "en" ? "Coupon" :"كود الخصم"}
                                        price={applyCouponMutation?.data?.discount}
                                        styling={'font-semibold text-[#38ae04]'}
                                    />
                                </>
                            }
                            <hr className="border border-[#dcdcdc]" />
                            <div className="font-semibold text-xl">
                                        <OderSummaryInfo
                                            title={locale === "en" ? "Total Price" : "المبلغ الكلي"}
                                            price={ applyCouponMutation?.data?.finalPrice ? applyCouponMutation?.data?.finalPrice : totalPrice?.data?.cartTotalPrice || totalPrice}
                                            styling={null}
                                        />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}

export default OrderSummary