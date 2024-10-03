import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, Mail, Phone, User } from 'lucide-react';
import { useUser } from '@/context/UserProvider';
import AddNewAndEditAddresses from '../newAddressForm/AddNewAndEditAddresses';
import { useLocale } from '@/context/LocaleProvider';

type DataTypes = {
    setShippingAddress: (address: any) => void,
    shippingAddress: any,
    formErrors: any,
    setFormErrors: (errors: any) => void,
}

function UserInfo({ setShippingAddress, shippingAddress, formErrors, setFormErrors }: DataTypes) {
    const [selectedAddress, setSelectedAddress] = useState(shippingAddress?._id || null);

    const f = useTranslations("Form");
    const t = useTranslations("UserInfoPage");
    const { locale,dir }: any = useLocale();

    const { userInfo, isLoading } = useUser();
    const { name, email, mobile, addresses } = userInfo || {};

    const handleAddressChange = (address: any) => {
        setSelectedAddress(address._id);
        setShippingAddress(address);

        if (formErrors.shippingAddress) {
            setFormErrors((errors: any) => ({
                ...errors,
                shippingAddress: ''
            }));
        }
    };

    return (
        <>
            <div className='flex flex-col py-2 pt-7'>
                <div>
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

                <div className="flex justify-between pb-3">
                    <p className="font-medium text-xl pt-5 pb-3">{t("ShippingAddress")}</p>
                    <div className="self-end">
                        <AddNewAndEditAddresses mode="add" />
                    </div>
                </div>

                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-gray-800 p-2 border-b-2">{t("addresses")}</h2>
                    <div className="h-fit overflow-y-auto p-2 rounded-md border border-gray-200 shadow-sm">
                        {addresses?.map((address:any) => (
                            <div key={address._id} className="mb-4 last:mb-0">
                                <label
                                    htmlFor={address._id}
                                    className={`flex justify-between items-center p-4 cursor-pointer rounded-md group transition-all duration-200 ease-in-out border hover:bg-gray-100
                                        ${selectedAddress === address._id ? 'bg-gray-50 border-gray-300 text-gray-900 scale-[1.0090] shadow-sm' : 'text-gray-700 '}
                                        ${formErrors.shippingAddress ? 'border-red-500' : 'border-gray-200'}`}
                                >
                                    <div className="flex items-center space-x-4 transition-all duration-200">
                                        <input
                                            type="radio"
                                            id={address._id}
                                            name="address"
                                            value={address._id}
                                            checked={selectedAddress === address._id}
                                            onChange={() => handleAddressChange(address)}
                                            className={`w-5 h-5 text-gray-600 bg-gray-700 border-gray-300 focus:outline-none accent-[#282a3f] ${locale === "ar" ? 'ml-5' : ''}`}
                                        />
                                        <div className="flex-grow">
                                            <p className={`font-medium ${selectedAddress === address._id ? 'text-gray-900' : 'text-gray-700'}`}>
                                                <span>{address.governorate}</span>, <span>{address.city}</span>
                                            </p>
                                            <p className="text-sm text-gray-600 mt-1">{address.block}</p>
                                        </div>
                                    </div>
                                    <div className="flex-shrink-0">
                                        <AddNewAndEditAddresses mode='edit' initialValues={address} key={address._id} addressId={address._id} />
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
        </>
    );
}

export default UserInfo;
