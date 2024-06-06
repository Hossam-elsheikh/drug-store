import PaymentsModal from '@/components/UserProfile/Addresses/AddressesModal'
import React from 'react'

export default function Payments() {
    return (
        <section>
            <div className='flex justify-between'>
                <h1 className='text-lg mb-4'>payments</h1>

                <PaymentsModal />
            </div>


            <div className='flex flex-col'>
                <h5>name</h5>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corrupti suscipit veniam tempore esse inventore ipsa exercitationem, neque accusantium quis similique pariatur illo magnam porro soluta, minus, iste obcaecati sed praesentium.</p>
            </div>
        </section>
    )
}

