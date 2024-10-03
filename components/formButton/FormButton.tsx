import React, { useState } from 'react'

function FormButton({ type, setType }: any) {
    return (
        // <div className='flex'>
        <button
            className="form-link font-semibold text-[#198AB0] hover:text-[#363955] underline "
            onClick={() => setType(type === 'sign-in' ? "sign-up" : "sign-in")}
        >
            {type === 'sign-in' ? 'Sign up' : 'Sign in'}
        </button>
        // </div>
    )
}

export default FormButton