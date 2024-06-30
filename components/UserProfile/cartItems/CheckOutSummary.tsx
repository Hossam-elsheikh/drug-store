"use client";
import React from "react";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { useTranslations } from "next-intl";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import CustomInput from "@/components/Form/CustomInput";

function CheckOutSummary({ subtotal, shipping, taxes, promoCode }) {
    const f = useTranslations("CheckOutPage");

    const initialValues = {
        promoCode: "",
    };

    const validationSchema = Yup.object().shape({
        promoCode: Yup.string().required("Promo Code is required"),
    });

    const onSubmit = async (values, { setSubmitting }) => {
        console.log(values);
        setSubmitting(false);
    };

    return (
        <>
            <div className="border w-full rounded-lg flex flex-col p-3 shadow-sm ">
                <Table>
                    <TableBody className="text-base">
                        <TableRow>
                            <TableCell>{f("subtotal")}</TableCell>
                            <TableCell>{subtotal}</TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell>{f("shipping")}</TableCell>
                            <TableCell>{shipping}</TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell>{f("taxes")}</TableCell>
                            <TableCell>{taxes}</TableCell>
                        </TableRow>

                        {promoCode && (
                            <>
                            
                                    <TableCell colSpan={2}>
                                        <Formik
                                            initialValues={initialValues}
                                            validationSchema={validationSchema}
                                            onSubmit={onSubmit}
                                        >
                                            {({ isSubmitting }) => (
                                                <Form className="space-y-5">
                                                    <CustomInput
                                                        name="promoCode"
                                                        label="Promo Code"
                                                        placeholder="Enter your Promo Code"
                                                    />
                                                </Form>
                                            )}
                                        </Formik>
                                    </TableCell>
                            </>
                        )}
                    </TableBody>
                </Table>
                <hr />

                <div className="flex justify-between p-3 text-lg bg-gray-300 rounded-lg">
                    <h3>Total Order (KWT)</h3>
                    <h3 className="font-bold">500</h3>
                </div>
            </div>
        </>
    );
}

export default CheckOutSummary;