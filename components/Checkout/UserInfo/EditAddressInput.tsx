import React from 'react'

type DataType = {
    onChange: any,
    name: any,
    value: any,
    defaultValue: any,
    formikErrors: any,
    formikTouched: any,
    formik:any,
}

function EditAddressInput({
    onChange,
    name,
    value,
    defaultValue,
    formikErrors,
    formikTouched,
    formik,
}: DataType) {
    return (
        <div className='mx-auto w-full'>
            <input
                type="text"
                className='w-full p-3 border-2 focus:border-[#5ac5e7]  rounded-lg focus:outline-none focus:shadow-md'
                onChange={onChange}
                name={name}
                value={value}
                defaultValue={defaultValue}
                onBlur={formik.handleBlur}
            />
            <div>

                {formikErrors && formikTouched ? (
                    <p className="text-red-500">{formikErrors}</p>
                ) : null}
            </div>
        </div>
    )
}

export default EditAddressInput