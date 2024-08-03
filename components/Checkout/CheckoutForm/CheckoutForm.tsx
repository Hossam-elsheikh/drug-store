'use client'
import React from 'react'
import { Formik, Form } from 'formik'
import * as Yup from "yup"

import CustomInput from '../../Form/CustomInput'
import { Button } from '../../ui/button'

function CheckoutForm() {
    const initialValues = {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        deliveryAddress: [{ country: "", city: "", street: "" }],
        postalCode: "",
    }

    const validationSchema = Yup.object().shape({
        firstName: Yup.string().required("First Name is required").min(3).max(40),
        lastName: Yup.string().required("Last Name is required").min(3).max(40),
        mobile: Yup.string()
            .required("Mobile is required")
            .matches(/^[0-9]+$/, "Mobile number is not valid"),
        email: Yup.string().required("Email is required").email("Invalid email"),
        deliveryAddress: Yup.array().of(
            Yup.object().shape({
                country: Yup.string().required("Country is required"),
                city: Yup.string().required("City is required"),
                street: Yup.string().required("Street is required"),
            })
        ),
        postalCode: Yup.string().required("Postal Code is required")
    })

    const onSubmit = async (values, { setSubmitting }) => {
        console.log(values);
        setSubmitting(false);
    }

    return (
        <section className="flex flex-col gap-3 bg-white">
        {/* <section className="flex flex-col gap-3 rounded-lg p-3 border shadow-sm bg-white"> */}
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}>
                {({ isSubmitting }) => (
                    <Form className="space-y-5">
                            <CustomInput name='firstName' label="First Name" placeholder='Enter your First Name' />
                            <CustomInput name='lastName' label="Last Name" placeholder='Enter your Last Name' />
                        <CustomInput name='mobile' label="Mobile" placeholder='Enter your Mobile' />
                        <CustomInput name='email' label="Email" placeholder='Enter your Email' />
                            <CustomInput name='deliveryAddress[0].country' label="Country" placeholder='Enter your country' />
                            <CustomInput name='deliveryAddress[0].city' label="City" placeholder='Enter your city' />
                            <CustomInput name='deliveryAddress[0].street' label="Street" placeholder='Enter your street' />
                        <CustomInput name='postalCode' label="Postal Code" placeholder='Enter your Postal Code' />
                        <Button type="submit" disabled={isSubmitting} className="font-semibold  hover:bg-blue-400 p-3 rounded-lg bg-blue-200 w-full active:scale-[0.98] duration-300 border-2 border-blue-200  text-blue-800">
                            Complete Order
                        </Button>
                    </Form>
                )}
            </Formik>
        </section>
    )
}

export default CheckoutForm