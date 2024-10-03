import { useLocale } from '@/context/LocaleProvider';
import { useTranslations } from 'next-intl';
import React from 'react'

type DataTypes = {
    title: string;
    price: number;
    styling: null | string;
}

function OderSummaryInfo({ title, price, styling }: DataTypes) {
const t = useTranslations("cart")
    return (
        <div >
            <div className="flex justify-between">
                <p className={`${styling}`}>{title}</p>
                <p className={`${styling}`}>{styling != null ? "- " : null}{(price)?.toFixed(2)} <span className="text-xs">{t("dinar")}</span></p>
            </div>
        </div>
    )
}

export default OderSummaryInfo