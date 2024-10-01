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
    console.log(applyCouponMutation);
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
                                    disabled={applyCouponMutation?.data?.data}
                                    style={{ direction: dir }}
                                />
                                <button
                                    type="submit"
                                    disabled={applyCouponMutation?.data?.data}
                                    onClick={applyCouponEvent}
                                    className={`absolute top-0 m-0 p-[13.9px] flex items-center text-center text-white font-medium bg-primaryColor disabled:bg-gray-300 hover:bg-[#45486e] transition-all 
                                        ${dir === "rtl" ? 'left-0 rounded-l-md' : 'right-0 rounded-r-md'}`}>
                                    {
                                        applyCouponMutation?.data?.data
                                            ? (locale === "en" ? "APPLIED" : "تم التطبيق")
                                            : (locale === "ar" ? "تطبيق" : "APPLY")
                                    }                                </button>
                                {couponFormik.touched.couponCode && applyCouponMutation?.data?.response?.data?.message && (
                                    <p className="text-[13px] pt-1 font-medium text-red-500">{applyCouponMutation?.data?.response?.data?.message}</p>
                                )}
                            </form>
                            <OderSummaryInfo
                                title={locale === "en" ? "subtotal" : "المبلغ الفرعي"}
                                price={totalPrice?.data?.cartTotalPrice || totalPrice}
                                styling={null}
                            />
                            {applyCouponMutation.data?.data ?
                                <>
                                    <OderSummaryInfo
                                        title={locale === "en" ? "Coupon" : "الكوبون"}
                                        price={applyCouponMutation?.data?.data.discount}
                                        styling={'font-semibold text-[#38ae04]'}
                                    />
                                </>
                                :
                                null
                            }
                            {/* <OderSummaryInfo
                                title='Shipping Fee'
                                price={totalPrice?.data?.cartTotalPrice}
                                styling={null}
                            /> */}
                            <hr className="border border-[#dcdcdc]" />
                            <div className="font-semibold text-xl">

                                {applyCouponMutation.data?.data ?
                                    <>
                                        <OderSummaryInfo
                                            title={locale === "en" ? "Total Price" : "مجموع المبلغ الكلي"}
                                            price={applyCouponMutation?.data?.data?.finalPrice}
                                            styling={null}
                                        />
                                    </>
                                    :
                                    <>
                                        <OderSummaryInfo
                                            title={locale === "en" ? "Total" : "المبلغ الكلي"}
                                            price={totalPrice?.data?.cartTotalPrice || totalPrice}
                                            styling={null}
                                        />
                                    </>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}

export default OrderSummary