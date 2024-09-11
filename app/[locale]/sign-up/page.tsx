import AuthForm from '@/components/Form/AuthForm'
import React from 'react'

function page() {
    return (
        <div className='px-10'>
            <AuthForm Type="sign-up" variant='full' />
        </div>
    )
}

export default page