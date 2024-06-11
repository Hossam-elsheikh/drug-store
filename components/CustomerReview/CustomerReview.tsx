import React from 'react';
import StarRating from './StarRating';
import Container from '../Container';
import CustomerDialog from './CustomerDialog';

function CustomerReview() {
    const handleSetRating = (rating: number) => {
        console.log(`Rating set to: ${rating}`);
    };

    return (
        <section className='w-full bg-primaryColor min-h-48  p-10 shadow-lg mx-auto flex justify-center '>

            <section className='max-w-[1200px] w-full text-white space-y-12 bg-gray-800 rounded-lg p-10 shadow-md'>
                <div>
                    <h1 className='text-2xl font-semibold'>Customer Reviews</h1>
                    <p className='text-sm'>Read what our customers have to say about our products</p>
                </div>
                <div className='flex flex-row justify-between'>
                    <StarRating
                        mode='rating'
                        defaultRating={0}
                        size={30}
                        onSetRating={handleSetRating}
                    />
                    <CustomerDialog />
                </div>

            </section>

        </section>
    );
}

export default CustomerReview;
