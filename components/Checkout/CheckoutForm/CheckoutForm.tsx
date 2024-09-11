"use client";
import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import CustomInput from "@/components/Form/CustomInput";

import { Button } from "@/components/ui/button";
import { CheckoutInitialValues, CheckoutValidationSchema } from "@/lib/schema";

function CheckoutForm() {




    const onSubmit = async (values, { setSubmitting }) => {
        console.log(values);
        setSubmitting(false);
    };

    return (<>
        <h2 className="text-lg font-medium text-gray-900 mb-4">
            Shipping Info
        </h2>
        <section className="flex flex-col gap-3 rounded-lg p-3 border shadow-sm bg-white">
            <Formik
                initialValues={CheckoutInitialValues}
                validationSchema={CheckoutValidationSchema}
                onSubmit={onSubmit}
            >
                {({ isSubmitting }) => (
                    <Form className="space-y-5">
                        <CustomInput
                            name="firstName"
                            label="First Name"
                            placeholder="Enter your First Name"
                        />
                        <CustomInput
                            name="lastName"
                            label="Last Name"
                            placeholder="Enter your Last Name"
                        />
                        <CustomInput
                            name="mobile"
                            label="Mobile"
                            placeholder="Enter your Mobile"
                        />
                        <CustomInput
                            name="email"
                            label="Email"
                            placeholder="Enter your Email"
                        />
                        <CustomInput
                            name="deliveryAddress[0].country"
                            label="Country"
                            placeholder="Enter your country"
                        />
                        <CustomInput
                            name="deliveryAddress[0].city"
                            label="City"
                            placeholder="Enter your city"
                        />
                        <CustomInput
                            name="deliveryAddress[0].street"
                            label="Street"
                            placeholder="Enter your street"
                        />
                        <CustomInput
                            name="postalCode"
                            label="Postal Code"
                            placeholder="Enter your Postal Code"
                        />
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="font-semibold  hover:bg-blue-400 p-3 rounded-lg bg-blue-200 w-full active:scale-[.99] duration-300 border-2 border-blue-200  text-blue-800"
                        >
                            Complete Order
                        </Button>
                    </Form>
                )}
            </Formik>
        </section>
    </>
    );
}

export default CheckoutForm;
