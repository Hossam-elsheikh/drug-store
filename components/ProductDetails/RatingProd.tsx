import React from 'react'
import StarRating from '../CustomerReview/StarRating'

export const RatingProd = ({averageRate} : {averageRate:any}) => {
    return (
        <>
        {
            averageRate && 
            <div className="flex ">
            <StarRating
                size={20}
                mode="review"
                defaultRating={averageRate}
               
                />
            <p>
                (
                {averageRate}
                /5
                )
            </p>
        </div>
        }
                </>
    )
}
