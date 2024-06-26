import AuthForm from '@/components/Form/AuthForm'
import React from 'react'

function page(currentLoc:any) {
    
    return (
        <div className='px-10'>
            <AuthForm Type="sign-in" currentLoc={currentLoc} variant='full'/>
        </div>
    )
}

export default page