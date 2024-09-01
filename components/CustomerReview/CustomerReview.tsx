import React from 'react';
import StarRating from './StarRating';
import CustomerDialog from './CustomerCommentDialog';

function CustomerReview() {
    const handleSetRating = (rating: number) => {
        console.log(`Rating set to: ${rating}`);
    };

    return (
        <section className='w-full bg-gradient-to-r from-primaryColor to-secondaryColor min-h-screen py-20'>
            <div className='max-w-[1200px] mx-auto px-4'>
                <section className='bg-white text-gray-800 rounded-xl p-8 shadow-2xl space-y-8'>
                    <div className='text-center'>
                        <h1 className='text-3xl font-bold mb-2'>Customer Reviews</h1>
                        <p className='text-gray-600'>Read what our customers have to say about our products</p>
                    </div>
                    <div className='flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0'>
                        <div className='text-center md:text-left'>
                            <p className='font-semibold mb-2'>Rate our product:</p>
                            <StarRating
                                mode='rating'
                                defaultRating={0}
                                size={40}
                                onSetRating={handleSetRating}
                            />
                        </div>
                        <CustomerDialog />
                    </div>
                </section>
            </div>
        </section>
    );
}

export default CustomerReview;