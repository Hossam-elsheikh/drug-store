'use client'
import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { DialogClose } from '@radix-ui/react-dialog'
import { Loader, TriangleAlert, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTranslations } from 'next-intl'
import { Form, Formik } from 'formik'
import CustomInput from '@/components/Form/CustomInput'
import { addressValidationSchemaDialog } from '@/lib/schema'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateUser } from '@/axios/instance'
import { useUser } from '@/context/UserProvider'
import useAuth from '@/hooks/useAuth'
import { toast, Toaster } from 'sonner'
import { useLocale } from '@/context/LocaleProvider'

interface AddressFormValues {
    governorate: string
    city: string
    block: string
}

interface AddNewAndEditAddressesProps {
    mode: 'add' | 'edit'
    // userId: string;
    initialValues?: AddressFormValues
    addressId?: string
    onSuccess?: () => void
}

function AddNewAndEditAddresses({
    mode,
    initialValues,
    addressId,
    onSuccess,
}: AddNewAndEditAddressesProps) {
    const { userInfo, isLoading, isError, error } = useUser()

    // if (!userInfo) return
    const { auth }: any = useAuth()
    const userId = auth?.userId
    const { locale, dir }: any = useLocale()

    const f = useTranslations('Form')
    const queryClient = useQueryClient()

    const addUserAddressMutation = useMutation({
        mutationFn: (values: AddressFormValues) => {
            if (mode === 'add') {
                return updateUser({ userId, data: { newAddress: values } })
            } else {
                return updateUser({
                    userId,
                    data: { addressId, addresses: values },
                })
            }
        },

        onSuccess: () => {
            toast.success(
                mode === 'add'
                    ? 'Your new Address Added Successfully'
                    : 'Your Address Updated Successfully'
            )
            queryClient.invalidateQueries()
            if (onSuccess) onSuccess()
        },
        onSettled: () => {
            setTimeout(() => {
                addUserAddressMutation.reset()
            }, 8000)
        },
        onError: (error) => {
            toast.error(
                mode === 'add'
                    ? 'Error Adding Address'
                    : 'Error Updating Address'
            )
            // console.error('Error with address:', error)
        },
    })

    const defaultValues: AddressFormValues = {
        governorate: '',
        city: '',
        block: '',
    }

    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <Button
                        className={` bg-gray-50
        ${`rounded-full items-center gap-2 px-3 py-3 text-sm font-medium text-gray-700  border border-gray-300 shadow-sm hover:bg-gray-100 focus:outline-none duration-200  `}
`}
                        variant="outline"
                    >
                        {mode === 'add' ? f('addAddress') : f('editAddress')}
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      
                        <div className="flex justify-between">
                            {mode === 'add'
                                ? 'Add New Address'
                                : 'Edit Address'}
                            <DialogClose className="bg-gray-50 rounded-full p-1 shadow-sm hover:shadow-lg duration-300 group">
                                <X className="group-hover:text-red-400 duration-300" />
                            </DialogClose>
                        </div>
                    </DialogHeader>
                    {isError ? (
                        <div className="flex justify-center gap-2 items-center min-h-screen">
                            <h3 className="font-medium text-lg">Error</h3>
                            <TriangleAlert />
                        </div>
                    ) : isLoading ? (
                        <div className="flex justify-center gap-2 items-center min-h-screen">
                            <h3 className="font-medium text-lg">Loading...</h3>
                            <Loader className="animate-spin" />
                        </div>
                    ) : (
                        <Formik
                            initialValues={initialValues || defaultValues}
                            validationSchema={addressValidationSchemaDialog}
                            onSubmit={(
                                values,
                                { setSubmitting, resetForm }
                            ) => {
                                addUserAddressMutation.mutate(values, {
                                    onSettled: () => {
                                        setSubmitting(false)
                                        if (mode === 'add') resetForm()
                                    },
                                })
                            }}
                        >
                            {({ isSubmitting, errors }) => (
                                <Form className="space-y-5">
                                    <CustomInput
                                        name="governorate"
                                        label="governorate"
                                        placeholder="Enter governorate"
                                    />
                                    <CustomInput
                                        name="city"
                                        label="City"
                                        placeholder="Enter city"
                                    />
                                    <CustomInput
                                        name="block"
                                        label="block"
                                        placeholder="Enter block"
                                    />
                                    <button
                                        className={`flex justify-center rounded-full w-full p-3 text-center font-medium 
                                    ${
                                        Object.keys(errors).length > 0 ||
                                        isSubmitting
                                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                            : 'bg-green-100 text-green-600 hover:bg-green-600 hover:text-white hover:border-green-600'
                                    }
                                    shadow-sm transition-all duration-300 ease-in-out focus:outline-none`}
                                        type="submit"
                                        disabled={
                                            Object.keys(errors).length > 0 ||
                                            isSubmitting
                                        }
                                    >
                                        {isSubmitting ? (
                                            <div className="flex gap-2">
                                                <p>Submitting</p>
                                                <Loader className="animate-spin ml-2" />
                                            </div>
                                        ) : (
                                            <p>
                                                {mode === 'add'
                                                    ? 'Add Address'
                                                    : 'Update Address'}
                                            </p>
                                        )}
                                    </button>
                                    <Toaster
                                        richColors
                                        position="top-center"
                                        closeButton
                                    />
                                </Form>
                            )}
                        </Formik>
                    )}
                </DialogContent>
            </Dialog>
        </>
    )
}

export default AddNewAndEditAddresses
