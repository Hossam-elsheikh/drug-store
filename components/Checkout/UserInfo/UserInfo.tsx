import React, { useEffect, useState } from 'react'
import InputName from './InputName';
import { updateUser } from '@/axios/instance';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import LabelName from '../newAddressForm/LabelName';
import Input from '../newAddressForm/Input';
import Link from 'next/link';
import AboutUs from '@/app/[locale]/aboutUs/page';
import { Loader, X } from 'lucide-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import EditAddressInput from './EditAddressInput';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type DataTypes = {
    user: any,
    setShippingAddress: any,
    shippingAddress: any,
    CheckoutFormik: any,
}

function UserInfo({ user, setShippingAddress, shippingAddress, CheckoutFormik }: DataTypes) {

    const [addressId, setAddressId] = useState('')

    const validationSchema = Yup.object({
        city: Yup.string().required('City is required'),
        state: Yup.string().required('State is required'),
        street: Yup.string().required('Street is required'),
    });

    const formik = useFormik(
        {
            initialValues: {
                city: '',
                state: '',
                street: ''
            },
            validationSchema: validationSchema,
            onSubmit: (values) => {
                handleEditAddressSubmit(values);
            },
        }
    );
    useEffect(() => {
        if (addressId) {
            const selectedAddress = user.addresses.find((address: any) => address._id === addressId);
            formik.setValues({
                city: selectedAddress?.city || '',
                state: selectedAddress?.state || '',
                street: selectedAddress?.street || ''
            });
        }
    }, [addressId]);

    const userId = user._id
    const queryClient = useQueryClient()
    const updateUserAddressMutation = useMutation({
        mutationFn: () => updateUser({
            userId,
            data: {
                addressId,
                addresses: {
                    city: formik.values.city,
                    state: formik.values.state,
                    street: formik.values.street
                }
            }
        }),
        onSuccess: () => queryClient.invalidateQueries(),
        onSettled: () => {
            setTimeout(() => {
                updateUserAddressMutation.reset()
            }, 8000)
        },
    })
    function handleEditAddressSubmit(event: any) {
        event.preventDefault()
        updateUserAddressMutation.mutate()
    }

    return (

        <div className='grid lg:grid-cols-2 sm:grid-cols-1 py-2'>

            <div>
                <p className='font-medium'>User Info</p>

                <InputName inputName="Name " info={user.name} isLast={false} />
                <InputName inputName="Mobile " info={user.mobile} isLast={false} />
            </div>

            <div>

                <p className='font-medium'>Choose Your Address</p>

                {user.addresses.map((address: any) => (

                    <div key={address.id}>

                        <label htmlFor={address.id} className='flex  space-x-3 cursor-pointer  '>

                            <input
                                type='radio'
                                id={address.id}
                                name='address'
                                value={address.id}
                                onChange={() => setShippingAddress(address)}
                            />

                            <p className='space-x-3'><span>{address.state}</span><span>{address.city}</span><span>{address.street}</span></p>

                            <div>
                                <Dialog >
                                    <DialogTrigger>
                                        <button className='font-medium text-[#5ac5e7] hover:text-[#198ab0]' onClick={() => setAddressId(address._id)}>Edit</button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[425px]">
                                        <DialogHeader >
                                            <div className="flex justify-between">
                                                <DialogTitle>Edit Address</DialogTitle>
                                                <DialogClose><X /></DialogClose>
                                            </div>
                                        </DialogHeader>
                                        <form className="grid gap-4 " onSubmit={handleEditAddressSubmit}>
                                            <div className="flex items-center w-full ">
                                                <LabelName
                                                    labelName='State'
                                                />
                                                <EditAddressInput
                                                    onChange={formik.handleChange}
                                                    name='state'
                                                    value={formik.values.state}
                                                    defaultValue={address.state}
                                                    formikErrors={formik.errors.state}
                                                    formikTouched={formik.touched.state}
                                                    formik={formik}
                                                />
                                            </div>
                                            <div className="flex items-center ">
                                                <LabelName
                                                    labelName='City'
                                                />
                                                <EditAddressInput
                                                    onChange={formik.handleChange}
                                                    name='city'
                                                    value={formik.values.city}
                                                    defaultValue={address.city}
                                                    formikErrors={formik.errors.city}
                                                    formikTouched={formik.touched.city}
                                                    formik={formik}
                                                />
                                            </div>
                                            <div className="flex items-center">
                                                <LabelName
                                                    labelName='Street'
                                                />
                                                <EditAddressInput
                                                    onChange={formik.handleChange}
                                                    name='street'
                                                    value={formik.values.street}
                                                    defaultValue={address.street}
                                                    formikErrors={formik.errors.street}
                                                    formikTouched={formik.touched.street}
                                                    formik={formik}
                                                />
                                            </div>
                                            <button
                                                className={`flex justify-center gap-3 p-3 text-center text-white font-medium 
                                                        ${updateUserAddressMutation.isPending !== false || Object.keys(formik.errors).length > 0 ? 'disabled:bg-gray-300' : 'bg-[#5ac5e7]'}
                                                        rounded-md hover:bg-[#198ab0] transition-all `}
                                                type="submit"
                                                disabled={Object.keys(formik.errors).length > 0 || updateUserAddressMutation.isPending !== false}
                                            >
                                                {updateUserAddressMutation.isPending !== false ? <p>Submitting</p> : <p>Submit</p>}
                                                {updateUserAddressMutation.isPending !== false ? <Loader className="animate-spin" /> : null}
                                            </button>
                                            {updateUserAddressMutation?.data?.addresses ? <p className="text-green-400 text-center">address updated successfully !</p> : updateUserAddressMutation?.data?.response.status === 404 ? <p className="text-red-400 text-center">request failed, please try again</p> : null}
                                        </form>
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </label>
                    </div>
                ))}
                {CheckoutFormik.errors.shippingAddress && (
                    <div style={{ color: 'red' }}>{CheckoutFormik.errors.shippingAddress}</div>
                )}
            </div>

        </div >
    )
}

export default UserInfo