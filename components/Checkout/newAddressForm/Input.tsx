import React from 'react'

type DataType = {
    formikValue: object,
    handleChange: object,
    placeholder: string,
    name: string,
    formik: any,
    state: any

}

function Input({
    formikValue,
    handleChange,
    placeholder,
    name,
    formik,
    state,

}: any) {
    return (
        <div className=' mx-auto w-full '>
            <input
                type="text"
                className='w-full p-3 border-2 focus:border-[#282a3f]  rounded-lg focus:outline-none focus:shadow-md'
                value={formikValue}
                onChange={handleChange}
                placeholder={placeholder}
                onBlur={formik.handleBlur}
                name={name}
            />

            {formik.errors[name] && formik.touched[name] ? (
                <p className="text-red-500">{formik.errors[name]}</p>
            ) : null}
        </div>
    )
}

export default Input