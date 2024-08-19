import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { DialogClose } from "@radix-ui/react-dialog";
import { Loader, X } from 'lucide-react';
import { Label } from '@/components/ui/label';
import LabelName from "@/components/Checkout/newAddressForm/LabelName";
import Input from "@/components/Checkout/newAddressForm/Input";

type DataType = {
    handleFormAddressSubmit:any,
    formik:any,
    addUserAddressMutation:any,
}

function AddNewAddress({handleFormAddressSubmit,formik,addUserAddressMutation}:DataType) {
    return (
            <>
                <Dialog >
                    <DialogTrigger asChild>
                        <button className="text-[#4fb4d3]">Add New Address</button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader >
                            <div className="flex justify-between">
                                <DialogTitle>Add New Address</DialogTitle>
                                <DialogClose><X /></DialogClose>
                            </div>
                        </DialogHeader>
                        <form className="grid gap-4" onSubmit={handleFormAddressSubmit}>

                            <div className="flex items-center ">
                                <LabelName
                                    labelName='State'
                                />
                                <Input
                                    formikValue={formik.values.state}
                                    handleChange={formik.handleChange}
                                    placeholder="enter state"
                                    name="state"
                                    formik={formik}
                                />
                            </div>

                            <div className="flex items-center  ">
                                <LabelName
                                    labelName='City'
                                />
                                <Input
                                    formikValue={formik.values.city}
                                    handleChange={formik.handleChange}
                                    placeholder="enter city name"
                                    name="city"
                                    formik={formik}
                                />
                            </div>

                            <div className="flex items-center">
                                <LabelName
                                    labelName='Street'
                                />
                                <Input
                                    formikValue={formik.values.street}
                                    handleChange={formik.handleChange}
                                    placeholder="enter street"
                                    name="street"
                                    formik={formik}
                                />
                            </div>

                            <button
                                className={`flex justify-center gap-3 p-3 text-center text-white font-medium 
                                                        ${Object.keys(formik.errors).length > 0 || addUserAddressMutation.isPending !== false ? 'disabled:bg-gray-300' : 'bg-[#5ac5e7]'}
                                                        rounded-md hover:bg-[#198ab0] transition-all `}
                                type="submit"
                                disabled={Object.keys(formik.errors).length > 0 || addUserAddressMutation.isPending !== false}
                            >
                                {addUserAddressMutation.isPending !== false ? <p>Submitting</p> : <p>Submit</p>}
                                {addUserAddressMutation.isPending !== false ? <Loader className="animate-spin" /> : null}
                            </button>
                            {addUserAddressMutation?.data?.addresses ? <p className="text-green-400 text-center">new address added successfully !</p> : addUserAddressMutation?.data?.response.status === 404 ? <p className="text-red-400 text-center">request failed, please try again</p> : null}
                        </form>
                    </DialogContent>
                </Dialog>
            </>
    )
}

export default AddNewAddress