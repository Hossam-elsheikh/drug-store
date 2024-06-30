import React from 'react';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableRow,
} from "@/components/ui/table";
import Image from 'next/image';
import { useTranslations } from 'next-intl';

function UserOrderInfo({ dir = 'ltr', orderState }) {
    const t = useTranslations("OrderPage");
    const getStateColor = (state) => {
        switch (state.toLowerCase()) {
            case 'delivered':
                return 'bg-green-100 text-green-800';
            case 'shipped':
                return 'bg-blue-100 text-blue-800';
            case 'canceled':
                return 'bg-red-100 text-red-800';
            case 'pinned':
                return 'bg-yellow-100 text-yellow-800';
            default:
                return 'bg-gray-500';
        }
    };

    return (
        <section dir={dir} className="bg-white shadow-md p-5 rounded-lg w-full">
            <div className=''>
                <h1 className="flex items-center gap-3 text-lg">
                    {t('orderState')}
                    <span
                        className={`text-xs font-medium inline-flex items-center justify-center px-3 py-1 rounded-full ${getStateColor(orderState)}`}
                    >
                        {t(`orderStates.${orderState.toLowerCase()}`)}
                    </span>
                </h1>
            </div>

            <div>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell className="font-medium w-[5%]">ID</TableCell>
                            <TableCell className="w-[30%]">NEGG10048461351-1</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-medium md:w-[15%] w-[50%]">
                                <Image
                                    src={'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?q=80&w=2079&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}
                                    layout="responsive"
                                    width={50}
                                    height={50}
                                    alt={t('noItemsInWishlist')}
                                />
                            </TableCell>
                            <TableCell className="w-[20%]"> CHOETECH Choetech PD5010 USB-C PD3.0 Wall Charger - 20W white</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </section>
    );
}

export default UserOrderInfo;