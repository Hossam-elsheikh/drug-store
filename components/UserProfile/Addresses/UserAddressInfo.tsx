import React from 'react';
import { MapPin, Pencil, Trash2 } from 'lucide-react';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableRow,
} from "@/components/ui/table";
import { useTranslations } from 'next-intl';

function UserAddressInfo({ dir = 'ltr', userInfo }) {
    const f = useTranslations("Form",);
    const b = useTranslations("Buttons");

    return (
        <section dir={dir} className="bg-white shadow-md p-5 rounded-lg">
            <div className='flex justify-between mb-4'>
                <h1 className="flex gap-3 text-lg">
                    <MapPin className='text-gray-500' />
                    Address 
                </h1>
                <div className='flex gap-2'>
                    <button className='flex items-center gap-1 px-3 py-2 bg-transparent border border-blue-500 text-blue-700 hover:bg-blue-500 hover:text-white hover:border-transparent rounded shadow-md transition duration-300 ease-in-out text-sm active:scale-95'>
                        <Pencil className='w-4 h-4' />
                        {b("edit")}
                    </button>
                    <button type="button" className="flex items-center gap-1 px-3 py-2 bg-red-700 text-white hover:bg-red-800 rounded shadow-md transition duration-300 ease-in-out text-sm active:scale-95">
                        <Trash2 className='w-4 h-4' />
                        {b("delete")}
                    </button>
                </div>
            </div>

            <Table>
                <TableCaption>Your Address Information</TableCaption>
                <TableBody>
                    <TableRow>
                        <TableCell className="font-medium w-[20%]">{f("firstName")}</TableCell>
                        <TableCell className="w-[30%]">{userInfo.firstName}</TableCell>
                        <TableCell className="font-medium w-[20%]">{f("lastName")}</TableCell>
                        <TableCell className="w-[30%]">{userInfo.lastName}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="font-medium w-[20%]">{f("phoneNumber")}</TableCell>
                        <TableCell className="w-[80%]" colSpan={3}>{userInfo.phoneNumber}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="font-medium w-[20%]">{f("country")}</TableCell>
                        <TableCell className="w-[30%]">{userInfo.country}</TableCell>
                        <TableCell className="font-medium w-[20%]">{f("city")}</TableCell>
                        <TableCell className="w-[30%]">{userInfo.city}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="font-medium w-[20%]">{f("street")}</TableCell>
                        <TableCell className="w-[30%]">{userInfo.street}</TableCell>
                        <TableCell className="font-medium w-[20%]">{f("postalCode")}</TableCell>
                        <TableCell className="w-[30%]">{userInfo.postalCode}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </section>
    );
}

export default UserAddressInfo;