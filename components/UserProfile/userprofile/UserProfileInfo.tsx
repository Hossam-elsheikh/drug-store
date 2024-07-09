import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableRow,
} from "@/components/ui/table";
import { useTranslations } from 'next-intl';
import { Skeleton } from "@/components/ui/skeleton";
import { DeleteAccount } from "./DeleteAccount";



function UserProfileInfo({userInfo,isLoading ,isError, error}) {
    const f = useTranslations("Form");

    const { name, email, mobile, createdAt } = userInfo || {};

    if (isLoading) {
        return (
            <Table>
                <TableCaption>Your Information</TableCaption>
                <TableBody>
                    {Array.from({ length: 8 }, (_, i) => (
                        <TableRow
                        >
                            <TableCell>
                                <Skeleton className="w-full h-[20px] bg-gray-300" />
                            </TableCell>
                            <TableCell>
                                <Skeleton className="w-full h-[20px]" />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        );
    }


  if (isError) {
        return (
            <div className="error-container">
                <h2>Error Loading User Information</h2>
                <p>{error instanceof Error ? error.message : 'An unknown error occurred'}</p>
                <button onClick={() => window.location.reload()}>Try Again</button>
            </div>
        );
    }

    return (
        <Table>
            <TableCaption>Your Information</TableCaption>
            <TableBody>
                <TableRow>
                    <TableCell className="font-medium">{f("name")}</TableCell>
                    <TableCell>{name}</TableCell>
                </TableRow>
           
                <TableRow>
                    <TableCell className="font-medium">{f("email")}</TableCell>
                    <TableCell>{email}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell className="font-medium">{f("phoneNumber")}</TableCell>
                    <TableCell>{mobile}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell className="font-medium">{f("delete")}</TableCell>
                    <TableCell><DeleteAccount/></TableCell>
                </TableRow>
            </TableBody>
        </Table>
    );
}

export default UserProfileInfo;
