import Image from 'next/image'
import React from 'react'
import addImage from '@/public/undraw_add_files_re_v09g.svg'

export default function WishList() {
    const product: any = [];
    const dir = 'ltr' 

    return (
        <>
            <div>
                <h1 className='text-lg mb-4'>Wish List</h1>

                <div>
                    {product.length === 0 ? (
                        <div className='items-center flex flex-col h-fit w-full'>
                            <div className="w-full max-w-md">
                                <Image src={addImage} layout="responsive" width={100} height={100} alt="No items in the wish list" />
                            </div>
                            <h1 className='text-lg'>No items in the wish list.</h1>
                        </div>
                    ) : (
                        product.map((item, i) => (
                            <div key={i}>
                                <div>hi</div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </>
    );
}
