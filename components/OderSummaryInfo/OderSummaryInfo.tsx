import React from 'react'

function OderSummaryInfo({title,price}) {
    return (
        <div>
            <div className="flex justify-between">
                <p>{title}</p>
                <p>{price} <span className="text-xs">KWD</span></p>
            </div>
        </div>
    )
}

export default OderSummaryInfo