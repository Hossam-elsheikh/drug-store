import React from 'react';
import StarRating from '../CustomerReview/StarRating';

type ReviewCommentProps = {
    userName: string;
    rating: number;
    comment: string;
};

function ReviewComment({ userName, rating, comment }: ReviewCommentProps) {
    return (
        <div className="inline-block bg-slate-50 p-1 rounded-lg  max-w-lg h-fit">
            <div className="bg-white p-2 rounded-lg">
                <div className="flex-auto">
                    <div className="text-base text-slate-900 font-semibold">
                        {userName}
                    </div>
                    <div className="text-sm text-slate-500 flex items-center">
                        <span>Rating:</span>
                        <StarRating
                            size={20}
                            mode="review"
                            defaultRating={rating}
                            className="ml-1"
                        />
                    </div>
                    <p className="mt-4 text-slate-700 hover:break-words  truncate ">
                        {comment}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default ReviewComment;