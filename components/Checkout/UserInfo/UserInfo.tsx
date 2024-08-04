import { executePayment, getUser, instancePrivate } from '@/axios/instance';
import useAuth from '@/hooks/useAuth';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import { useMutation, useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react'
import InputName from './InputName';

type DataTypes = {
    user:any
}

function UserInfo({user}:DataTypes) {
console.log(user);

    // const mutation = useMutation({
    //     mutationFn: ({ InvoiceValue, PaymentMethodId, values }) => executePayment(InvoiceValue, PaymentMethodId, values),
    //     mutationKey:response,
    // })

    // useEffect(() => {
    //     if (user) {
    //         const payload = {
    //             CustomerName: user.name,
    //             CustomerEmail: user.email,
    //             // MobileCountryCode: MobileCountryCode,
    //             CustomerMobile: user.mobile,
    //             // CallBackUrl: CallBackUrl,
    //             // ErrorUrl: ErrorUrl,
    //             // Language: Language,
    //             DisplayCurrencyIso: "KWD",
    //             InvoiceItem: [{
    //                 ItemName: 'ItemName',
    //                 Quantity: 2,
    //                 UnitPrice: 188,
    //             }],
    //             CustomerAddress: [{ Address: [user.addresses] }],
    //         }
    //         const InvoiceValue = 187
    //         const PaymentMethodId = 5
    //         mutation.mutate({ InvoiceValue, PaymentMethodId, payload })
    //     }
    // }, [user])

    // console.log(mutation);
    // }


    return (
        <div className="border rounded-md px-3 ">
            <InputName inputName="Name " info={user.name} isLast={false} />
            <InputName inputName="Email " info={user.email} isLast={false} />
            <InputName inputName="Mobile " info={user.mobile} isLast={false} />
            {user.addresses.map((address: any) => (
                <div id={address.id} >
                    <InputName inputName="city " info={address.city} isLast={false} />
                    <InputName inputName="state " info={address.state} isLast={false} />
                    <InputName inputName="street " info={address.street} isLast={true} />
                </div>
            ))}
        </div>
    )
}

export default UserInfo