import CartItem from '@/components/ItemCard/CartItem'
import React from 'react'

export default function CartItemsCheckout() {
    return (
        <>
        <div className='flex gap-1 items-center'>
            <h2 className="font-medium text-lg">1- Review Your Order :</h2>
            <span className='text-light'>(Items: 3)</span>
        </div>

            <div className='space-y-2'>
                <CartItem />
                <CartItem />
                <CartItem />
                <CartItem />
                <CartItem />
           

            </div>
<hr className='p-1'/>
                     <div className='flex justify-between p-2'>
                <h3 className='text-medium' >Subtotal </h3>
                <h3 className='text-medium'> 3.500 (KWT)</h3>
                </div>
        </>
    )
}

