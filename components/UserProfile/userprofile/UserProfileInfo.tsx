import React from 'react';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useTranslations } from 'next-intl';

function UserProfileInfo({ userInfo }) {
    const f = useTranslations("Form");
    return (
        <Table>
            <TableCaption>Your Information</TableCaption>
          
            <TableBody>
                <TableRow>
                    <TableCell className="font-medium">{f("firstName")}</TableCell>
                    <TableCell>{userInfo.firstName}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell className="font-medium">{f("lastName")}</TableCell>
                    <TableCell>{userInfo.lastName}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell className="font-medium">{f("email")}</TableCell>
                    <TableCell>{userInfo.email}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell className="font-medium">{f("phoneNumber")}</TableCell>
                    <TableCell>{userInfo.phoneNumber}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell className="font-medium">{f("dateOfBirth")}</TableCell>
                    <TableCell>{userInfo.dateOfBirth}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell className="font-medium">{f("gender")}</TableCell>
                    <TableCell>{userInfo.gender}</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    )
}

export default UserProfileInfo