import React from 'react'
import StarRating from '../CustomerReview/StarRating'

export const RatingProd = ({averageRate} : {averageRate:any}) => {
    return (
        <div className="flex justify-between gap-5">
            <StarRating
                size={20}
                mode="review"
                defaultRating={averageRate}
                className="ml-1"
            />
            <p>
                {averageRate}
                /5
            </p>
        </div>
    )
}
