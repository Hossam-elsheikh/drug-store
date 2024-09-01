import React, { useEffect, useState } from 'react'
import InputName from './InputName';
import { updateUser } from '@/axios/instance';
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { useTranslations } from 'next-intl';
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, Loader, Mail, Phone, User, X } from 'lucide-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import EditAddressInput from './EditAddressInput';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import AddNewAndEditAddresses from '../newAddressForm/AddNewAndEditAddresses';
import { useUser } from '@/context/UserProvider';
import { ScrollArea } from '@/components/ui/scroll-area';

type DataTypes = {
    user: any,
    setShippingAddress: any,
    shippingAddress: any,
    formErrors: any,
    setFormErrors: any,
}

function UserInfo({ user, setShippingAddress, shippingAddress, formErrors, setFormErrors }: DataTypes) {

    // const [addressId, setAddressId] = useState('')

    // const validationSchema = Yup.object({
    //     city: Yup.string().required('City is required'),
    //     state: Yup.string().required('State is required'),
    //     street: Yup.string().required('Street is required'),
    // });

    // const formik = useFormik(
    //     {
    //         initialValues: {
    //             city: '',
    //             state: '',
    //             street: ''
    //         },
    //         validationSchema: validationSchema,
    //         onSubmit: (values) => {
    //             handleEditAddressSubmit(values);
    //         },
    //     }
    // );
    // useEffect(() => {
    //     if (addressId) {
    //         const selectedAddress = user.addresses.find((address: any) => address._id === addressId);
    //         formik.setValues({
    //             city: selectedAddress?.city || '',
    //             state: selectedAddress?.state || '',
    //             street: selectedAddress?.street || ''
    //         });
    //     }
    // }, [addressId]);

    // const userId = user._id
    // const queryClient = useQueryClient()
    // const updateUserAddressMutation = useMutation({
    //     mutationFn: () => updateUser({
    //         userId,
    //         data: {
    //             addressId,
    //             addresses: {
    //                 city: formik.values.city,
    //                 state: formik.values.state,
    //                 street: formik.values.street
    //             }
    //         }
    //     }),
    //     onSuccess: () => queryClient.invalidateQueries(),
    //     onSettled: () => {
    //         setTimeout(() => {
    //             updateUserAddressMutation.reset()
    //         }, 8000)
    //     },
    // })
    // function handleEditAddressSubmit(event: any) {
    //     event.preventDefault()
    //     updateUserAddressMutation.mutate()
    // }
    const f = useTranslations("Form");
    const t = useTranslations("UserInfoPage");
    const { userInfo, isLoading, isError, error } = useUser()
    const { name, email, mobile, createdAt } = userInfo || {};
    return (

        <div className='flex flex-col py-2'>

            <div className=''>
                <h2 className="text-2xl font-bold text-gray-800 p-2 border-b-2">{t("userInfo")}</h2>
                <Table className="w-full">
                    <TableBody>
                        {isLoading ? (
                            Array.from({ length: 4 }, (_, i) => (
                                <TableRow key={i} className="hover:bg-gray-50">
                                    <TableCell className="w-1/3">
                                        <Skeleton className="w-full h-[24px] bg-gray-200" />
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton className="w-full h-[24px] bg-gray-200" />
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <>
                                <TableRow className="hover:bg-gray-50">
                                    <TableCell className="font-medium flex items-center space-x-2">
                                        <User size={18} /> <span>{f("name")}</span>
                                    </TableCell>
                                    <TableCell>{name}</TableCell>
                                </TableRow>
                                <TableRow className="hover:bg-gray-50">
                                    <TableCell className="font-medium flex items-center space-x-2">
                                        <Mail size={18} /> <span>{f("email")}</span>
                                    </TableCell>
                                    <TableCell>{email}</TableCell>
                                </TableRow>
                                <TableRow className="hover:bg-gray-50">
                                    <TableCell className="font-medium flex items-center space-x-2">
                                        <Phone size={18} /> <span>{f("mobileNumber")}</span>
                                    </TableCell>
                                    <TableCell>{mobile}</TableCell>
                                </TableRow>

                            </>
                        )}
                    </TableBody>
                </Table>

            </div>



            <div className="space-y-4">
                <h2 className="text-2xl font-bold text-gray-800 p-2 border-b-2">{t("addresses")}</h2>
                <div className="h-72 overflow-y-auto p-4 rounded-md border border-gray-200">
                    {user.addresses.map((address) => (
                        <div key={address.id} className="mb-4 last:mb-0">
                            <label htmlFor={address.id} className={`${formErrors.shippingAddress && 'border-red-500'} flex items-start space-x-3 cursor-pointer p-3 rounded-md hover:bg-gray-50 transition-colors duration-200`}>
                                <input
                                    type="radio"
                                    id={address.id}
                                    name="address"
                                    value={address.id}
                                    onChange={() => setShippingAddress(address)}
                                    onFocus={() => {
                                        if (formErrors.shippingAddress) {
                                            setFormErrors((errors) => ({
                                                ...errors,
                                                shippingAddress: ''
                                            }))
                                        }
                                    }}
                                    className="mt-1"
                                />
                                <div className="flex-grow">
                                    <p className="font-medium text-gray-800">
                                        <span>{address.state}</span>, <span>{address.city}</span>
                                    </p>
                                    <p className="text-sm text-gray-600 mt-1">{address.street}</p>
                                </div>
                                <div className="flex-shrink-0">
                                    < AddNewAndEditAddresses mode='edit' addressId={address.id} initialValues={address} />
                                </div>
                            </label>
                        </div>
                    ))}
                </div>
                {formErrors.shippingAddress && (
                    <p className="text-red-500 text-sm">{formErrors.shippingAddress}</p>
                )}
            </div>
        </div>
        //     <div>

        //         <p className='font-medium'>Choose Your Address</p>
        //         <ScrollArea className="h-72 w-full p-5 rounded-md border flex-wrap">

        //         {user.addresses.map((address: any) => (

        //             <div key={address.id}>

        //                 <label htmlFor={address.id} className='flex  space-x-3 cursor-pointer  '>

        //                     <input
        //                         type='radio'
        //                         id={address.id}
        //                         name='address'
        //                         value={address.id}
        //                         onChange={() => setShippingAddress(address)}
        //                         onFocus={() => {
        //                             if (formErrors.shippingAddress) {
        //                                 setFormErrors((errors:any)=>({
        //                                     ...errors,
        //                                     shippingAddress:''
        //                                 }))
        //                             }
        //                         }}
        //                     />

        //                     <p className='space-x-3 truncate'><span>{address.state}</span><span>{address.city}</span><span>{address.street}</span></p>

        //                     <div>
        //                         < AddNewAndEditAddresses mode='edit' addressId={address.id} initialValues={address} />

        //                     </div>
        //                 </label>
        //             </div>
        //         ))}
        //         </ScrollArea>
        //             {formErrors.shippingAddress ? <p className="text-red-400 pt-2">{formErrors.shippingAddress}</p>:null}

        //     </div>

        // </div >
    )
}

export default UserInfo


{/* <Dialog >
                                    <DialogTrigger>
                                    <button className='font-medium text-[#282a3f] hover:text-[#198ab0]' onClick={() => setAddressId(address._id)}>Edit</button>
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
                                                ${updateUserAddressMutation.isPending !== false || Object.keys(formik.errors).length > 0 ? 'disabled:bg-gray-300' : 'bg-[#282a3f]'}
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
                                                </Dialog> */}