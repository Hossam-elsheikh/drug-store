import React from 'react'

type DataTypes = {
    title: string;
    price: number;
    styling: null | string;
}

function OderSummaryInfo({ title, price, styling }: DataTypes) {
    return (
        <div>
            <div className="flex justify-between">
                <p className={`${styling}`}>{title}</p>
                <p className={`${styling}`}>{styling !== null ? "- " : null}{price} <span className="text-xs">KWD</span></p>
            </div>
        </div>
    )
}

export default OderSummaryInfo