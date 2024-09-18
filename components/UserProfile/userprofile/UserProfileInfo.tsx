import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { useTranslations } from 'next-intl';
import { Skeleton } from "@/components/ui/skeleton";
import { DeleteAccount } from "./DeleteAccount";
import NotFound from "@/app/not-found";
import { User, Mail, Phone, Calendar, Trash2 } from 'lucide-react';

function UserProfileInfo({ userInfo, isLoading, isError, error }: UserProfileInfoProps) {
    const f = useTranslations("Form");
    const { name, email, mobile, createdAt } = userInfo || {};

    if (isError) {
        return <NotFound />;
    }

    return (
        <div className="bg-white shadow-sm rounded-lg overflow-hidden">

            <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-6 text-white">
                <div className="flex items-center gap-4">
                    <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center">
                        <User size={40} className="text-gray-600" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold">{name || 'User Profile'}</h2>
                        <p>{email}</p>
                    </div>
                </div>
            </div>


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
                            <TableRow className="hover:bg-gray-50">
                                <TableCell className="font-medium flex items-center space-x-2">
                                    <Calendar size={18} /> <span>{f("joinDate")}</span>
                                </TableCell>
                                <TableCell>{new Date(createdAt).toLocaleDateString()}</TableCell>
                            </TableRow>
                        </>
                    )}
                </TableBody>
            </Table>


            <div className="p-4 border-t">
                <h3 className="text-lg font-semibold mb-2 flex items-center space-x-2 text-red-600 shadow-sm">
                    <Trash2 size={18} /> <span>{f("delete")}</span>
                </h3>
                <DeleteAccount />
            </div>
        </div>
    );
}

export default UserProfileInfo;